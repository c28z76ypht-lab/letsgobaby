/** Public site configuration — social profiles and optional brand assets */

export const SITE_SOCIAL = {
  facebook: "https://www.facebook.com/letsgobaby.pt/",
  instagram: "https://www.instagram.com/letsgobaby.pt/",
} as const;

/** Set NEXT_PUBLIC_SITE_LOGO_URL in env to use a hosted logo (e.g. Shopify Files CDN). */
export function getSiteLogoUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_SITE_LOGO_URL?.trim();
  return url || null;
}
