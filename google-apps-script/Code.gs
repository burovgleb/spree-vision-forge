/**
 * Caché website feedback receiver.
 *
 * Keep SPREADSHEET_ID, TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in
 * Project Settings -> Script Properties. Never paste them into this file.
 */

const HEADERS = [
  "Дата",
  "Имя",
  "Контакт",
  "Интерес",
  "Комментарий",
  "Страница",
  "ID заявки",
  "Статус Telegram",
  "Источник",
  "Товар",
  "Артикул",
  "Стоимость",
];

const TELEGRAM_STATUS_COLUMN = 8;

const ALLOWED_INTERESTS = [
  "Base",
  "Extraordinary",
  "Rare",
  "Подарок",
  "Индивидуальный заказ",
  "Каталог",
];

function doGet() {
  return jsonResponse_({ ok: true, service: "cache-feedback" });
}

function doPost(event) {
  try {
    if (!event || !event.postData || !event.postData.contents) {
      throw new Error("Пустой запрос");
    }

    const payload = JSON.parse(event.postData.contents);

    // Bots commonly fill every input. Silently accept the trap without writing data.
    if (String(payload.website || "").trim()) {
      return jsonResponse_({ ok: true });
    }

    const submission = validateSubmission_(payload);
    const result = saveSubmission_(submission);
    return jsonResponse_({ ok: true, duplicate: result.duplicate });
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    return jsonResponse_({
      ok: false,
      error: error instanceof Error ? error.message : "Неизвестная ошибка",
    });
  }
}

/** Run once after filling Script Properties to create the sheet and authorize access. */
function setup() {
  const config = getConfig_();
  const sheet = getOrCreateSheet_(config);
  console.log('Готово. Лист "' + sheet.getName() + '" настроен.');
}

/** Run after sending the bot a message to find the required chat id in the execution log. */
function showTelegramUpdates() {
  const token = getRequiredProperty_("TELEGRAM_BOT_TOKEN");
  const response = UrlFetchApp.fetch(
    "https://api.telegram.org/bot" + token + "/getUpdates",
    { muteHttpExceptions: true },
  );
  console.log(response.getContentText());
}

/** Run before deployment to verify both the sheet and Telegram notification. */
function testIntegration() {
  const result = saveSubmission_({
    submissionId: Utilities.getUuid(),
    name: "Тестовая заявка",
    contact: "Проверка настройки",
    interests: ["Каталог"],
    comment: "Эту строку можно удалить после успешного теста.",
    pageUrl: "Ручной тест из Apps Script",
    formType: "general",
    product: null,
  });
  console.log(result);
}

/** Run to verify that a product-card inquiry includes the selected product. */
function testProductIntegration() {
  const result = saveSubmission_({
    submissionId: Utilities.getUuid(),
    name: "Тест заявки на товар",
    contact: "Проверка карточки товара",
    interests: ["Base"],
    comment: "Эту строку можно удалить после успешного теста.",
    pageUrl: "Ручной тест карточки товара из Apps Script",
    formType: "product",
    product: {
      id: "base-greige-s",
      collection: "Base",
      color: "Грейдж",
      size: "S",
      price: "265 000 ₽",
    },
  });
  console.log(result);
}

function saveSubmission_(submission) {
  const cache = CacheService.getScriptCache();
  const cacheKey = "submission:" + submission.submissionId;
  if (cache.get(cacheKey)) return { duplicate: true };

  const lock = LockService.getScriptLock();
  lock.waitLock(15000);

  try {
    if (cache.get(cacheKey)) return { duplicate: true };

    const config = getConfig_();
    const sheet = getOrCreateSheet_(config);
    const row = [
      new Date(),
      safeCell_(submission.name),
      safeCell_(submission.contact),
      safeCell_(submission.interests.join(", ")),
      safeCell_(submission.comment),
      safeCell_(submission.pageUrl),
      safeCell_(submission.submissionId),
      "Отправляется",
      submission.formType === "product" ? "Карточка товара" : "Главная страница",
      safeCell_(productLabel_(submission.product)),
      safeCell_(submission.product ? submission.product.id : ""),
      safeCell_(submission.product ? submission.product.price : ""),
    ];

    sheet.appendRow(row);
    const rowNumber = sheet.getLastRow();

    try {
      sendTelegram_(config, submission);
      sheet.getRange(rowNumber, TELEGRAM_STATUS_COLUMN).setValue("Отправлено");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      sheet
        .getRange(rowNumber, TELEGRAM_STATUS_COLUMN)
        .setValue(safeCell_("Ошибка: " + message));
      throw error;
    } finally {
      SpreadsheetApp.flush();
    }

    cache.put(cacheKey, "1", 21600);
    return { duplicate: false };
  } finally {
    lock.releaseLock();
  }
}

