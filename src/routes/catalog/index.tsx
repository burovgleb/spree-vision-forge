import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CatalogPage } from "@/components/catalog-page";
import { validateCatalogSearch } from "@/lib/catalog-routing";

export const Route = createFileRoute("/catalog/")({
  validateSearch: validateCatalogSearch,
  head: () => ({
    meta: [
      { title: "Каталог Caché 2026 — футляры для драгоценностей" },
      {
        name: "description",
        content:
          "Коллекции Caché Base, Extraordinary и Rare. Кожаные футляры ручной работы для хранения драгоценностей.",
      },
    ],
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
