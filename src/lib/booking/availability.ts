import type { ProductAvailability } from "./types";
import { sampleProducts } from "@/lib/data";

const STOCK_PER_PRODUCT: Record<string, number> = {};
sampleProducts.forEach((p) => {
  STOCK_PER_PRODUCT[p.id] = 3;
});

const bookingsDb: Array<{
  productId: string;
  startDate: string;
  endDate: string;
  quantity: number;
}> = [];

function getDatesInRange(start: string, end: string): string[] {
  const dates: string[] = [];
  const current = new Date(start);
  const last = new Date(end);
  while (current <= last) {
    dates.push(current.toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

export function getAvailability(
  productId: string,
  startDate: string,
  endDate: string
): ProductAvailability[] {
  const totalStock = STOCK_PER_PRODUCT[productId] ?? 0;
  const dates = getDatesInRange(startDate, endDate);

  return dates.map((date) => {
    const booked = bookingsDb
      .filter(
        (b) => b.productId === productId && b.startDate <= date && b.endDate >= date
      )
      .reduce((sum, b) => sum + b.quantity, 0);

    return {
      productId,
      date,
      totalStock,
      booked,
      available: Math.max(0, totalStock - booked),
    };
  });
}

export function checkAvailability(
  productId: string,
  startDate: string,
  endDate: string,
  quantity: number
): { available: boolean; minAvailable: number } {
  const availability = getAvailability(productId, startDate, endDate);
  const minAvailable = Math.min(...availability.map((a) => a.available));
  return {
    available: minAvailable >= quantity,
    minAvailable,
  };
}

export function createBooking(
  productId: string,
  startDate: string,
  endDate: string,
  quantity: number
): boolean {
  const { available } = checkAvailability(productId, startDate, endDate, quantity);
  if (!available) return false;

  bookingsDb.push({ productId, startDate, endDate, quantity });
  return true;
}

export function getBookings() {
  return [...bookingsDb];
}

export function calculateRentalPrice(
  pricePerDay: number,
  startDate: string,
  endDate: string,
  quantity: number
): { days: number; subtotal: number } {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.max(
    1,
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  );
  return { days, subtotal: pricePerDay * days * quantity };
}
