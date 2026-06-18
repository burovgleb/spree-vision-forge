import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroAsset from "@/assets/cache-hero.jpg";
import insertsAsset from "@/assets/cache-inserts.jpg.asset.json";
import ostrichAsset from "@/assets/cache-ostrich.jpg.asset.json";
import craftAsset from "@/assets/cache-craft.jpg";
import collectionsAsset from "@/assets/cache-collections.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Caché — кожаные футляры для хранения драгоценностей" },
      {
        name: "description",
        content:
          "Премиальные футляры ручной работы для бережного хранения и транспортировки украшений. Коллекции Base, Extraordinary и Rare.",
      },
    ],
  }),
  component: CachePage,
});

const collectionsBase = [
  { name: "Base S", color: "Грейдж", price: "265 000 ₽", swatch: "oklch(0.78 0.018 70)" },
  { name: "Base M", color: "Грейдж", price: "350 000 ₽", swatch: "oklch(0.78 0.018 70)" },
  { name: "Base S", color: "Намиб", price: "265 000 ₽", swatch: "oklch(0.66 0.06 70)" },
  { name: "Base M", color: "Намиб", price: "350 000 ₽", swatch: "oklch(0.66 0.06 70)" },
  { name: "Base S", color: "Шоколад", price: "265 000 ₽", swatch: "oklch(0.32 0.035 50)" },
];

const extraordinary = [
  { name: "Малахит", hint: "Изумруды, зелёные камни", swatch: "oklch(0.42 0.10 165)" },
  { name: "Сапфир", hint: "Бриллианты, белое золото", swatch: "oklch(0.34 0.10 255)" },
  { name: "Скарлетт", hint: "Рубины, гранаты", swatch: "oklch(0.46 0.14 28)" },
  { name: "Дюна", hint: "Тёплое золото, цитрин", swatch: "oklch(0.74 0.07 75)" },
  { name: "Джангл", hint: "Тёмные оттенки золота", swatch: "oklch(0.36 0.06 145)" },
  { name: "Деним", hint: "Серебро, белое золото", swatch: "oklch(0.42 0.06 250)" },
  { name: "Гранат", hint: "Тёплые камни", swatch: "oklch(0.38 0.10 22)" },
  { name: "Тауп", hint: "Винтаж, антиквариат", swatch: "oklch(0.52 0.02 60)" },
  { name: "Корица", hint: "Старое золото, янтарь", swatch: "oklch(0.54 0.09 55)" },
];

const construction = [
  { n: "01", title: "Внешний футляр из кожи", text: "Кожа козы, телёнка, страуса или нубук. Структура держит форму годами." },
  { n: "02", title: "Мягкая замшевая отделка", text: "Внутренние стенки выложены замшей, которая бережна к металлу и камням." },
  { n: "03", title: "Вынимающиеся ложементы", text: "Можно достать и использовать отдельно — например, в сейфе." },
  { n: "04", title: "Фиксаторы для украшений", text: "Отдельные крепления для колец, пусет, брошей и миниатюрных предметов." },
  { n: "05", title: "Подушечка в крышке", text: "Мягко прижимает содержимое, стабилизируя его при движении." },
  { n: "06", title: "Расстояние между зонами", text: "Эргономика исключает соприкосновение украшений друг с другом." },
];

function CachePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Problem />
      <HowItWorks />
      <Home />
      <Collections />
      <Wardrobe />
      <Sizes />
      <Craft />
      <Story />
      <Philosophy />
      <CTA />
      <Footer />
    </div>
  );
}

/* ───────────────────────── Header ───────────────────────── */

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#how", label: "Как работает" },
    { href: "#collections", label: "Коллекции" },
    { href: "#story", label: "История" },
    { href: "#rare", label: "Rare" },
    { href: "#contact", label: "Контакты" },
  ];
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[color-mix(in_oklab,var(--cream)_85%,transparent)] border-b border-border">
      <div className="container-luxe flex items-center justify-between h-16 md:h-20">
        <a href="#top" className="font-display text-2xl tracking-wide">
          Caché<span className="text-cognac">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-9 text-[13px] tracking-wide text-muted-foreground">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-ink transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="hidden md:inline-flex btn-primary">Запросить каталог</a>
        <button
          className="md:hidden p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Меню"
        >
          <div className="space-y-1.5">
            <span className="block w-6 h-px bg-ink" />
            <span className="block w-6 h-px bg-ink" />
            <span className="block w-4 h-px bg-ink ml-auto" />
          </div>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-cream">
          <div className="container-luxe py-6 flex flex-col gap-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-base">
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary justify-center mt-2">
              Запросить каталог
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

