import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
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
import { submitFeedback } from "@/lib/feedback";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Caché — кожаные футляры ручной работы" },
      {
        name: "description",
        content:
          "Кожаные футляры ручной работы, в которых каждое украшение обретает своё место. Бережное хранение и транспортировка драгоценностей.",
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
    text: "Коллекция повседневной роскоши: спокойная природная палитра, чистая форма и бережное хранение на каждый день.",
    details: ["Кожа козы и замша телёнка", "Размеры S и M", "Никель или золото"],
  },
  {
    name: "Extraordinary",
    filter: "Extraordinary" as const,
    caption: "Extraordinary",
    image: collectionExtraordinaryAsset,
    alt: "Футляр Caché Extraordinary на тёмном скульптурном объекте",
    text: "Выразительная коллекция, которая приглашает исследовать характер и настроение и читать между строк аллюзии к культовым событиям и предметам искусства.",
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
    text: "Футляр, созданный на заказ для вашей драгоценности: с индивидуальным выбором материалов и разработкой новых форм.",
    details: [
      "Личная встреча и интервью",
      "Индивидуальный подбор материалов",
      "Чёрный цвет только в Rare",
    ],
  },
];

const construction = [
  {
    n: "01",
    title: "Внешний футляр из кожи",
    text: "Кожа высочайшего качества: коза, телёнок, страус, ящерица, нубук. Годами держит форму и сохраняет прекрасный вид.",
  },
  {
    n: "02",
    title: "Мягкая замшевая отделка",
    text: "Внутренние стенки и ложементы выполнены из натуральной замши, которая бережна к металлу и камням.",
  },
  {
    n: "03",
    title: "Сменные ложементы",
    text: "Можно быстро извлечь и легко поставить подходящий. Ложементы самодостаточны, их можно использовать отдельно — например, в сейфе.",
  },
  {
    n: "04",
    title: "Фиксаторы для украшений",
    text: "Отдельные крепления для колец, пусет и сетов украшений.",
  },
  {
    n: "05",
    title: "Подушечка в крышке",
    text: "Лёгкая как пёрышко, мягко прижимает содержимое, стабилизируя его при движении.",
  },
  {
    n: "06",
    title: "Расстояние между зонами",
    text: "Эргономика большинства ложементов исключает соприкосновение украшений друг с другом.",
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
            Caché — кожаные футляры ручной работы, в которых каждое украшение обретает своё место.
          </p>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink/80">
            Незаменимый атрибут насыщенной светской жизни, который позволит забыть о беспокойстве за
            драгоценности. Уникальная эргономика, исключающая привычные способы хранения, которые
            подвергают риску ваши ценности.
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
          <p className="eyebrow mb-5">Бережное хранение</p>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">
            Украшения не&nbsp;должны лежать вплотную
          </h2>
        </div>
        <div className="md:col-span-7 md:pt-2 space-y-6 text-[17px] leading-relaxed text-ink/85">
          <p>
            В обычных футлярах и шкатулках украшения часто оказываются слишком близко друг к другу.
            А сам дизайн органайзеров провоцирует разместить внутри как можно больше изделий. Это
            становится причиной досадных повреждений: появляются микроцарапины на металле и камнях,
            гнутся или рвутся отдельные элементы.
          </p>
          <p className="font-display text-2xl md:text-3xl text-ink leading-snug border-l-2 border-cognac pl-6">
            Caché физически не даёт украшениям соприкасаться друг с&nbsp;другом.
          </p>
          <p>
            Эргономика футляра исключает возможность положить лишнее. У каждого предмета есть своё
            место с надёжной фиксацией и необходимым расстоянием от соседа.
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
            <p className="eyebrow mb-5">Шесть лет тестирования</p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-normal">
              Мы снова и снова меняли переменные в поисках идеальной формулы хранения
            </h2>
          </div>
          <p className="md:col-span-5 md:pt-3 text-[16px] leading-relaxed text-muted-foreground">
            Мы шесть лет тестировали эргономику Caché: расстояние между элементами, форму
            ложементов, материалы для внутренней отделки и сценарии использования. Результат:
            футляр, который воплощает роскошные условия хранения и перевозки ценностей.
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
                Когда форма определяет содержание
              </h3>
            </div>
            <p className="md:col-span-7 text-[16px] leading-relaxed text-muted-foreground">
              Каждый футляр независимо от размеров сопровождается набором сменных ложементов.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                label: "S",
                image: insertSAsset,
                alt: "Схема назначения ложементов Caché размера S",
                description:
                  "Миниатюрный футляр в размере S подходит для набора из 3–4 колец классического размера или 1–2 колец побольше. Он также идеально подходит для коллекции пусет. А чехольчики могут использоваться для кулонов или брошей.",
              },
              {
                label: "M",
                image: insertMAsset,
                alt: "Схема назначения ложементов Caché размера M",
                description:
                  "Футляр M идеально подходит для сетов из кольца и серёг. А также для уверенной коллекции из 9–12 классических колец или хранения двух крупных украшений: колец или брошей.",
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
                <figcaption className="px-5 py-5 text-sm leading-relaxed text-muted-foreground">
                  <span className="mb-2 block font-display text-2xl text-ink">
                    Размер {item.label}
                  </span>
                  {item.description}
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
              Драгоценность — это не только высококлассные материалы и искусная работа мастеров. Это
              воспоминания о событиях и дорогих людях, это история отношений, наследие семьи. Место
              хранения должно соответствовать ценности предмета и беречь то, что по-настоящему
              дорого.
            </p>
            <p>
              Caché создаёт для вашей ценности маленький дом: мягкий и нежный внутри, структурный и
              надёжный снаружи. Футляр идеально подходит для бережной транспортировки, удобно
              размещается в сейфе и преображает своим присутствием любой интерьер.
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
          <div className="md:col-span-5 md:pt-3 space-y-5 text-[16px] leading-relaxed text-muted-foreground">
            <p>
              Если коллекция Base транслирует повседневную роскошь, то Extraordinary приглашает
              исследовать характер и настроение, а также читать между строк аллюзии к культовым
              событиям или предметам искусства.
            </p>
            <p>
              Rare — это специально созданный на заказ футляр для вашей драгоценности. Такая
              возможность предполагает как выбор материалов, так и разработку новых форм. Только в
              Rare чёрный цвет доступен для заказа.
            </p>
          </div>
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
              Caché создаётся из премиальной кожи. В коллекции Base используется кожа козы или
              телёнка. В Extraordinary присутствуют модели из экзотических видов кожи: страуса,
              ящерицы, крокодила, а также применяется кожа редких способов дубления, например
              растительного. Для внутренней отделки используется натуральная замша.
            </p>
            <p>
              Ручная работа обеспечивает исключительное качество швов и обработки, позволяет уделять
              качественное внимание деталям, на которое не способны машины.
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
          <figure className="md:col-span-5 bg-greige">
            <img
              src={castleAsset}
              alt="Исторический замок с освещёнными окнами вечером"
              width={960}
              height={640}
              loading="lazy"
              className="w-full aspect-[4/3] object-cover"
            />
            <figcaption className="px-5 py-4 text-sm leading-relaxed text-muted-foreground">
              Именно здесь, в итальянском замке с тысячелетней историей, родилась идея Caché.
            </figcaption>
          </figure>
        </div>
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7 space-y-6 text-[17px] leading-relaxed text-ink/85">
            <p>
              Однажды Дарья поняла, что ей жаль класть любимые украшения в тот футляр, который у неё
              был. Формально место было, но оно не подходило, не соответствовало предметам: их
              красоте и тонкой работе ювелира. Дарью охватило беспокойство, которое переросло в
              бессонную ночь.
            </p>
            <p>
              Наутро появилась идея создать футляр, где украшения не просто лежат, а находятся в
              правильной среде: защищённой, мягкой, детально продуманной и достойной самых
              изысканных драгоценностей.
            </p>
            <p>
              Дарья вспомнила о таланте Алексея Скрябина, мастера кожевенного дела, и рассказала о
              своей навязчивой идее создать превосходный дом для её украшений. Вместе они шесть лет
              искали идеальное решение: дорабатывали форму, изобретали ложементы, перебирали
              материалы и исследовали сценарии использования. Так появился Caché.
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
          <p>
            Для нас хранение — это форма отношения. К украшению, к событию, к себе, к памяти, к
            наследию, к людям, что с этим связаны. Возможно, мы немного старомодны в своей
            бережливости, но мы уверены, что есть такие вещи, которые заставляют нас почтительно
            обращаться с собой. Именно для таких особенных предметов был создан Caché.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── CTA ───────────────────────── */

function CTA() {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const submitting = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    submitting.current = true;
    setStatus("submitting");
    setErrorMessage("");

    try {
      await submitFeedback({
        submissionId: crypto.randomUUID(),
        formType: "general",
        name: String(formData.get("name") ?? "").trim(),
        contact: String(formData.get("contact") ?? "").trim(),
        interests: formData.getAll("interest").map(String),
        comment: String(formData.get("comment") ?? "").trim(),
        pageUrl: window.location.href,
        website: String(formData.get("website") ?? ""),
      });

      form.reset();
      setStatus("sent");
    } catch (error) {
      setErrorMessage(
        error instanceof Error && error.message === "FORM_NOT_CONFIGURED"
          ? "Форма пока не настроена. Пожалуйста, свяжитесь с нами по email или в мессенджере."
          : "Не удалось отправить заявку. Проверьте соединение и попробуйте ещё раз.",
      );
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  function resetForm() {
    setStatus("idle");
    setErrorMessage("");
  }

  return (
    <section id="contact" className="bg-background">
      <div className="container-luxe py-20 md:py-32 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <p className="eyebrow mb-5">Знакомство с Caché</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02] mb-6">
            Познакомьтесь с Caché лично
          </h2>
          <p className="text-[16px] text-muted-foreground leading-relaxed mb-10 max-w-md">
            Запросите каталог, обсудите создание индивидуального футляра или запишитесь на личный
            показ.
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
          onSubmit={handleSubmit}
        >
          {status === "sent" ? (
            <div className="py-16 text-center">
              <p className="font-display text-3xl mb-3">Спасибо.</p>
              <p className="text-muted-foreground">Мы свяжемся с вами в ближайшее время.</p>
              <button type="button" className="btn-ghost mt-8" onClick={resetForm}>
                Отправить ещё одну заявку
              </button>
            </div>
          ) : (
            <>
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Не заполняйте это поле</label>
                <input id="website" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <Field label="Имя" name="name" autoComplete="name" required />
              <Field
                label="Телефон, Telegram или email"
                name="contact"
                autoComplete="email"
                required
              />
              <div>
                <p className="eyebrow block mb-3">Что интересно</p>
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
                <label htmlFor="comment" className="eyebrow block mb-2">
                  Комментарий
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  maxLength={1500}
                  rows={4}
                  className="w-full bg-background border border-border px-4 py-3 text-[15px] focus:outline-none focus:border-ink resize-none"
                />
              </div>
              {status === "error" && (
                <p
                  role="alert"
                  className="border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
                >
                  {errorMessage}
                </p>
              )}
              <button
                type="submit"
                className="btn-primary w-full justify-center disabled:cursor-wait disabled:opacity-60"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Отправляем…" : "Отправить заявку"}
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

function Field({
  label,
  name,
  required,
  autoComplete,
  maxLength,
}: {
  label: string;
  name: string;
  required?: boolean;
  autoComplete?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow block mb-2">
        {label} {required && <span className="text-cognac">*</span>}
      </label>
      <input
        id={name}
        name={name}
        required={required}
        autoComplete={autoComplete}
        maxLength={maxLength ?? (name === "name" ? 120 : 200)}
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
