import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import castleAsset from "@/assets/cache-castle.jpg";
import collectionBaseAsset from "@/assets/catalog/base-greige-1.jpg";
import collectionExtraordinaryAsset from "@/assets/catalog/home-extraordinary-8275.jpg";
import collectionRareAsset from "@/assets/catalog/rare-onyx-5.jpg";
import founderAlexeyAsset from "@/assets/cache-founder-alexey.jpg";
import founderDariaAsset from "@/assets/cache-founder-daria.jpg";
import heroAsset from "@/assets/cache-hero-edited.png";
import insertMAsset from "@/assets/cache-insert-m.jpg";
import insertSAsset from "@/assets/cache-insert-s.jpg";
import materialsOstrichAsset from "@/assets/cache-materials-ostrich.jpg";
import materialsPaletteAsset from "@/assets/cache-materials-palette.jpg";
import testingAsset from "@/assets/cache-testing.jpg";
import { useHideOnScroll } from "@/lib/use-hide-on-scroll";

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

const collectionCards = [
  {
    name: "Base",
    filter: "Base" as const,
    caption: "Base S · Грейдж",
    image: collectionBaseAsset,
    alt: "Футляр Caché Base в оттенке грейдж с ложементами на каменных блоках",
    text: "Спокойная базовая линия с мягкой природной палитрой, чистой формой и акцентом на ежедневное бережное хранение.",
    details: ["Кожа козы и замша телёнка", "Размеры S и M", "Никель или золото"],
  },
  {
    name: "Extraordinary",
    filter: "Extraordinary" as const,
    caption: "Extraordinary",
    image: collectionExtraordinaryAsset,
    alt: "Футляр Caché Extraordinary на тёмном скульптурном объекте",
    text: "Выразительные сезонные выпуски, где фактура кожи, замши, нитей и металла собирается в более редкое цветовое решение.",
    details: [
      "Кожа страуса и замша козы",
      "Контрастные и тон-в-тон сочетания",
      "Лимитированные оттенки",
    ],
  },
  {
    name: "Rare",
    filter: "Rare" as const,
    caption: "Rare · Чёрный оникс",
    image: collectionRareAsset,
    alt: "Чёрный футляр Caché Rare среди ветвей и зелени",
    text: "Индивидуальные изделия под конкретную коллекцию, украшение или сценарий хранения, включая нестандартную архитектуру ложементов.",
    details: ["Личная встреча и интервью", "Подбор кожи, замши и металла", "Ложементы под задачу"],
  },
];

const construction = [
  {
    n: "01",
    title: "Внешний футляр из кожи",
    text: "Кожа козы, телёнка, страуса или нубук. Структура держит форму годами.",
  },
  {
    n: "02",
    title: "Мягкая замшевая отделка",
    text: "Внутренние стенки выложены замшей, которая бережна к металлу и камням.",
  },
  {
    n: "03",
    title: "Вынимающиеся ложементы",
    text: "Можно достать и использовать отдельно — например, в сейфе.",
  },
  {
    n: "04",
    title: "Фиксаторы для украшений",
    text: "Отдельные крепления для колец, пусет, брошей и миниатюрных предметов.",
  },
  {
    n: "05",
    title: "Подушечка в крышке",
    text: "Мягко прижимает содержимое, стабилизируя его при движении.",
  },
  {
    n: "06",
    title: "Расстояние между зонами",
    text: "Эргономика исключает соприкосновение украшений друг с другом.",
  },
];

function CachePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Home />
      <Problem />
      <HowItWorks />
      <Collections />
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
  const hidden = useHideOnScroll();
  const links = [
    { href: "#about", label: "О Caché" },
    { href: "#purpose", label: "Назначение" },
    { href: "#collections", label: "Коллекция" },
    { href: "#story", label: "История создания" },
    { href: "#contact", label: "Знакомство с Caché" },
  ];
  return (
    <header
      className={`site-header sticky top-0 z-40 backdrop-blur-md bg-[color-mix(in_oklab,var(--cream)_85%,transparent)] border-b border-border ${hidden && !open ? "is-hidden" : ""}`}
    >
      <div className="container-luxe flex items-center justify-between h-16 md:h-20">
        <a href="#top" className="flex flex-col leading-none">
          <span className="font-display text-3xl md:text-[34px] tracking-wide">Caché</span>
          <span className="hidden sm:block mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Культура хранения ценного
          </span>
        </a>
        <nav className="hidden lg:flex items-center gap-7 text-[13px] tracking-wide text-muted-foreground">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-ink transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <Link to="/catalog" className="hidden lg:inline-flex btn-primary">
          Каталог
        </Link>
        <button className="lg:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Меню">
          <div className="space-y-1.5">
            <span className="block w-6 h-px bg-ink" />
            <span className="block w-6 h-px bg-ink" />
            <span className="block w-4 h-px bg-ink ml-auto" />
          </div>
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-cream">
          <div className="container-luxe py-6 flex flex-col gap-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-base">
                {l.label}
              </a>
            ))}
            <Link
              to="/catalog"
              onClick={() => setOpen(false)}
              className="btn-primary justify-center mt-2"
            >
              Каталог
            </Link>
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
          <p className="eyebrow mb-6">Культура хранения ценного</p>
          <h1 className="font-display text-[46px] sm:text-6xl lg:text-7xl leading-[0.98] tracking-normal text-ink">
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
            Caché — кожаные футляры ручной работы, в которых каждое украшение обретает своё
            особенное защищенное место.
          </p>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink/80">
            Это возможно благодаря бережной фиксации, уникальной эргономике, исключающей привычные
            способы хранения, которые подвергают риску драгоценности.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/catalog" className="btn-primary">
              Каталог
            </Link>
            <a href="#collections" className="btn-ghost">
              Смотреть коллекции
            </a>
          </div>
        </div>
        <div className="lg:col-span-6 xl:col-span-7">
          <div className="relative aspect-[4/5] lg:aspect-[5/6] overflow-hidden bg-noir">
            <img
              src={heroAsset}
              alt="Открытый зелёный футляр Caché с украшениями на натуральном камне"
              width={1024}
              height={1536}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-between gap-5">
              <div>
                <p className="eyebrow text-cream/80">Extraordinary · Малахит</p>
                <p className="font-display text-cream text-2xl mt-1">
                  Каждое украшение на своём месте
                </p>
              </div>
              <Link
                to="/catalog/$productId"
                params={{ productId: "extra-malachite-s" }}
                search={{ collection: "Extraordinary" }}
                className="flex shrink-0 items-center gap-2 border-b border-cream/70 pb-1 text-[10px] uppercase tracking-[0.15em] text-cream transition-colors hover:border-cream/40 hover:text-cream/75"
              >
                Рассмотреть
                <ArrowRight size={15} strokeWidth={1.4} />
              </Link>
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
    <section id="purpose" className="bg-greige/40 border-y border-border">
      <div className="container-luxe py-20 md:py-28 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <p className="eyebrow mb-5">Проблема</p>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">
            Украшения не&nbsp;должны лежать вплотную
          </h2>
        </div>
        <div className="md:col-span-7 md:pt-2 space-y-6 text-[17px] leading-relaxed text-ink/85">
          <p>
            В обычных футлярах и шкатулках украшения часто оказываются слишком близко друг к другу.
            Они соприкасаются, трутся, теряют блеск, получают микроцарапины на металле и камнях.
          </p>
          <p className="font-display text-2xl md:text-3xl text-ink leading-snug border-l-2 border-cognac pl-6">
            Caché физически не даёт украшениям соприкасаться друг с&nbsp;другом.
          </p>
          <p>
            Эргономика футляра не провоцирует положить лишнее. У каждого предмета есть своё место,
            своя фиксация и расстояние от соседа.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── How it works ───────────────────────── */

