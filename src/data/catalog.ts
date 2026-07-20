export type CollectionName = "Base" | "Extraordinary" | "Rare";
export type ProductSize = "S" | "M";

export type CatalogProduct = {
  id: string;
  collection: CollectionName;
  color: string;
  size: ProductSize;
  materials: string;
  metal: string;
  price: number | null;
  cardImage: string;
  images: string[];
  tone: string;
  presentation?: boolean;
  custom?: boolean;
};

const catalogImages = import.meta.glob<string>("../assets/catalog/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});

const image = (file: string) => catalogImages[`../assets/catalog/${file}`];
const gallery = (...files: string[]) => files.map(image);

const baseGreigeS = gallery("base-greige-1.jpg", "base-greige-2.jpg", "base-greige-3.jpg");
const baseGreigeM = gallery("base-greige-m.jpg", "base-greige-m-2.jpg", "base-greige-m-3.jpg");
const baseNamibS = gallery("base-namib-1.jpg", "base-namib-2.jpg", "base-namib-s-detail.jpg");
const baseNamibM = gallery("base-namib-m.jpg", "base-namib-3.jpg", "base-namib-m-2.jpg");
const baseChocolate = gallery(
  "base-chocolate-1.jpg",
  "base-chocolate-2.jpg",
  "base-chocolate-3.jpg",
);
const baseCaramelS = gallery("base-caramel-s-1.jpg");
const baseCaramelM = gallery(
  "base-caramel-m-1.jpg",
  "base-caramel-m-2.jpg",
  "base-caramel-m-3.jpg",
  "base-caramel-m-4.jpg",
  "base-caramel-m-5.jpg",
  "base-caramel-m-6.jpg",
);
const denimS = gallery("extra-denim-1.jpg", "extra-denim-2.jpg", "extra-denim-s-detail.jpg");
const denimM = gallery("extra-denim-m.jpg", "extra-denim-3.jpg", "extra-denim-m-2.jpg");
const taupe = gallery("extra-taupe-1.jpg", "extra-taupe-2.jpg", "extra-taupe-3.jpg");
const granat = gallery("extra-granat-1.jpg", "extra-granat-2.jpg", "extra-granat-dark.jpg");
const duneS = gallery("extra-dune-1.jpg", "extra-dune-2.jpg", "extra-dune-s-detail.jpg");
const duneM = gallery("extra-dune-m.jpg", "extra-dune-3.jpg", "extra-dune-m-2.jpg");
const cinnamon = gallery("extra-cinnamon-1.jpg", "extra-cinnamon-2.jpg", "extra-cinnamon-3.jpg");
const jungle = gallery("extra-jungle-1.jpg", "extra-jungle-2.jpg", "extra-jungle-3.jpg");
const malachite = gallery(
  "extra-malachite-1.jpg",
  "extra-malachite-2.jpg",
  "extra-malachite-3.jpg",
);
const scarlettS = gallery(
  "extra-scarlett-1.jpg",
  "extra-scarlett-2.jpg",
  "extra-scarlett-s-detail.jpg",
);
const scarlettM = gallery("extra-scarlett-m.jpg", "extra-scarlett-3.jpg", "extra-scarlett-m-2.jpg");
const sapphireS = gallery(
  "extra-sapphire-1.jpg",
  "extra-sapphire-2.jpg",
  "extra-sapphire-s-detail.jpg",
);
const sapphireM = gallery(
  "extra-sapphire-m-1.jpg",
  "extra-sapphire-3.jpg",
  "extra-sapphire-m-2.jpg",
);
const lizard = gallery(
  "extra-lizard-1.jpg",
  "extra-lizard-2.jpg",
  "extra-lizard-3.jpg",
  "extra-lizard-4.jpg",
  "extra-lizard-5.jpg",
  "extra-lizard-6.jpg",
  "extra-lizard-7.jpg",
  "extra-lizard-8.jpg",
);
const butter = gallery("extra-butter-1.jpg", "extra-butter-2.jpg", "extra-butter-3.jpg");
const onyx = gallery(
  "rare-onyx-4.jpg",
  "rare-onyx-1.jpg",
  "rare-onyx-2.jpg",
  "rare-onyx-7.jpg",
  "rare-onyx-6.jpg",
  "rare-onyx-5.jpg",
  "rare-onyx-3.jpg",
  "rare-onyx-8.jpg",
  "rare-onyx-9.jpg",
);

export const catalogProducts: CatalogProduct[] = [
  {
    id: "base-greige-s",
    collection: "Base",
    color: "Грейдж",
    size: "S",
    materials: "Кожа козы, замша телёнка",
    metal: "Никель",
    price: 265000,
    cardImage: image("base-greige-2.jpg"),
    images: baseGreigeS,
    tone: "#aaa198",
    presentation: true,
  },
  {
    id: "base-greige-m",
    collection: "Base",
    color: "Грейдж",
    size: "M",
    materials: "Кожа козы, замша телёнка",
    metal: "Никель",
    price: 350000,
    cardImage: image("base-greige-m.jpg"),
    images: baseGreigeM,
    tone: "#aaa198",
  },
  {
    id: "base-namib-s",
    collection: "Base",
    color: "Намиб",
    size: "S",
    materials: "Кожа козы, замша козы",
    metal: "Золото",
    price: 265000,
    cardImage: image("base-namib-2.jpg"),
    images: baseNamibS,
    tone: "#a56e47",
  },
  {
    id: "base-namib-m",
    collection: "Base",
    color: "Намиб",
    size: "M",
    materials: "Кожа козы, замша козы",
    metal: "Золото",
    price: 350000,
    cardImage: image("base-namib-m.jpg"),
    images: baseNamibM,
    tone: "#a56e47",
  },
  {
    id: "base-chocolate-s",
    collection: "Base",
    color: "Шоколад",
    size: "S",
    materials: "Кожа козы, замша козы",
    metal: "Золото",
    price: 265000,
    cardImage: image("base-chocolate-2.jpg"),
    images: baseChocolate,
    tone: "#49342d",
    presentation: true,
  },
  {
    id: "base-caramel-s",
    collection: "Base",
    color: "Карамель",
    size: "S",
    materials: "Кожа козы, замша козы",
    metal: "Золото",
    price: 265000,
    cardImage: image("base-caramel-s-1.jpg"),
    images: baseCaramelS,
    tone: "#a6532d",
  },
  {
    id: "base-caramel-m",
    collection: "Base",
    color: "Карамель",
    size: "M",
    materials: "Кожа козы, замша козы",
    metal: "Золото",
    price: 350000,
    cardImage: image("base-caramel-m-1.jpg"),
    images: baseCaramelM,
    tone: "#a6532d",
  },
  {
    id: "extra-denim-s",
    collection: "Extraordinary",
    color: "Деним",
    size: "S",
    materials: "Кожа телёнка, замша козы",
    metal: "Золото",
    price: 285000,
    cardImage: image("extra-denim-2.jpg"),
    images: denimS,
    tone: "#687783",
  },
  {
    id: "extra-denim-m",
    collection: "Extraordinary",
    color: "Деним",
    size: "M",
    materials: "Кожа телёнка, замша козы",
    metal: "Золото",
    price: 395000,
    cardImage: image("extra-denim-m.jpg"),
    images: denimM,
    tone: "#687783",
  },
  {
    id: "extra-malachite-s",
    collection: "Extraordinary",
    color: "Малахит",
    size: "S",
    materials: "Кожа страуса, замша козы",
    metal: "Золото",
    price: 360000,
    cardImage: image("extra-malachite-2.jpg"),
    images: malachite,
    tone: "#1f5c47",
    presentation: true,
  },
  {
    id: "extra-granat-s",
    collection: "Extraordinary",
    color: "Гранат",
    size: "S",
    materials: "Матовая кожа козы, замша козы",
    metal: "Тёмный никель",
    price: 285000,
    cardImage: image("extra-granat-2.jpg"),
    images: granat,
    tone: "#59303b",
  },
  {
    id: "extra-dune-s",
    collection: "Extraordinary",
    color: "Дюна",
    size: "S",
    materials: "Нубук кожи страуса, замша козы",
    metal: "Золото",
    price: 360000,
    cardImage: image("extra-dune-2.jpg"),
    images: duneS,
    tone: "#bd8b5e",
  },
  {
    id: "extra-dune-m",
    collection: "Extraordinary",
    color: "Дюна",
    size: "M",
    materials: "Нубук кожи страуса, замша козы",
    metal: "Золото",
    price: 495000,
    cardImage: image("extra-dune-m.jpg"),
    images: duneM,
    tone: "#bd8b5e",
  },
  {
    id: "extra-jungle-s",
    collection: "Extraordinary",
    color: "Джангл",
    size: "S",
    materials: "Кожа козы, замша козы",
    metal: "Золото",
    price: 285000,
    cardImage: image("extra-jungle-2.jpg"),
    images: jungle,
    tone: "#188247",
  },
  {
    id: "extra-scarlett-s",
    collection: "Extraordinary",
    color: "Скарлетт",
    size: "S",
    materials: "Кожа козы, замша овцы",
    metal: "Никель",
    price: 285000,
    cardImage: image("extra-scarlett-2.jpg"),
    images: scarlettS,
    tone: "#bf1c2c",
  },
  {
    id: "extra-scarlett-m",
    collection: "Extraordinary",
    color: "Скарлетт",
    size: "M",
    materials: "Кожа козы, замша овцы",
    metal: "Никель",
    price: 395000,
    cardImage: image("extra-scarlett-m.jpg"),
    images: scarlettM,
    tone: "#bf1c2c",
    presentation: true,
  },
  {
    id: "extra-taupe-s",
    collection: "Extraordinary",
    color: "Тауп",
    size: "S",
    materials: "Кожа козы, замша козы",
    metal: "Тёмный никель",
    price: 285000,
    cardImage: image("extra-taupe-2.jpg"),
    images: taupe,
    tone: "#76665c",
  },
  {
    id: "extra-cinnamon-s",
    collection: "Extraordinary",
    color: "Корица",
    size: "S",
    materials: "Кожа телёнка, замша телёнка",
    metal: "Никель",
    price: 285000,
    cardImage: image("extra-cinnamon-2.jpg"),
    images: cinnamon,
    tone: "#9b492f",
  },
  {
    id: "extra-sapphire-s",
    collection: "Extraordinary",
    color: "Сапфир",
    size: "S",
    materials: "Кожа козы, замша козы",
    metal: "Никель",
    price: 285000,
    cardImage: image("extra-sapphire-2.jpg"),
    images: sapphireS,
    tone: "#273653",
  },
  {
    id: "extra-sapphire-m",
    collection: "Extraordinary",
    color: "Сапфир",
    size: "M",
    materials: "Кожа козы, замша козы",
    metal: "Никель",
    price: 395000,
    cardImage: image("extra-sapphire-m-1.jpg"),
    images: sapphireM,
    tone: "#273653",
  },
  {
    id: "extra-lizard-s",
    collection: "Extraordinary",
    color: "?",
    size: "S",
    materials: "Кожа ящерицы, кожа козы, замша козы",
    metal: "Никель",
    price: 360000,
    cardImage: image("extra-lizard-1.jpg"),
    images: lizard,
    tone: "#7b666b",
  },
  {
    id: "extra-butter-s",
    collection: "Extraordinary",
    color: "Сливочное масло",
    size: "S",
    materials: "Кожа козы, замша козы",
    metal: "Золото",
    price: 285000,
    cardImage: image("extra-butter-1.jpg"),
    images: butter,
    tone: "#e0be68",
  },
  {
    id: "rare-onyx-s",
    collection: "Rare",
    color: "Чёрный оникс",
    size: "S",
    materials: "Материалы подбираются индивидуально",
    metal: "Фурнитура на заказ",
    price: null,
    cardImage: image("rare-onyx-4.jpg"),
    images: onyx,
    tone: "#161412",
    presentation: true,
    custom: true,
  },
];

export const formatPrice = (price: number | null) =>
  price === null ? "По запросу" : `${new Intl.NumberFormat("ru-RU").format(price)} ₽`;
