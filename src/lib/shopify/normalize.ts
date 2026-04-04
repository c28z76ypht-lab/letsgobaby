import type {
  ShopifyProduct,
  ShopifyCollection,
  ShopifyMetafield,
  NormalizedProduct,
  NormalizedCollection,
} from "./types";

function getMetafield(
  metafields: (ShopifyMetafield | null)[],
  key: string
): string {
  const field = metafields?.find((m) => m && m.key === key);
  return field?.value || "";
}

function parseJsonArray(value: string): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [value];
  } catch {
    return value
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  }
}

export function normalizeProduct(
  product: ShopifyProduct & {
    collections?: { edges: { node: { handle: string; title: string } }[] };
  }
): NormalizedProduct {
  const metafields = product.metafields || [];
  const firstCollection = product.collections?.edges?.[0]?.node;
  const pricePerDay = parseFloat(
    product.priceRange.minVariantPrice.amount
  );

  const totalStock = product.variants.edges.reduce(
    (sum, v) => sum + (v.node.quantityAvailable || 0),
    0
  );

  return {
    id: product.handle,
    name: product.title,
    slug: product.handle,
    collection: firstCollection?.handle || product.productType || "",
    price: pricePerDay,
    priceUnit: "day",
    image: product.images.edges[0]?.node.url || "",
    images: product.images.edges.map((e) => e.node.url),
    ageTag: getMetafield(metafields, "age_tag") || extractAgeFromTags(product.tags),
    foldable: getMetafield(metafields, "foldable") === "true",
    maxWeight: getMetafield(metafields, "max_weight") || "",
    rearFacing: getMetafield(metafields, "rear_facing") === "true" || undefined,
    description: product.description,
    descriptionHtml: product.descriptionHtml,
    keyFeatures: parseJsonArray(getMetafield(metafields, "key_features")),
    goodToKnow: getMetafield(metafields, "good_to_know"),
    sizeWeight: getMetafield(metafields, "size_weight"),
    vendor: product.vendor,
    tags: product.tags,
    availableForSale: product.availableForSale,
    totalStock,
  };
}

function extractAgeFromTags(tags: string[]): string {
  const ageTag = tags.find(
    (t) => /^\d+[my]\+?$/.test(t) || /^\d+[–-]\d+[my]$/.test(t)
  );
  return ageTag || "";
}

export function normalizeCollection(
  collection: ShopifyCollection
): NormalizedCollection {
  const productCount =
    collection.products?.edges?.length || 0;

  return {
    id: collection.handle,
    name: collection.title,
    namePt: collection.title,
    slug: collection.handle,
    image: collection.image?.url || "",
    description: collection.description,
    descriptionPt: collection.description,
    productCount,
  };
}
