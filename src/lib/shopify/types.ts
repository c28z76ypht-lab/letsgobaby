export type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

export type ShopifyVariant = {
  id: string;
  title: string;
  quantityAvailable: number | null;
  price: ShopifyMoney;
  selectedOptions: { name: string; value: string }[];
};

export type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  images: {
    edges: { node: ShopifyImage }[];
  };
  variants: {
    edges: { node: ShopifyVariant }[];
  };
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  metafields: (ShopifyMetafield | null)[];
};

export type ShopifyMetafield = {
  key: string;
  value: string;
  type: string;
  namespace: string;
};

export type ShopifyCollection = {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: ShopifyImage | null;
  products: {
    edges: { node: ShopifyProduct }[];
  };
};

// Normalized types used in our app (mapped from Shopify)
export type NormalizedProduct = {
  id: string;
  name: string;
  slug: string;
  collection: string;
  price: number;
  priceUnit: string;
  image: string;
  images: string[];
  ageTag: string;
  foldable: boolean;
  maxWeight: string;
  rearFacing?: boolean;
  description: string;
  descriptionHtml: string;
  keyFeatures: string[];
  goodToKnow: string;
  sizeWeight: string;
  vendor: string;
  tags: string[];
  availableForSale: boolean;
  totalStock: number;
};

export type NormalizedCollection = {
  id: string;
  name: string;
  namePt: string;
  slug: string;
  image: string;
  description: string;
  descriptionPt: string;
  productCount: number;
};
