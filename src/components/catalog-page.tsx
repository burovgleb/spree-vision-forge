import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { catalogProducts, formatPrice, type CatalogProduct } from "@/data/catalog";
import {
  toCatalogSearch,
  type CatalogSearch,
  type CollectionFilter,
  type SizeFilter,
} from "@/lib/catalog-routing";
import { useHideOnScroll } from "@/lib/use-hide-on-scroll";
import { submitFeedback } from "@/lib/feedback";

const collectionFilters: CollectionFilter[] = ["Все", "Base", "Extraordinary", "Rare"];
const sizeFilters: SizeFilter[] = ["Все", "S", "M"];

type CatalogPageProps = {
  search: CatalogSearch;
  selectedProductId?: string;
  onSearchChange: (search: CatalogSearch) => void;
  onCloseProduct: () => void;
};

export function CatalogPage({
  search,
  selectedProductId,
  onSearchChange,
  onCloseProduct,
}: CatalogPageProps) {
  const headerHidden = useHideOnScroll();
  const collection: CollectionFilter = search.collection ?? "Все";
  const size: SizeFilter = search.size ?? "Все";
  const selectedProduct = selectedProductId
    ? catalogProducts.find((product) => product.id === selectedProductId)
    : undefined;

  const products = useMemo(
    () =>
      catalogProducts.filter(
        (product) =>
          (collection === "Все" || product.collection === collection) &&
          (size === "Все" || product.size === size),
      ),
    [collection, size],
  );

  return (
    <div
      className={`catalog-page min-h-screen bg-background text-foreground ${headerHidden ? "is-header-hidden" : ""}`}
    >
      <CatalogHeader hidden={headerHidden} />
      <main>
        <section id="catalog" className="catalog-shell catalog-shell-page pb-24 md:pb-36">
          <div className="catalog-intro">
            <div>
              <p className="catalog-kicker">Каталог 2026</p>
              <h1>Коллекция Caché</h1>
            </div>
            <p>
              Футляры, в которых каждое украшение получает своё защищённое место. Выберите модель,
              чтобы рассмотреть кожу, швы и внутреннюю архитектуру крупно.
            </p>
          </div>

          <CatalogFilters
            collection={collection}
            size={size}
            count={products.length}
            onCollection={(nextCollection) => onSearchChange(toCatalogSearch(nextCollection, size))}
            onSize={(nextSize) => onSearchChange(toCatalogSearch(collection, nextSize))}
          />

          <div className="catalog-grid" aria-live="polite">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                search={search}
                featured={index === 0}
              />
            ))}
          </div>
        </section>
        <CollectionStatement />
      </main>
      <CatalogFooter />

      {selectedProduct && <ProductExperience product={selectedProduct} onClose={onCloseProduct} />}
    </div>
  );
}

function CatalogHeader({ hidden }: { hidden: boolean }) {
  return (
    <header className={`catalog-header ${hidden ? "is-hidden" : ""}`}>
      <div className="container-luxe catalog-header-inner">
        <Link
          to="/"
          className="catalog-wordmark flex flex-col leading-none"
          aria-label="Caché — на главную"
        >
          <span className="font-display text-3xl md:text-[34px] tracking-wide">Caché</span>
          <span className="hidden sm:block mt-1 font-sans text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Культура хранения ценного
          </span>
        </Link>
        <div className="catalog-header-meta">
          <span>Каталог 2026</span>
        </div>
      </div>
    </header>
  );
}

