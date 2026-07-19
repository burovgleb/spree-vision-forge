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

export const Route = createFileRoute("/catalog/$productId")({
  validateSearch: validateCatalogSearch,
  beforeLoad: ({ params }) => {
    if (!catalogProducts.some((product) => product.id === params.productId)) {
      throw notFound();
    }
  },
  head: ({ params }) => {
    const product = catalogProducts.find((item) => item.id === params.productId);
    return {
      meta: [
        {
          title: product
            ? `${product.collection} ${product.color}, ${product.size} — Caché`
            : "Модель не найдена — Caché",
        },
        {
          name: "description",
          content: product
            ? `${product.materials}. Размер ${product.size}. ${product.price ? `Стоимость ${product.price.toLocaleString("ru-RU")} ₽.` : "Индивидуальный заказ."}`
            : "Каталог футляров Caché.",
        },
      ],
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
