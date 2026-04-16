/** Browser localStorage key for “recently viewed” product cards (PDF: browse recommendations). */

export const RECENT_PRODUCTS_KEY = "lgb-recent-products";

export type RecentProduct = {
  slug: string;
  name: string;
  image: string;
};

const MAX = 8;

export function readRecentProducts(): RecentProduct[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_PRODUCTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (x): x is RecentProduct =>
          typeof x === "object" &&
          x !== null &&
          typeof (x as RecentProduct).slug === "string" &&
          typeof (x as RecentProduct).name === "string" &&
          typeof (x as RecentProduct).image === "string"
      )
      .slice(0, MAX);
  } catch {
    return [];
  }
}

export function rememberRecentProduct(item: RecentProduct): void {
  if (typeof window === "undefined") return;
  try {
    const prev = readRecentProducts().filter((p) => p.slug !== item.slug);
    const next = [item, ...prev].slice(0, MAX);
    localStorage.setItem(RECENT_PRODUCTS_KEY, JSON.stringify(next));
  } catch {
    /* private mode / quota */
  }
}
