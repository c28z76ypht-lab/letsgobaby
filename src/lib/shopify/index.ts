import { shopifyFetch, isShopifyConfigured } from "./client";
import {
  COLLECTIONS_QUERY,
  COLLECTION_WITH_PRODUCTS_QUERY,
  ALL_PRODUCTS_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
} from "./queries";
import { normalizeProduct, normalizeCollection } from "./normalize";
import type {
  ShopifyCollection,
  ShopifyProduct,
  NormalizedProduct,
  NormalizedCollection,
} from "./types";
import {
  collections as sampleCollections,
  sampleProducts,
} from "@/lib/data";

// Re-export for convenience
export type { NormalizedProduct, NormalizedCollection };
export { isShopifyConfigured };

type CollectionsResponse = {
  collections: {
    edges: {
      node: ShopifyCollection;
    }[];
  };
};

type CollectionResponse = {
  collection: ShopifyCollection;
};

type ProductsResponse = {
  products: {
    edges: {
      node: ShopifyProduct & {
        collections: {
          edges: { node: { handle: string; title: string } }[];
        };
      };
    }[];
  };
};

type ProductResponse = {
  product: ShopifyProduct & {
    collections: {
      edges: { node: { handle: string; title: string } }[];
    };
  };
};

export async function getCollections(): Promise<NormalizedCollection[]> {
  if (!isShopifyConfigured()) {
    return sampleCollections.map((c) => ({
      ...c,
      image: c.image || "",
    }));
  }

  const data = await shopifyFetch<CollectionsResponse>({
    query: COLLECTIONS_QUERY,
  });

  return data.collections.edges.map((e) => normalizeCollection(e.node));
}

export async function getCollectionWithProducts(
  handle: string
): Promise<{
  collection: NormalizedCollection;
  products: NormalizedProduct[];
} | null> {
  if (!isShopifyConfigured()) {
    const col = sampleCollections.find((c) => c.slug === handle);
    if (!col) return null;

    const products = sampleProducts
      .filter((p) => p.collection === col.id)
      .map((p) => ({
        ...p,
        images: [p.image],
        descriptionHtml: `<p>${p.description}</p>`,
        vendor: "",
        tags: [p.ageTag],
        availableForSale: true,
        totalStock: 3,
      }));

    return {
      collection: { ...col, image: col.image || "" },
      products,
    };
  }

  const data = await shopifyFetch<CollectionResponse>({
    query: COLLECTION_WITH_PRODUCTS_QUERY,
    variables: { handle },
  });

  if (!data.collection) return null;

  return {
    collection: normalizeCollection(data.collection),
    products: data.collection.products.edges.map((e) =>
      normalizeProduct(e.node as ShopifyProduct & {
        collections: { edges: { node: { handle: string; title: string } }[] };
      })
    ),
  };
}

export async function getAllProducts(): Promise<NormalizedProduct[]> {
  if (!isShopifyConfigured()) {
    return sampleProducts.map((p) => ({
      ...p,
      images: [p.image],
      descriptionHtml: `<p>${p.description}</p>`,
      vendor: "",
      tags: [p.ageTag],
      availableForSale: true,
      totalStock: 3,
    }));
  }

  const data = await shopifyFetch<ProductsResponse>({
    query: ALL_PRODUCTS_QUERY,
  });

  return data.products.edges.map((e) => normalizeProduct(e.node));
}

export async function getProductByHandle(
  handle: string
): Promise<NormalizedProduct | null> {
  if (!isShopifyConfigured()) {
    const p = sampleProducts.find((p) => p.slug === handle);
    if (!p) return null;

    return {
      ...p,
      images: [p.image],
      descriptionHtml: `<p>${p.description}</p>`,
      vendor: "",
      tags: [p.ageTag],
      availableForSale: true,
      totalStock: 3,
    };
  }

  const data = await shopifyFetch<ProductResponse>({
    query: PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
  });

  if (!data.product) return null;

  return normalizeProduct(data.product);
}