function HowItWorks() {
  return (
    <section className="bg-background">
      <div className="container-luxe py-20 md:py-32">
        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-7">
            <p className="eyebrow mb-5">Назначение</p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-normal">
              Как Caché защищает украшения
            </h2>
          </div>
          <p className="md:col-span-5 md:pt-3 text-[16px] leading-relaxed text-muted-foreground">
            Мы шесть лет тестировали эргономику Caché: расстояние между фиксаторами, форму
            ложементов, мягкость отделки и сценарии использования. Результат — футляр, который
            удерживает украшения на месте и сохраняет их поверхность.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <div className="aspect-[3/2] overflow-hidden bg-greige">
              <img
                src={testingAsset}
                alt="Тестирование ложемента Caché для серёг в кожаном футляре"
                width={1800}
                height={1200}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Шесть лет тестирования формы, фиксации и сценариев использования.
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

        <div className="mt-20 md:mt-28 border-t border-border pt-14">
          <div className="grid md:grid-cols-12 gap-10 mb-10">
            <div className="md:col-span-5">
              <p className="eyebrow mb-4">Ложементы</p>
              <h3 className="font-display text-3xl md:text-4xl leading-tight">
                Назначение разных форм внутри S и M
              </h3>
            </div>
            <p className="md:col-span-7 text-[16px] leading-relaxed text-muted-foreground">
              Ложементы разделяют кольца, серьги, броши, сотуары и миниатюрные предметы. Каждый
              элемент создаёт дистанцию и собственную точку фиксации, чтобы украшения не
              соприкасались при хранении и движении.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                label: "S",
                image: insertSAsset,
                alt: "Схема назначения ложементов Caché размера S",
              },
              {
                label: "M",
                image: insertMAsset,
                alt: "Схема назначения ложементов Caché размера M",
              },
            ].map((item) => (
              <figure key={item.label} className="border border-border bg-background">
                <img
                  src={item.image}
                  alt={item.alt}
                  width={1800}
                  height={1012}
                  loading="lazy"
                  className="w-full aspect-[16/9] object-cover"
                />
                <figcaption className="px-5 py-4 text-sm text-muted-foreground">
                  Размер {item.label}: назначение ложементов и фиксаторов.
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Home for jewellery ───────────────────────── */

function Home() {
  return (
    <section id="about" className="bg-noir text-cream">
      <div className="container-luxe py-24 md:py-36 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-6 order-2 md:order-1">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={collectionBaseAsset}
              alt="Футляр Caché с ложементами на каменных подставках"
              width={1587}
              height={1059}
              loading="lazy"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
        <div className="md:col-span-6 order-1 md:order-2">
          <p className="eyebrow mb-6 text-cream/60">О Caché</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02] text-cream">
            Культура
            <br />
            хранения&nbsp;<em style={{ fontStyle: "italic" }}>ценного</em>.
          </h2>
          <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-cream/75 max-w-lg">
            <p>
              Драгоценность — это не только металл и камень. Это память, выбор, событие, иногда
              наследие. Место хранения должно соответствовать ценности предмета.
            </p>
            <p>
              Caché создаёт для украшения маленький дом: мягкий внутри, структурный снаружи,
              красивый на туалетном столике, в сейфе и в багаже.
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
            <p className="eyebrow mb-5">Коллекция</p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02]">
              Base, Extraordinary, Rare
            </h2>
          </div>
          <p className="md:col-span-5 md:pt-3 text-[16px] leading-relaxed text-muted-foreground">
            В коллекции важны не только цветовые решения, но и фактура кожи, сочетание с замшей,
            контраст нитей и характер металла. Поэтому здесь — реальные футляры, а не абстрактные
            палитры.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {collectionCards.map((card) => (
            <article key={card.name} className="border border-border bg-background">
              <Link
                to="/catalog"
                search={{ collection: card.filter }}
                className="group block h-full"
                aria-label={`Открыть коллекцию ${card.name} в каталоге`}
              >
                <div className="aspect-[4/3] overflow-hidden bg-greige">
                  <img
                    src={card.image}
                    alt={card.alt}
                    width={1587}
                    height={1059}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                  />
                </div>
                <div className="p-6 md:p-7">
                  <p className="eyebrow mb-3">{card.caption}</p>
                  <h3 className="font-display text-3xl mb-4">{card.name}</h3>
                  <p className="text-[15px] text-muted-foreground leading-relaxed mb-6">
                    {card.text}
                  </p>
                  <ul className="space-y-3 text-[14px] text-ink/85">
                    {card.details.map((detail) => (
                      <li key={detail} className="flex gap-3 border-t border-border pt-3">
                        <span className="font-display text-cognac">—</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-7 flex items-center justify-between border-t border-border pt-4 text-[10px] uppercase tracking-[0.15em]">
                    Смотреть в каталоге
                    <ArrowRight
                      size={16}
                      strokeWidth={1.4}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </article>
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
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02] text-cream">
            Кожа, замша
            <br />
            и&nbsp;<em style={{ fontStyle: "italic" }}>ручная работа</em>
          </h2>
          <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-cream/75 max-w-lg">
            <p>
              Caché создаётся из кожи козы, телёнка, страуса, нубука и мягкой замши. Каждый футляр
              собирается вручную: от выбора материала и цвета металла до внутренней архитектуры
              ложементов.
            </p>
            <p>
              Важна не только внешняя кожа, но и то, что происходит внутри: мягкость, форма,
              фиксация, контакт украшения с поверхностью.
            </p>
          </div>
        </div>
        <div className="md:col-span-6 grid grid-cols-2 gap-4">
          <figure className="overflow-hidden">
            <img
              src={materialsOstrichAsset}
              alt="Фактуры кожи страуса, ящерицы и крокодила для футляров Caché"
              width={1280}
              height={1280}
              loading="lazy"
              className="w-full aspect-square object-cover"
            />
          </figure>
          <figure className="overflow-hidden translate-y-8">
            <img
              src={materialsPaletteAsset}
              alt="Палитра кожи и замши для футляров Caché на рабочем столе"
              width={1280}
              height={1280}
              loading="lazy"
              className="w-full aspect-square object-cover"
            />
          </figure>
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
        <div className="grid md:grid-cols-12 gap-10 mb-14 items-end">
          <div className="md:col-span-7">
            <p className="eyebrow mb-5">История создания</p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02]">
              Caché начался
              <br />с простого чувства
            </h2>
          </div>
          <div className="md:col-span-5 aspect-[4/3] overflow-hidden bg-greige">
            <img
              src={castleAsset}
              alt="Исторический замок с освещёнными окнами вечером"
              width={960}
              height={640}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7 space-y-6 text-[17px] leading-relaxed text-ink/85">
            <p>
              Однажды Дарья поняла, что ей жаль класть любимые украшения в тот футляр, который у неё
              был. Формально место было. Но оно не соответствовало предметам, их красоте и значению.
            </p>
            <p>
              Так появилась идея создать футляр, где украшения не просто лежат, а находятся в
              правильной среде: защищённой, мягкой, продуманной и достойной.
            </p>
            <p>
              Дарья встретила Алексея Скрябина, мастера кожевенного дела. Вместе они шесть лет
              дорабатывали форму, ложементы, материалы и сценарии использования Caché.
            </p>
          </div>
          <div className="md:col-span-5 space-y-6">
            {[
              {
                name: "Дарья Бурова",
                role: "Сооснователь, коллекционер антикварных драгоценностей",
                image: founderDariaAsset,
                alt: "Портрет Дарьи Буровой, сооснователя Caché",
              },
              {
                name: "Алексей Скрябин",
                role: "Сооснователь, дизайнер, мастер кожевенного дела",
                image: founderAlexeyAsset,
                alt: "Портрет Алексея Скрябина, сооснователя Caché",
              },
            ].map((f) => (
              <div key={f.name} className="flex gap-5 items-center border-t border-border pt-6">
                <img
                  src={f.image}
                  alt={f.alt}
                  width={560}
                  height={528}
                  loading="lazy"
                  className="w-24 h-24 object-cover grayscale shrink-0"
                />
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
          <p>Для нас хранение — это форма отношения. К украшению, к событию, к себе, к наследию.</p>
          <p>
            Мы верим в ремесло как в искусство и в материалы, которые живут долго. В предметы,
            которые сохраняют не только драгоценности, но и память о человеке, который ими владел.
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
          <p className="eyebrow mb-5">Знакомство с Caché</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02] mb-6">
            Познакомьтесь с Caché лично
          </h2>
          <p className="text-[16px] text-muted-foreground leading-relaxed mb-10 max-w-md">
            Запросите каталог, обсудите индивидуальный футляр или запишитесь на личный показ в нашей
            мастерской.
          </p>
          <div className="space-y-4 text-[15px]">
            <a
              href="https://wa.me/"
              className="flex items-center gap-3 hover:text-cognac transition-colors"
            >
              <span className="font-display text-cognac">→</span> WhatsApp
            </a>
            <a
              href="https://t.me/"
              className="flex items-center gap-3 hover:text-cognac transition-colors"
            >
              <span className="font-display text-cognac">→</span> Telegram
            </a>
            <a
              href="mailto:hello@cache-maison.com"
              className="flex items-center gap-3 hover:text-cognac transition-colors"
            >
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
                  {[
                    "Base",
                    "Extraordinary",
                    "Rare",
                    "Подарок",
                    "Индивидуальный заказ",
                    "Каталог",
                  ].map((t) => (
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
          <p className="font-display text-3xl text-cream">Caché</p>
          <p className="mt-4 text-sm max-w-sm">
            Драгоценные коробочки для ваших сокровищ. Ручная работа, кожа, замша, индивидуальные
            ложементы.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow text-cream/50 mb-4">Каталог</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#collections" className="hover:text-cream">
                Base
              </a>
            </li>
            <li>
              <a href="#collections" className="hover:text-cream">
                Extraordinary
              </a>
            </li>
            <li>
              <a href="#collections" className="hover:text-cream">
                Rare
              </a>
            </li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="eyebrow text-cream/50 mb-4">Caché</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#about" className="hover:text-cream">
                О Caché
              </a>
            </li>
            <li>
              <a href="#purpose" className="hover:text-cream">
                Назначение
              </a>
            </li>
            <li>
              <a href="#story" className="hover:text-cream">
                История создания
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-cream">
                Знакомство с Caché
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-luxe py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-cream/40">
          <span>© {new Date().getFullYear()} Caché. Все права защищены.</span>
          <span>Москва · Личная встреча по записи</span>
        </div>
      </div>
    </footer>
  );
}
