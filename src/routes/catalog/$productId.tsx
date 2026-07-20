import {
  createFileRoute,
  notFound,
  useLocation,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { CatalogPage } from "@/components/catalog-page";
import { catalogProducts } from "@/data/catalog";
import { validateCatalogSearch } from "@/lib/catalog-routing";
import { absoluteUrl, SITE_ORIGIN } from "@/lib/seo";

export const Route = createFileRoute("/catalog/$productId")({
  validateSearch: validateCatalogSearch,
  beforeLoad: ({ params }) => {
    if (!catalogProducts.some((product) => product.id === params.productId)) {
      throw notFound();
    }
  },
  head: ({ params }) => {
    const product = catalogProducts.find((item) => item.id === params.productId);
    if (!product) {
      return {
        meta: [
          { title: "Модель не найдена — Caché" },
          { name: "description", content: "Каталог футляров Caché." },
          { name: "robots", content: "noindex, nofollow" },
        ],
      };
    }

    const name = `Caché ${product.collection} ${product.color}, размер ${product.size}`;
    const title = `${product.collection} ${product.color}, ${product.size} — футляр Caché`;
    const description = `${product.materials}. Размер ${product.size}. ${
      product.price
        ? `Стоимость ${product.price.toLocaleString("ru-RU")} ₽.`
        : "Индивидуальный заказ."
    }`;
    const productUrl = absoluteUrl(`/catalog/${product.id}`);
    const productImage = absoluteUrl(product.images[0]);

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: productUrl },
        { property: "og:image", content: productImage },
        { property: "og:image:alt", content: name },
        ...(product.price
          ? [
              { property: "product:price:amount", content: String(product.price) },
              { property: "product:price:currency", content: "RUB" },
            ]
          : []),
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: productImage },
        {
          "script:ld+json": {
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Product",
                "@id": `${productUrl}#product`,
                name,
                description,
                sku: product.id,
                url: productUrl,
                image: product.images.map(absoluteUrl),
                category: "Футляры для украшений",
                material: product.materials,
                color: product.color,
                size: product.size,
                brand: { "@type": "Brand", name: "Caché" },
                ...(product.price
                  ? {
                      offers: {
                        "@type": "Offer",
                        url: productUrl,
                        priceCurrency: "RUB",
                        price: product.price,
                        itemCondition: "https://schema.org/NewCondition",
                        seller: { "@id": `${SITE_ORIGIN}/#organization` },
                      },
                    }
                  : {}),
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Caché",
                    item: SITE_ORIGIN,
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Каталог",
                    item: absoluteUrl("/catalog/"),
                  },
                  { "@type": "ListItem", position: 3, name, item: productUrl },
                ],
              },
            ],
          },
        },
      ],
      links: [{ rel: "canonical", href: productUrl }],
    };
  },
  component: ProductRoute,
});

function ProductRoute() {
  const { productId } = Route.useParams();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const router = useRouter();
  const openedFromCatalog = useLocation({
    select: (location) => location.state.fromCatalog === true,
  });

  const closeProduct = () => {
    if (openedFromCatalog && router.history.canGoBack()) {
      router.history.back();
      return;
    }

    navigate({ to: "/catalog", search });
  };

  return (
    <CatalogPage
      search={search}
      selectedProductId={productId}
      onSearchChange={(nextSearch) => navigate({ search: nextSearch })}
      onCloseProduct={closeProduct}
    />
  );
}