function CatalogFilters({
  collection,
  size,
  count,
  onCollection,
  onSize,
}: {
  collection: CollectionFilter;
  size: SizeFilter;
  count: number;
  onCollection: (value: CollectionFilter) => void;
  onSize: (value: SizeFilter) => void;
}) {
  return (
    <div className="catalog-filter-bar">
      <div className="catalog-filter-row" aria-label="Фильтр по коллекции">
        {collectionFilters.map((filter) => (
          <button
            type="button"
            key={filter}
            className={collection === filter ? "is-active" : ""}
            onClick={() => onCollection(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="catalog-size-filter" aria-label="Фильтр по размеру">
        <span>Размер</span>
        {sizeFilters.map((filter) => (
          <button
            type="button"
            key={filter}
            className={size === filter ? "is-active" : ""}
            onClick={() => onSize(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <span className="catalog-count">{count.toString().padStart(2, "0")}</span>
    </div>
  );
}

function ProductCard({
  product,
  search,
  featured,
}: {
  product: CatalogProduct;
  search: CatalogSearch;
  featured: boolean;
}) {
  return (
    <article className={`catalog-card ${featured ? "catalog-card-featured" : ""}`}>
      <Link
        to="/catalog/$productId"
        params={{ productId: product.id }}
        search={search}
        state={{ fromCatalog: true }}
        className="catalog-card-button"
      >
        <span className="catalog-card-image">
          <img
            src={product.cardImage}
            alt={`Футляр Caché ${product.collection}, ${product.color}, размер ${product.size}`}
            width={2000}
            height={1333}
            loading="lazy"
          />
          <span className="catalog-card-zoom">
            <Maximize2 size={15} strokeWidth={1.4} />
            Открыть
          </span>
          {product.presentation && <span className="catalog-card-edition">Выбор Caché</span>}
        </span>
        <span className="catalog-card-info">
          <span>
            <span className="catalog-card-collection">{product.collection}</span>
            <strong>{product.color}</strong>
          </span>
          <span className="catalog-card-aside">
            <span>{product.size}</span>
            <span>{formatPrice(product.price)}</span>
          </span>
        </span>
      </Link>
    </article>
  );
}

function ProductExperience({ product, onClose }: { product: CatalogProduct; onClose: () => void }) {
  const [activeImage, setActiveImage] = useState(0);
  const [zoomImage, setZoomImage] = useState<number | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (zoomImage !== null) setZoomImage(null);
      else if (inquiryOpen) setInquiryOpen(false);
      else onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [inquiryOpen, onClose, zoomImage]);

  const goToImage = (index: number) => {
    const next = (index + product.images.length) % product.images.length;
    setActiveImage(next);
    galleryRef.current?.scrollTo({
      left: galleryRef.current.clientWidth * next,
      behavior: "smooth",
    });
  };

  return (
    <div className="product-experience" role="dialog" aria-modal="true" aria-label={product.color}>
      <div className="product-experience-topbar">
        <button type="button" onClick={onClose} className="product-back">
          <ArrowLeft size={18} strokeWidth={1.3} />
          <span>Каталог</span>
        </button>
        <span className="product-experience-logo">Caché</span>
        <span className="product-image-counter">
          {String(activeImage + 1).padStart(2, "0")} /{" "}
          {String(product.images.length).padStart(2, "0")}
        </span>
      </div>

      <div className="product-experience-layout">
        <div className="product-gallery-wrap">
          <div
            className="product-gallery"
            ref={galleryRef}
            onScroll={(event) => {
              const target = event.currentTarget;
              setActiveImage(Math.round(target.scrollLeft / target.clientWidth));
            }}
          >
            {product.images.map((src, index) => (
              <button
                type="button"
                className="product-slide"
                key={`${product.id}-${src}`}
                onClick={() => setZoomImage(index)}
                aria-label={`Увеличить фотографию ${index + 1}`}
              >
                <img
                  src={src}
                  alt={`${product.collection} ${product.color}, вид ${index + 1}`}
                  width={2000}
                  height={1333}
                />
                <span className="product-expand">
                  <Maximize2 size={16} strokeWidth={1.3} />
                  Увеличить
                </span>
              </button>
            ))}
          </div>

          <div className="product-gallery-controls">
            <button
              type="button"
              onClick={() => goToImage(activeImage - 1)}
              aria-label="Предыдущее фото"
            >
              <ChevronLeft size={22} strokeWidth={1.2} />
            </button>
            <div>
              {product.images.map((_, index) => (
                <button
                  type="button"
                  key={index}
                  className={activeImage === index ? "is-active" : ""}
                  onClick={() => goToImage(index)}
                  aria-label={`Фото ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => goToImage(activeImage + 1)}
              aria-label="Следующее фото"
            >
              <ChevronRight size={22} strokeWidth={1.2} />
            </button>
          </div>
        </div>

        <ProductDetails product={product} onInquiry={() => setInquiryOpen(true)} />
      </div>

      {zoomImage !== null && (
        <ZoomViewer
          images={product.images}
          index={zoomImage}
          label={`${product.collection} ${product.color}`}
          onIndex={setZoomImage}
          onClose={() => setZoomImage(null)}
        />
      )}
      {inquiryOpen && <InquiryPanel product={product} onClose={() => setInquiryOpen(false)} />}
    </div>
  );
}

function ProductDetails({
  product,
  onInquiry,
}: {
  product: CatalogProduct;
  onInquiry: () => void;
}) {
  const description =
    product.collection === "Base"
      ? "Спокойная природная палитра и чистая форма. Базовая линия смещает акцент на идею, конструкцию и ежедневный ритуал хранения."
      : product.collection === "Rare"
        ? "Индивидуальный предмет, созданный в диалоге с хранителем: от материалов и фурнитуры до внутренней архитектуры ложементов."
        : "Сезонный выпуск, в котором цвет и фактура становятся частью истории. Выразительный футляр для личной коллекции сокровищ.";

  return (
    <aside className="product-details">
      <div className="product-details-scroll">
        <div className={`product-details-heading ${product.color.length > 10 ? "is-long" : ""}`}>
          <div className="product-details-kicker">
            <span>{product.collection}</span>
            <span className="product-tone" style={{ backgroundColor: product.tone }} />
          </div>
          <h2>{product.color}</h2>
          <p className="product-size-label">Размер {product.size}</p>
        </div>
        <p className="product-description">{description}</p>
        <dl className="product-specs">
          <div>
            <dt>Материалы</dt>
            <dd>{product.materials}</dd>
          </div>
          <div>
            <dt>Металл</dt>
            <dd>{product.metal}</dd>
          </div>
          <div>
            <dt>Комплектация</dt>
            <dd>Футляр и набор вынимающихся ложементов</dd>
          </div>
        </dl>
        <div className="product-care-note">
          <span>01</span>
          <p>
            Внутренняя фиксация исключает соприкосновение украшений и бережно удерживает их во время
            хранения и транспортировки.
          </p>
        </div>
      </div>
      <div className="product-purchase">
        <div>
          <span>{product.custom ? "Индивидуальный заказ" : "Стоимость"}</span>
          <strong>{formatPrice(product.price)}</strong>
        </div>
        <button type="button" onClick={onInquiry}>
          Оставить заявку
          <ArrowRight size={18} strokeWidth={1.4} />
        </button>
      </div>
    </aside>
  );
}

function ZoomViewer({
  images,
  index,
  label,
  onIndex,
  onClose,
}: {
  images: string[];
  index: number;
  label: string;
  onIndex: (index: number) => void;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(1);
  const nextIndex = (delta: number) => {
    onIndex((index + delta + images.length) % images.length);
    setZoom(1);
  };

  return (
    <div className="zoom-viewer" role="dialog" aria-modal="true" aria-label="Просмотр деталей">
      <div className="zoom-toolbar">
        <span>
          {label} · {index + 1}/{images.length}
        </span>
        <div>
          <button
            type="button"
            onClick={() => setZoom((value) => Math.max(1, value - 0.5))}
            disabled={zoom === 1}
            aria-label="Уменьшить"
          >
            <Minus size={20} />
          </button>
          <span>{zoom === 1 ? "100" : zoom === 1.5 ? "150" : "200"}%</span>
          <button
            type="button"
            onClick={() => setZoom((value) => Math.min(2, value + 0.5))}
            disabled={zoom === 2}
            aria-label="Увеличить"
          >
            <Plus size={20} />
          </button>
          <button type="button" onClick={onClose} aria-label="Закрыть просмотр">
            <X size={22} />
          </button>
        </div>
      </div>
      <div className="zoom-canvas">
        <img
          src={images[index]}
          alt={`${label}, увеличенный вид`}
          style={{
            width: `${zoom * 100}%`,
            height: zoom === 1 ? "100%" : "auto",
            maxWidth: zoom === 1 ? "100%" : "none",
          }}
        />
      </div>
      <button
        type="button"
        className="zoom-prev"
        onClick={() => nextIndex(-1)}
        aria-label="Предыдущее фото"
      >
        <ChevronLeft size={28} strokeWidth={1.2} />
      </button>
      <button
        type="button"
        className="zoom-next"
        onClick={() => nextIndex(1)}
        aria-label="Следующее фото"
      >
        <ChevronRight size={28} strokeWidth={1.2} />
      </button>
    </div>
  );
}

function InquiryPanel({ product, onClose }: { product: CatalogProduct; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const submitting = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;

    const formData = new FormData(event.currentTarget);
    submitting.current = true;
    setStatus("submitting");
    setErrorMessage("");

    try {
      await submitFeedback({
        submissionId: crypto.randomUUID(),
        formType: "product",
        name: String(formData.get("name") ?? "").trim(),
        contact: String(formData.get("contact") ?? "").trim(),
        interests: [product.collection],
        comment: String(formData.get("comment") ?? "").trim(),
        pageUrl: window.location.href,
        website: String(formData.get("website") ?? ""),
        product: {
          id: product.id,
          collection: product.collection,
          color: product.color,
          size: product.size,
          price: formatPrice(product.price),
        },
      });

      setStatus("sent");
    } catch (error) {
      setErrorMessage(
        error instanceof Error && error.message === "FORM_NOT_CONFIGURED"
          ? "Форма пока не настроена. Пожалуйста, свяжитесь с нами по email."
          : "Не удалось отправить заявку. Проверьте соединение и попробуйте ещё раз.",
      );
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  return (
    <div
      className="inquiry-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section className="inquiry-panel" aria-label="Заявка на знакомство с Caché">
        <button type="button" className="inquiry-close" onClick={onClose} aria-label="Закрыть">
          <X size={22} strokeWidth={1.3} />
        </button>
        {status === "sent" ? (
          <div className="inquiry-success">
            <span>
              <Check size={22} strokeWidth={1.4} />
            </span>
            <p className="catalog-kicker">Заявка отправлена</p>
            <h2>Спасибо.</h2>
            <p>Мы свяжемся с вами, чтобы договориться о личном знакомстве с Caché.</p>
            <button type="button" onClick={onClose}>
              Вернуться к модели
            </button>
          </div>
        ) : (
          <>
            <p className="catalog-kicker">Личное знакомство</p>
            <h2>{product.color}</h2>
            <p className="inquiry-product">
              {product.collection} · размер {product.size} · {formatPrice(product.price)}
            </p>
            <form onSubmit={handleSubmit}>
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor={`website-${product.id}`}>Не заполняйте это поле</label>
                <input
                  id={`website-${product.id}`}
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <label>
                <span>Как к вам обращаться</span>
                <input name="name" autoComplete="name" maxLength={120} required />
              </label>
              <label>
                <span>Телефон, Telegram или email</span>
                <input name="contact" autoComplete="email" maxLength={200} required />
              </label>
              <label>
                <span>Комментарий</span>
                <textarea
                  name="comment"
                  rows={3}
                  maxLength={1500}
                  defaultValue={`Интересует ${product.collection} ${product.color}, размер ${product.size}`}
                />
              </label>
              {status === "error" && (
                <p role="alert" className="inquiry-error">
                  {errorMessage}
                </p>
              )}
              <button type="submit" className="inquiry-submit" disabled={status === "submitting"}>
                {status === "submitting" ? "Отправляем…" : "Отправить заявку"}
                <ArrowRight size={18} strokeWidth={1.4} />
              </button>
              <p className="inquiry-privacy">
                Отправляя форму, вы соглашаетесь на обработку персональных данных.
              </p>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

function CollectionStatement() {
  return (
    <section className="collection-statement">
      <div>
        <p className="catalog-kicker">Три уровня доступа</p>
        <h2>
          От уверенной базы
          <br />к настоящей редкости.
        </h2>
      </div>
      <ol>
        <li>
          <span>01</span>
          <strong>Base</strong>
          <p>Природная палитра, спокойная форма и чистое выражение ДНК Caché.</p>
        </li>
        <li>
          <span>02</span>
          <strong>Extraordinary</strong>
          <p>Сезонные цвета, редкие кожи и сочетания с дополнительным подтекстом.</p>
        </li>
        <li>
          <span>03</span>
          <strong>Rare</strong>
          <p>Совместное создание единственного экземпляра вокруг личной коллекции.</p>
        </li>
      </ol>
    </section>
  );
}

function CatalogFooter() {
  return (
    <footer className="catalog-footer">
      <div>
        <p className="catalog-footer-logo">Caché</p>
        <p>Культура хранения ценного</p>
      </div>
      <div>
        <a href="mailto:hello@cache-maison.com">hello@cache-maison.com</a>
        <span>Москва · Личная встреча по записи</span>
      </div>
      <div className="catalog-footer-bottom">
        <span>© {new Date().getFullYear()} Caché</span>
        <a href="#catalog">Наверх</a>
      </div>
    </footer>
  );
}
