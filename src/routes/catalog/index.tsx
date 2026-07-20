import { createFileRoute, useNavigate } from "@tanstack/react-router";
import catalogShareAsset from "@/assets/catalog/base-greige-1.jpg";
import { CatalogPage } from "@/components/catalog-page";
import { catalogProducts } from "@/data/catalog";
import { validateCatalogSearch } from "@/lib/catalog-routing";
import { absoluteUrl, SITE_ORIGIN } from "@/lib/seo";

const catalogDescription =
  "Коллекции Caché Base, Extraordinary и Rare: кожаные футляры ручной работы для бережного хранения и транспортировки украшений.";
const catalogUrl = absoluteUrl("/catalog/");

export const Route = createFileRoute("/catalog/")({
  validateSearch: validateCatalogSearch,
  head: () => ({
    meta: [
      { title: "Каталог футляров для украшений — Caché" },
      { name: "description", content: catalogDescription },
      { property: "og:title", content: "Каталог футляров для украшений — Caché" },
      { property: "og:description", content: catalogDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: catalogUrl },
      { property: "og:image", content: absoluteUrl(catalogShareAsset) },
      {
        property: "og:image:alt",
        content: "Футляр Caché Base с ложементами для украшений",
      },
      { property: "og:image:width", content: "2000" },
      { property: "og:image:height", content: "1305" },
      { name: "twitter:title", content: "Каталог футляров для украшений — Caché" },
      { name: "twitter:description", content: catalogDescription },
      { name: "twitter:image", content: absoluteUrl(catalogShareAsset) },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": `${catalogUrl}#page`,
              url: catalogUrl,
              name: "Каталог футляров для украшений — Caché",
              description: catalogDescription,
              inLanguage: "ru-RU",
              isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
              mainEntity: { "@id": `${catalogUrl}#products` },
            },
            {
              "@type": "ItemList",
              "@id": `${catalogUrl}#products`,
              numberOfItems: catalogProducts.length,
              itemListElement: catalogProducts.map((product, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: `Caché ${product.collection} ${product.color}, размер ${product.size}`,
                url: absoluteUrl(`/catalog/${product.id}`),
              })),
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
                { "@type": "ListItem", position: 2, name: "Каталог", item: catalogUrl },
              ],
            },
          ],
        },
      },
    ],
    links: [{ rel: "canonical", href: catalogUrl }],
  }),
  component: CatalogRoute,
});

function CatalogRoute() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  return (
    <CatalogPage
      search={search}
      onSearchChange={(nextSearch) => navigate({ search: nextSearch })}
      onCloseProduct={() => undefined}
    />
  );
}
