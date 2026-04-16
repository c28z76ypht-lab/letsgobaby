import { shopifyFetch, isShopifyConfigured } from "@/lib/shopify/client";
import { SHOP_HOME_BANNER_QUERY } from "@/lib/shopify/queries";

export type HomeBannerData = {
  message: string;
  href?: string;
  linkLabel?: string;
};

function parseBannerJson(raw: string | null | undefined): HomeBannerData | null {
  if (!raw?.trim()) return null;
  try {
    const o = JSON.parse(raw) as Record<string, unknown>;
    if (o.enabled === false) return null;
    const message = typeof o.message === "string" ? o.message.trim() : "";
    if (!message) return null;
    const href =
      typeof o.href === "string" && o.href.trim() ? o.href.trim() : undefined;
    const linkLabel =
      typeof o.linkLabel === "string" && o.linkLabel.trim()
        ? o.linkLabel.trim()
        : undefined;
    return { message, href, linkLabel };
  } catch {
    return null;
  }
}

type ShopBannerResponse = {
  shop: {
    homeBanner: { value: string } | null;
  } | null;
};

/**
 * Homepage alert bar. Priority:
 * 1) Shopify Shop metafield `custom.home_banner` (JSON) with Storefront API access
 * 2) Server env `HOME_BANNER_JSON` (same JSON shape)
 */
export async function getHomeBanner(): Promise<HomeBannerData | null> {
  if (isShopifyConfigured()) {
    try {
      const data = await shopifyFetch<ShopBannerResponse>({
        query: SHOP_HOME_BANNER_QUERY,
      });
      const parsed = parseBannerJson(data.shop?.homeBanner?.value ?? null);
      if (parsed) return parsed;
    } catch {
      // Metafield may be missing or Storefront not exposed — try env
    }
  }

  return parseBannerJson(process.env.HOME_BANNER_JSON);
}
