import type {
  ShopifyProduct,
  ShopifyCollection,
  ShopifyMetafield,
  NormalizedProduct,
  NormalizedCollection,
} from "./types";

/**
 * Many titles/descriptions in this Shopify store use the pattern:
 *   "English text || Portuguese text"
 * This helper splits them into [en, pt].
 */
function splitBilingual(text: string): { en: string; pt: string } {
  const parts = text.split("||").map((s) => s.trim());
  if (parts.length >= 2) {
    return { en: parts[0], pt: parts[1] };
  }
  return { en: text.trim(), pt: text.trim() };
}

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

/**
 * Extracts per-day price from Shopify variants.
 * The store uses variants like "1 day", "2 days", "3 days" etc.
 * The 1-day variant price is the daily rate.
 * Falls back to minVariantPrice.
 */
function extractDailyPrice(
  product: ShopifyProduct
): number {
  const oneDayVariant = product.variants.edges.find((v) => {
    const title = v.node.title.toLowerCase();
    return title.includes("1 day") || title.includes("1 dia");
  });

  if (oneDayVariant) {
    return parseFloat(oneDayVariant.node.price.amount);
  }

  return parseFloat(product.priceRange.minVariantPrice.amount);
}

/**
 * Extracts key features from a product description.
 * Many descriptions contain feature bullet points separated by newlines
 * or the "||" pattern.
 */
function extractFeaturesFromDescription(description: string): string[] {
  const lines = description.split(/\n|\./).map((l) => l.trim()).filter(Boolean);

  const features: string[] = [];
  for (const line of lines) {
    const { en } = splitBilingual(line);
    if (en.length > 10 && en.length < 120 && !en.toLowerCase().startsWith("check our")) {
      features.push(en);
    }
  }
  return features.slice(0, 6);
}

/**
 * Extracts weight info from product description.
 * Looks for patterns like "7.5 kg", "22 kg", etc.
 */
function extractWeightInfo(description: string): string {
  const weightMatch = description.match(
    /(?:up to |from \d+ to |to )?(\d+(?:\.\d+)?\s*kg\s*(?:\([^)]+\))?)/i
  );
  return weightMatch ? `Up to ${weightMatch[1]}` : "";
}

export function normalizeProduct(
  product: ShopifyProduct & {
    collections?: { edges: { node: { handle: string; title: string } }[] };
  }
): NormalizedProduct {
  const metafields = product.metafields || [];
  const firstCollection = product.collections?.edges?.find(
    (c) => c.node.handle !== "all-products"
  )?.node;

  const { en: nameEn } = splitBilingual(product.title);
  const { en: descEn } = splitBilingual(product.description);

  const pricePerDay = extractDailyPrice(product);

  const totalStock = product.variants.edges.reduce(
    (sum, v) => sum + Math.max(v.node.quantityAvailable || 0, 0),
    0
  );

  const metafieldFeatures = parseJsonArray(getMetafield(metafields, "key_features"));
  const keyFeatures = metafieldFeatures.length > 0
    ? metafieldFeatures
    : extractFeaturesFromDescription(product.description);

  const metafieldWeight = getMetafield(metafields, "max_weight");
  const maxWeight = metafieldWeight || extractWeightInfo(product.description);

  const ageTag =
    getMetafield(metafields, "age_tag") ||
    extractAgeFromTags(product.tags) ||
    extractAgeFromDescription(product.description);

  const collectionHandle = firstCollection?.handle || "";

  return {
    id: product.handle,
    name: nameEn,
    slug: product.handle,
    collection: collectionHandle,
    price: pricePerDay,
    priceUnit: "day",
    image: product.images.edges[0]?.node.url || "",
    images: product.images.edges.map((e) => e.node.url),
    ageTag,
    foldable:
      getMetafield(metafields, "foldable") === "true" ||
      product.description.toLowerCase().includes("fold"),
    maxWeight,
    rearFacing:
      getMetafield(metafields, "rear_facing") === "true" ||
      product.description.toLowerCase().includes("rear-facing") ||
      product.description.toLowerCase().includes("rear facing") ||
      undefined,
    description: descEn,
    descriptionHtml: product.descriptionHtml,
    keyFeatures,
    goodToKnow: getMetafield(metafields, "good_to_know") || "",
    sizeWeight: getMetafield(metafields, "size_weight") || "",
    vendor: product.vendor,
    tags: product.tags.map((t) => splitBilingual(t).en),
    availableForSale: product.availableForSale,
    totalStock,
  };
}

function extractAgeFromTags(tags: string[]): string {
  for (const tag of tags) {
    const cleaned = splitBilingual(tag).en;
    if (/^\d+[my]\+?$/i.test(cleaned)) return cleaned;
  }
  return "";
}

function extractAgeFromDescription(description: string): string {
  const birthMatch = description.match(/from\s+(?:0|birth)/i);
  if (birthMatch) return "0m+";

  const ageMatch = description.match(
    /from\s+(\d+)\s*(?:months?|m\b)/i
  );
  if (ageMatch) return `${ageMatch[1]}m+`;

  return "";
}

export function normalizeCollection(
  collection: ShopifyCollection
): NormalizedCollection {
  const { en: nameEn, pt: namePt } = splitBilingual(collection.title);
  const { en: descEn, pt: descPt } = splitBilingual(collection.description);

  const productCount = collection.products?.edges?.length || 0;

  return {
    id: collection.handle,
    name: nameEn,
    namePt: namePt,
    slug: collection.handle,
    image: collection.image?.url || "",
    description: descEn,
    descriptionPt: descPt,
    productCount,
  };
}
