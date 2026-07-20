export const SITE_NAME = "Caché";
export const SITE_ORIGIN = "https://cache-atelier.ru";
export const SITE_DESCRIPTION =
  "Кожаные футляры ручной работы для бережного хранения и транспортировки драгоценностей.";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_ORIGIN).toString();
}