function Hero() {
  return (
    <section id="top" className="relative">
      <div className="container-luxe pt-14 md:pt-24 pb-14 md:pb-28 grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
        <div className="lg:col-span-6 xl:col-span-5">
          <p className="eyebrow mb-6">Maison Caché · Est. 2018</p>
          <h1 className="font-display text-[44px] sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight">
            Драгоценный дом
            <br />
            для ваших
            <br />
            <em className="text-cognac not-italic font-display" style={{ fontStyle: "italic" }}>
              украшений
            </em>
            .
          </h1>
          <p className="mt-8 max-w-md text-[17px] leading-relaxed text-muted-foreground">
            Caché — кожаные футляры ручной работы, в которых каждое украшение получает собственное защищённое место.
          </p>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink/80">
            Украшения не должны царапать друг друга. Мы создали футляр, который бережно фиксирует кольца, серьги, броши и другие драгоценности — дома, в сейфе и в путешествии.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary">Запросить каталог</a>
            <a href="#collections" className="btn-ghost">Смотреть коллекции</a>
          </div>
        </div>
        <div className="lg:col-span-6 xl:col-span-7">
          <div className="relative aspect-[4/5] lg:aspect-[5/6] overflow-hidden bg-noir">
            <img
              src={heroAsset}
              alt="Открытый кожаный футляр Caché с антикварным кольцом с изумрудом внутри"
              width={1600}
              height={1280}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/60 to-transparent">
              <p className="eyebrow text-cream/80">Base M · Намиб</p>
              <p className="font-display text-cream text-2xl mt-1">Кольцо находится на своём месте</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Problem ───────────────────────── */

function Problem() {
  return (
    <section className="bg-greige/40 border-y border-border">
      <div className="container-luxe py-20 md:py-28 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <p className="eyebrow mb-5">Проблема</p>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">
            Украшения не&nbsp;должны лежать вплотную
          </h2>
        </div>
        <div className="md:col-span-7 md:pt-2 space-y-6 text-[17px] leading-relaxed text-ink/85">
          <p>
            В обычных футлярах и шкатулках украшения часто оказываются слишком близко друг к другу. Они соприкасаются, трутся, теряют блеск, получают микроцарапины на металле и камнях.
          </p>
          <p className="font-display text-2xl md:text-3xl text-ink leading-snug border-l-2 border-cognac pl-6">
            Caché физически не даёт украшениям соприкасаться друг с&nbsp;другом.
          </p>
          <p>
            Эргономика футляра не провоцирует положить лишнее. У каждого предмета есть своё место, своя фиксация и расстояние от соседа.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── How it works ───────────────────────── */

function HowItWorks() {
  return (
    <section id="how" className="bg-background">
      <div className="container-luxe py-20 md:py-32">
        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-7">
            <p className="eyebrow mb-5">Конструкция</p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
              Как Caché защищает украшения
            </h2>
          </div>
          <p className="md:col-span-5 md:pt-3 text-[16px] leading-relaxed text-muted-foreground">
            Мы шесть лет тестировали эргономику Caché: расстояние между фиксаторами, форму ложементов, мягкость отделки и сценарии использования. Результат — футляр, который удерживает украшения на месте и сохраняет их поверхность.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <div className="aspect-[4/3] overflow-hidden bg-greige">
              <img
                src={insertsAsset.url}
                alt="Два вынимающихся замшевых ложемента Caché с фиксаторами и подушечкой"
                width={1600}
                height={1200}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Вынимающиеся ложементы, S и M. Замша Намиб, фиксаторы для колец и брошей.
            </p>
          </div>
          <ol className="lg:col-span-6 divide-y divide-border border-y border-border">
            {construction.map((c) => (
              <li key={c.n} className="grid grid-cols-12 gap-4 py-7">
                <div className="col-span-2 font-display text-2xl text-cognac">{c.n}</div>
                <div className="col-span-10">
                  <h3 className="font-display text-2xl leading-tight mb-2">{c.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{c.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-20 md:mt-28 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 aspect-[16/9] bg-noir text-cream flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_50%,rgba(180,120,80,0.4),transparent_60%)]" />
            <button
              aria-label="Смотреть видео"
              className="relative z-10 w-20 h-20 rounded-full border border-cream/40 flex items-center justify-center hover:bg-cream hover:text-ink transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <p className="relative z-10 mt-6 font-display text-2xl">40 секунд: как украшение встаёт на своё место</p>
          </div>
          <div className="md:col-span-5">
            <p className="eyebrow mb-3">Видео</p>
            <h3 className="font-display text-3xl leading-tight mb-4">Жест, который повторяется каждый день</h3>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              Руки кладут кольцо в ложемент, фиксируют замшевый ремешок, закрывают крышку. Подушечка мягко садится сверху. Тихий щелчок молнии.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Home for jewellery ───────────────────────── */

function Home() {
  return (
    <section className="bg-noir text-cream">
      <div className="container-luxe py-24 md:py-36 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-6 order-2 md:order-1">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={ostrichAsset.url}
              alt="Футляр Caché из кожи страуса на античной амфоре"
              width={1600}
              height={2000}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-6 order-1 md:order-2">
          <p className="eyebrow mb-6 text-cream/60">Идея</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02] text-cream">
            Украшение должно жить
            <br />
            в&nbsp;<em style={{ fontStyle: "italic" }}>красивом доме</em>.
          </h2>
          <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-cream/75 max-w-lg">
            <p>
              Драгоценность — это не только металл и камень. Это память, выбор, событие, иногда наследие. Место хранения должно соответствовать ценности предмета.
            </p>
            <p>
              Caché создаёт для украшения маленький дом: мягкий внутри, структурный снаружи, красивый на туалетном столике, в сейфе и в багаже.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Collections ───────────────────────── */

function Collections() {
  return (
    <section id="collections" className="bg-background">
      <div className="container-luxe py-20 md:py-32">
        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-7">
            <p className="eyebrow mb-5">Коллекции</p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02]">
              Base, Extraordinary, Rare
            </h2>
          </div>
          <p className="md:col-span-5 md:pt-3 text-[16px] leading-relaxed text-muted-foreground">
            Три линии Caché: спокойная база, выразительные сезонные выпуски и индивидуальные изделия по запросу.
          </p>
        </div>

        {/* Base */}
        <div className="grid md:grid-cols-12 gap-10 py-14 border-t border-border">
          <div className="md:col-span-4">
            <h3 className="font-display text-3xl mb-3">Base</h3>
            <p className="text-[15px] text-muted-foreground leading-relaxed mb-6">
              Спокойная базовая линия Caché. Природная палитра, чистая форма, акцент на конструкции и материале.
            </p>
          </div>
          <ul className="md:col-span-8 divide-y divide-border border-y border-border">
            {collectionsBase.map((b, i) => (
              <li key={i} className="grid grid-cols-12 gap-4 py-5 items-center">
                <span
                  className="col-span-1 w-7 h-7 rounded-full border border-border"
                  style={{ background: b.swatch }}
                  aria-hidden
                />
                <span className="col-span-5 font-display text-xl">{b.name}</span>
                <span className="col-span-3 text-sm text-muted-foreground">{b.color}</span>
                <span className="col-span-3 text-right text-[15px]">{b.price}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Extraordinary */}
        <div className="grid md:grid-cols-12 gap-10 py-14 border-t border-border">
          <div className="md:col-span-4">
            <h3 className="font-display text-3xl mb-3">Extraordinary</h3>
            <p className="text-[15px] text-muted-foreground leading-relaxed mb-4">
              Сезонные и лимитированные выпуски с более выразительными цветами, фактурами и редкими видами кожи.
            </p>
            <p className="text-sm text-muted-foreground">
              S от 285 000 ₽ · M от 395 000 ₽<br />
              Страус — до 495 000 ₽
            </p>
          </div>
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-px bg-border">
            {extraordinary.map((e) => (
              <div key={e.name} className="bg-background p-6 group">
                <div
                  className="w-full aspect-square mb-4"
                  style={{ background: e.swatch }}
                  aria-hidden
                />
                <p className="font-display text-xl">{e.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{e.hint}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rare */}
        <div id="rare" className="grid md:grid-cols-12 gap-10 py-14 border-t border-border">
          <div className="md:col-span-4">
            <h3 className="font-display text-3xl mb-3">Rare</h3>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              Индивидуальные изделия для конкретной коллекции, украшения или сценария хранения.
            </p>
          </div>
          <div className="md:col-span-8 relative overflow-hidden">
            <img
              src={collectionsAsset}
              alt="Футляр Caché Extraordinary в оттенке Малахит"
              width={1600}
              height={1100}
              loading="lazy"
              className="w-full h-[420px] object-cover"
            />
            <ul className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-3 text-[15px] text-ink/85">
              {[
                "Личная встреча и интервью",
                "Подбор кожи, замши, цвета металла",
                "Нестандартные комбинации материалов",
                "Индивидуальная архитектура ложементов",
                "Создание футляра под конкретное украшение или сет",
                "Возможность заказать чёрный цвет",
              ].map((x) => (
                <li key={x} className="flex gap-3">
                  <span className="text-cognac font-display">—</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Wardrobe ───────────────────────── */

function Wardrobe() {
  const pairs = [
    { case: "Малахит", jewel: "Изумруды, зелёные камни", c: "oklch(0.42 0.10 165)" },
    { case: "Сапфир", jewel: "Бриллианты, белое золото", c: "oklch(0.34 0.10 255)" },
    { case: "Скарлетт", jewel: "Рубины, гранаты", c: "oklch(0.46 0.14 28)" },
    { case: "Намиб", jewel: "Старое золото", c: "oklch(0.66 0.06 70)" },
    { case: "Шоколад", jewel: "Винтажные украшения", c: "oklch(0.32 0.035 50)" },
    { case: "Дюна", jewel: "Тёплое золото, янтарь, цитрин", c: "oklch(0.74 0.07 75)" },
  ];
  return (
    <section className="bg-greige/40 border-y border-border">
      <div className="container-luxe py-20 md:py-32">
        <div className="grid md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-7">
            <p className="eyebrow mb-5">Гардероб</p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02]">
              Гардероб для драгоценностей
            </h2>
          </div>
          <p className="md:col-span-5 md:pt-3 text-[16px] leading-relaxed text-muted-foreground">
            Малахитовый футляр — для изумрудов, сапфировый — для белого золота и бриллиантов, тёплая Дюна — для старого золота. Caché собирается как личная коллекция.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pairs.map((p) => (
            <div key={p.case} className="bg-background p-6 border border-border">
              <div className="aspect-[4/3] mb-5 relative overflow-hidden" style={{ background: p.c }}>
                <div className="absolute inset-x-6 bottom-6 h-1/2 rounded-t-full opacity-30 bg-black blur-2xl" />
              </div>
              <p className="eyebrow mb-1">Caché · {p.case}</p>
              <p className="font-display text-xl">для {p.jewel.toLowerCase()}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Sizes ───────────────────────── */

function Sizes() {
  return (
    <section className="bg-background">
      <div className="container-luxe py-20 md:py-32">
        <div className="mb-14">
          <p className="eyebrow mb-5">Размеры</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02]">Размеры S и M</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {[
            {
              label: "S",
              title: "Камерный сценарий",
              items: [
                "Кольца средней и тонкой ширины",
                "Два крупных кольца",
                "Пусеты и миниатюрные предметы",
                "Броши, крупные кольца, сотуары",
                "Компактный travel-сценарий",
              ],
            },
            {
              label: "M",
              title: "Расширенный сценарий",
              items: [
                "Кольца различной ширины",
                "Набор из серёг, пусет и кольца",
                "Несколько миниатюрных предметов",
                "Броши, крупные кольца, сотуары",
                "Объёмная коллекция и travel",
              ],
            },
          ].map((s) => (
            <div key={s.label} className="bg-background p-8 md:p-12">
              <div className="flex items-baseline gap-6 mb-8">
                <span className="font-display text-7xl text-cognac">{s.label}</span>
                <span className="font-display text-2xl">{s.title}</span>
              </div>
              <ul className="space-y-3 text-[15px]">
                {s.items.map((it) => (
                  <li key={it} className="flex gap-4 border-b border-border pb-3">
                    <span className="text-cognac">—</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Craft ───────────────────────── */

function Craft() {
  return (
    <section className="bg-noir text-cream">
      <div className="container-luxe py-20 md:py-32 grid md:grid-cols-12 gap-10 items-end">
        <div className="md:col-span-6">
          <p className="eyebrow text-cream/60 mb-5">Материалы</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02]">
            Кожа, замша
            <br />
            и&nbsp;<em style={{ fontStyle: "italic" }}>ручная работа</em>
          </h2>
          <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-cream/75 max-w-lg">
            <p>
              Caché создаётся из кожи козы, телёнка, страуса, нубука и мягкой замши. Каждый футляр собирается вручную: от выбора материала и цвета металла до внутренней архитектуры ложементов.
            </p>
            <p>
              Важна не только внешняя кожа, но и то, что происходит внутри: мягкость, форма, фиксация, контакт украшения с поверхностью.
            </p>
          </div>
        </div>
        <div className="md:col-span-6 aspect-[4/3] overflow-hidden">
          <img
            src={craftAsset}
            alt="Макро кадр: ручная строчка на коже, латунная молния и замша"
            width={1600}
            height={1100}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Story ───────────────────────── */

function Story() {
  return (
    <section id="story" className="bg-background">
      <div className="container-luxe py-20 md:py-32">
        <div className="grid md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-7">
            <p className="eyebrow mb-5">История</p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02]">
              Caché начался
              <br />с простого чувства
            </h2>
          </div>
        </div>
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7 space-y-6 text-[17px] leading-relaxed text-ink/85">
            <p>
              Однажды Дарья поняла, что ей жаль класть любимые украшения в тот футляр, который у неё был. Формально место было. Но оно не соответствовало предметам, их красоте и значению.
            </p>
            <p>
              Так появилась идея создать футляр, где украшения не просто лежат, а находятся в правильной среде: защищённой, мягкой, продуманной и достойной.
            </p>
            <p>
              Дарья встретила Алексея Скрябина, мастера кожевенного дела. Вместе они шесть лет дорабатывали форму, ложементы, материалы и сценарии использования Caché.
            </p>
          </div>
          <div className="md:col-span-5 space-y-6">
            {[
              { name: "Дарья Бурова", role: "Сооснователь, коллекционер антикварных драгоценностей" },
              { name: "Алексей Скрябин", role: "Сооснователь, дизайнер, мастер кожевенного дела" },
            ].map((f) => (
              <div key={f.name} className="flex gap-5 items-center border-t border-border pt-6">
                <div className="w-20 h-20 rounded-full bg-greige flex items-center justify-center font-display text-2xl text-cognac shrink-0">
                  {f.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-display text-2xl leading-tight">{f.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{f.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Philosophy ───────────────────────── */

function Philosophy() {
  return (
    <section className="bg-greige/40 border-y border-border">
      <div className="container-luxe py-24 md:py-36 max-w-4xl">
        <p className="eyebrow mb-6">Философия</p>
        <h2 className="font-display text-4xl md:text-5xl leading-[1.1] mb-8">
          Культура хранения ценного
        </h2>
        <div className="space-y-6 text-[18px] leading-relaxed text-ink/85">
          <p>
            Для нас хранение — это форма отношения. К украшению, к событию, к себе, к наследию.
          </p>
          <p>
            Мы верим в ремесло как в искусство и в материалы, которые живут долго. В предметы, которые сохраняют не только драгоценности, но и память о человеке, который ими владел.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── CTA ───────────────────────── */

function CTA() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="bg-background">
      <div className="container-luxe py-20 md:py-32 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <p className="eyebrow mb-5">Заявка</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02] mb-6">
            Подберите дом для своих украшений
          </h2>
          <p className="text-[16px] text-muted-foreground leading-relaxed mb-10 max-w-md">
            Запросите каталог, обсудите индивидуальный футляр или запишитесь на личный показ в нашей мастерской.
          </p>
          <div className="space-y-4 text-[15px]">
            <a href="https://wa.me/" className="flex items-center gap-3 hover:text-cognac transition-colors">
              <span className="font-display text-cognac">→</span> WhatsApp
            </a>
            <a href="https://t.me/" className="flex items-center gap-3 hover:text-cognac transition-colors">
              <span className="font-display text-cognac">→</span> Telegram
            </a>
            <a href="mailto:hello@cache-maison.com" className="flex items-center gap-3 hover:text-cognac transition-colors">
              <span className="font-display text-cognac">→</span> hello@cache-maison.com
            </a>
          </div>
        </div>
        <form
          className="md:col-span-7 bg-greige/40 p-8 md:p-12 border border-border space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          {sent ? (
            <div className="py-16 text-center">
              <p className="font-display text-3xl mb-3">Спасибо.</p>
              <p className="text-muted-foreground">Мы свяжемся с вами в ближайшее время.</p>
            </div>
          ) : (
            <>
              <Field label="Имя" name="name" required />
              <Field label="Телефон, Telegram или email" name="contact" required />
              <div>
                <label className="eyebrow block mb-3">Что интересно</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {["Base", "Extraordinary", "Rare", "Подарок", "Индивидуальный заказ", "Каталог"].map((t) => (
                    <label
                      key={t}
                      className="flex items-center gap-2 border border-border bg-background px-3 py-2 cursor-pointer hover:border-ink transition-colors text-[13px]"
                    >
                      <input type="checkbox" name="interest" value={t} className="accent-ink" />
                      {t}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="eyebrow block mb-2">Комментарий</label>
                <textarea
                  name="comment"
                  rows={4}
                  className="w-full bg-background border border-border px-4 py-3 text-[15px] focus:outline-none focus:border-ink resize-none"
                />
              </div>
              <button type="submit" className="btn-primary w-full justify-center">
                Отправить заявку
              </button>
              <p className="text-xs text-muted-foreground">
                Отправляя форму, вы соглашаетесь на обработку персональных данных.
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, required }: { label: string; name: string; required?: boolean }) {
  return (
    <div>
      <label className="eyebrow block mb-2">
        {label} {required && <span className="text-cognac">*</span>}
      </label>
      <input
        name={name}
        required={required}
        className="w-full bg-background border border-border px-4 py-3 text-[15px] focus:outline-none focus:border-ink"
      />
    </div>
  );
}

/* ───────────────────────── Footer ───────────────────────── */

function Footer() {
  return (
    <footer className="bg-noir text-cream/70">
      <div className="container-luxe py-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <p className="font-display text-3xl text-cream">Caché<span className="text-cognac">.</span></p>
          <p className="mt-4 text-sm max-w-sm">
            Драгоценные коробочки для ваших сокровищ. Ручная работа, кожа, замша, индивидуальные ложементы.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow text-cream/50 mb-4">Каталог</p>
          <ul className="space-y-2 text-sm">
            <li><a href="#collections" className="hover:text-cream">Base</a></li>
            <li><a href="#collections" className="hover:text-cream">Extraordinary</a></li>
            <li><a href="#rare" className="hover:text-cream">Rare</a></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="eyebrow text-cream/50 mb-4">Maison</p>
          <ul className="space-y-2 text-sm">
            <li><a href="#story" className="hover:text-cream">История</a></li>
            <li><a href="#how" className="hover:text-cream">Конструкция</a></li>
            <li><a href="#contact" className="hover:text-cream">Контакты</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-luxe py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-cream/40">
          <span>© {new Date().getFullYear()} Maison Caché. Все права защищены.</span>
          <span>Москва · Личная встреча по записи</span>
        </div>
      </div>
    </footer>
  );
}
