import type { CollectionName, ProductSize } from "@/data/catalog";

export type CatalogSearch = {
  collection?: CollectionName;
  size?: ProductSize;
};

export type CollectionFilter = "Все" | CollectionName;
export type SizeFilter = "Все" | ProductSize;

const collections: CollectionName[] = ["Base", "Extraordinary", "Rare"];
const sizes: ProductSize[] = ["S", "M"];

export function validateCatalogSearch(search: Record<string, unknown>): CatalogSearch {
  return {
    collection: collections.includes(search.collection as CollectionName)
      ? (search.collection as CollectionName)
      : undefined,
    size: sizes.includes(search.size as ProductSize) ? (search.size as ProductSize) : undefined,
  };
}

export function toCatalogSearch(collection: CollectionFilter, size: SizeFilter): CatalogSearch {
  return {
    collection: collection === "Все" ? undefined : collection,
    size: size === "Все" ? undefined : size,
  };
}