function validateSubmission_(payload) {
  const name = cleanText_(payload.name, 120);
  const contact = cleanText_(payload.contact, 200);
  const comment = cleanText_(payload.comment, 1500);
  const pageUrl = cleanText_(payload.pageUrl, 500);
  const submissionId = cleanText_(payload.submissionId, 100);
  const formType = payload.formType === "product" ? "product" : "general";
  const productPayload =
    payload.product && typeof payload.product === "object" ? payload.product : null;
  const product =
    formType === "product" && productPayload
      ? {
          id: cleanText_(productPayload.id, 100),
          collection: cleanText_(productPayload.collection, 80),
          color: cleanText_(productPayload.color, 120),
          size: cleanText_(productPayload.size, 20),
          price: cleanText_(productPayload.price, 80),
        }
      : null;
  const interests = Array.isArray(payload.interests)
    ? payload.interests
        .map(function (value) {
          return cleanText_(value, 80);
        })
        .filter(function (value) {
          return ALLOWED_INTERESTS.indexOf(value) !== -1;
        })
    : [];

  if (!name) throw new Error("Не заполнено имя");
  if (!contact) throw new Error("Не заполнены контактные данные");
  if (!submissionId) throw new Error("Не передан ID заявки");
  if (formType === "product" && (!product || !product.id)) {
    throw new Error("Не переданы данные товара");
  }

  return {
    submissionId: submissionId,
    name: name,
    contact: contact,
    interests: interests,
    comment: comment,
    pageUrl: pageUrl,
    formType: formType,
    product: product,
  };
}

function sendTelegram_(config, submission) {
  const message = [
    submission.formType === "product"
      ? "<b>Новая заявка на товар Caché</b>"
      : "<b>Новая заявка с сайта Caché</b>",
    "",
    submission.product ? "<b>Товар:</b> " + escapeHtml_(productLabel_(submission.product)) : "",
    submission.product ? "<b>Артикул:</b> " + escapeHtml_(submission.product.id) : "",
    submission.product ? "<b>Стоимость:</b> " + escapeHtml_(submission.product.price) : "",
    "<b>Имя:</b> " + escapeHtml_(submission.name),
    "<b>Контакт:</b> " + escapeHtml_(submission.contact),
    "<b>Интерес:</b> " + escapeHtml_(submission.interests.join(", ") || "Не указан"),
    "<b>Комментарий:</b> " + escapeHtml_(submission.comment || "—"),
    "<b>Страница:</b> " + escapeHtml_(submission.pageUrl || "—"),
  ]
    .filter(Boolean)
    .join("\n");

  const telegramPayload = {
    chat_id: config.telegramChatId,
    text: message,
    parse_mode: "HTML",
    link_preview_options: { is_disabled: true },
  };

  if (config.telegramThreadId) {
    telegramPayload.message_thread_id = Number(config.telegramThreadId);
  }

  const url =
    "https://api.telegram.org/bot" + config.telegramBotToken + "/sendMessage";

  let lastError = "Telegram API недоступен";
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const response = UrlFetchApp.fetch(url, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(telegramPayload),
      muteHttpExceptions: true,
    });
    const responseText = response.getContentText();
    let responseBody = {};

    try {
      responseBody = JSON.parse(responseText);
    } catch (_error) {
      // Keep the response code as the diagnostic if Telegram returned non-JSON.
    }

    if (response.getResponseCode() === 200 && responseBody.ok === true) return;

    lastError =
      responseBody.description || "Telegram HTTP " + String(response.getResponseCode());
    const retryAfter =
      responseBody.parameters && responseBody.parameters.retry_after
        ? Math.min(Number(responseBody.parameters.retry_after) * 1000, 10000)
        : (attempt + 1) * 1000;
    if (attempt < 2) Utilities.sleep(retryAfter);
  }

  throw new Error(lastError);
}

function getConfig_() {
  const properties = PropertiesService.getScriptProperties();
  return {
    spreadsheetId: getRequiredProperty_("SPREADSHEET_ID", properties),
    sheetName: properties.getProperty("SHEET_NAME") || "Заявки",
    telegramBotToken: getRequiredProperty_("TELEGRAM_BOT_TOKEN", properties),
    telegramChatId: getRequiredProperty_("TELEGRAM_CHAT_ID", properties),
    telegramThreadId: properties.getProperty("TELEGRAM_THREAD_ID") || "",
  };
}

function getRequiredProperty_(name, properties) {
  const store = properties || PropertiesService.getScriptProperties();
  const value = store.getProperty(name);
  if (!value) throw new Error("Не заполнено Script Property: " + name);
  return value;
}

function getOrCreateSheet_(config) {
  const spreadsheet = SpreadsheetApp.openById(config.spreadsheetId);
  let sheet = spreadsheet.getSheetByName(config.sheetName);
  if (!sheet) sheet = spreadsheet.insertSheet(config.sheetName);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.autoResizeColumns(1, HEADERS.length);
  } else {
    const currentHeaders = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
    const headersChanged = HEADERS.some(function (header, index) {
      return currentHeaders[index] !== header;
    });
    if (headersChanged) {
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight("bold");
      sheet.autoResizeColumns(1, HEADERS.length);
    }
  }

  return sheet;
}

function cleanText_(value, maxLength) {
  return String(value == null ? "" : value)
    .trim()
    .slice(0, maxLength);
}

function safeCell_(value) {
  const text = String(value == null ? "" : value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function escapeHtml_(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function productLabel_(product) {
  return product
    ? [product.collection, product.color, product.size ? "размер " + product.size : ""]
        .filter(Boolean)
        .join(" · ")
    : "";
}

function jsonResponse_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
