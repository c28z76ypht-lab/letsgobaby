export const DEFAULT_STOCK_WHEN_UNCONFIGURED = 3;

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}
