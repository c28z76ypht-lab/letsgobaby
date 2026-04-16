import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { ProductAvailability } from "./types";
import { DEFAULT_STOCK_WHEN_UNCONFIGURED, isDatabaseConfigured } from "@/lib/db-env";

type BookingRow = {
  startDate: Date;
  endDate: Date;
  quantity: number;
};

class BookingUnavailableError extends Error {
  constructor() {
    super("BOOKING_UNAVAILABLE");
    this.name = "BookingUnavailableError";
  }
}

function getDatesInRange(start: string, end: string): string[] {
  const dates: string[] = [];
  const [sy, sm, sd] = start.split("-").map(Number);
  const [ey, em, ed] = end.split("-").map(Number);
  const startT = Date.UTC(sy, sm - 1, sd);
  const endT = Date.UTC(ey, em - 1, ed);
  for (let t = startT; t <= endT; t += 86_400_000) {
    dates.push(new Date(t).toISOString().slice(0, 10));
  }
  return dates;
}

function formatDateId(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function toDateId(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function computeMinAvailable(
  totalStock: number,
  bookings: BookingRow[],
  startDate: string,
  endDate: string
): number {
  const range = getDatesInRange(startDate, endDate);
  let minAvailable = totalStock;
  for (const date of range) {
    const booked = bookings
      .filter((b) => {
        const bs = formatDateId(b.startDate);
        const be = formatDateId(b.endDate);
        return bs <= date && be >= date;
      })
      .reduce((sum, b) => sum + b.quantity, 0);
    const available = Math.max(0, totalStock - booked);
    minAvailable = Math.min(minAvailable, available);
  }
  return minAvailable;
}

async function getTotalStock(productId: string): Promise<number> {
  const row = await prisma.productInventory.findUnique({
    where: { productId },
  });
  return row?.unitsTotal ?? DEFAULT_STOCK_WHEN_UNCONFIGURED;
}

async function getTotalStockTx(
  tx: Prisma.TransactionClient,
  productId: string
): Promise<number> {
  const row = await tx.productInventory.findUnique({
    where: { productId },
  });
  return row?.unitsTotal ?? DEFAULT_STOCK_WHEN_UNCONFIGURED;
}

async function findOverlappingBookings(
  tx: Prisma.TransactionClient,
  productId: string,
  startDate: string,
  endDate: string
): Promise<BookingRow[]> {
  const start = toDateId(startDate);
  const end = toDateId(endDate);
  return tx.booking.findMany({
    where: {
      productId,
      AND: [{ startDate: { lte: end } }, { endDate: { gte: start } }],
    },
    select: { startDate: true, endDate: true, quantity: true },
  });
}

export async function getAvailability(
  productId: string,
  startDate: string,
  endDate: string
): Promise<ProductAvailability[]> {
  if (!isDatabaseConfigured()) {
    throw new Error("DATABASE_URL is not set");
  }

  const totalStock = await getTotalStock(productId);
  const overlapping = await prisma.booking.findMany({
    where: {
      productId,
      AND: [
        { startDate: { lte: toDateId(endDate) } },
        { endDate: { gte: toDateId(startDate) } },
      ],
    },
    select: { startDate: true, endDate: true, quantity: true },
  });

  const dates = getDatesInRange(startDate, endDate);
  return dates.map((date) => {
    const booked = overlapping
      .filter((b) => {
        const bs = formatDateId(b.startDate);
        const be = formatDateId(b.endDate);
        return bs <= date && be >= date;
      })
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

export async function checkAvailability(
  productId: string,
  startDate: string,
  endDate: string,
  quantity: number
): Promise<{ available: boolean; minAvailable: number }> {
  if (!isDatabaseConfigured()) {
    throw new Error("DATABASE_URL is not set");
  }

  const totalStock = await getTotalStock(productId);
  const overlapping = await prisma.booking.findMany({
    where: {
      productId,
      AND: [
        { startDate: { lte: toDateId(endDate) } },
        { endDate: { gte: toDateId(startDate) } },
      ],
    },
    select: { startDate: true, endDate: true, quantity: true },
  });

  const minAvailable = computeMinAvailable(
    totalStock,
    overlapping,
    startDate,
    endDate
  );
  return {
    available: minAvailable >= quantity,
    minAvailable,
  };
}

const SERIALIZABLE_RETRIES = 6;

export async function createBooking(
  productId: string,
  startDate: string,
  endDate: string,
  quantity: number
): Promise<boolean> {
  if (!isDatabaseConfigured()) {
    throw new Error("DATABASE_URL is not set");
  }

  const start = toDateId(startDate);
  const end = toDateId(endDate);

  for (let attempt = 0; attempt < SERIALIZABLE_RETRIES; attempt++) {
    try {
      await prisma.$transaction(
        async (tx) => {
          const totalStock = await getTotalStockTx(tx, productId);
          const overlapping = await findOverlappingBookings(
            tx,
            productId,
            startDate,
            endDate
          );
          const minAvailable = computeMinAvailable(
            totalStock,
            overlapping,
            startDate,
            endDate
          );
          if (minAvailable < quantity) {
            throw new BookingUnavailableError();
          }
          await tx.booking.create({
            data: {
              productId,
              startDate: start,
              endDate: end,
              quantity,
            },
          });
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
          maxWait: 5_000,
          timeout: 10_000,
        }
      );
      return true;
    } catch (e) {
      if (e instanceof BookingUnavailableError) {
        return false;
      }
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2034"
      ) {
        continue;
      }
      throw e;
    }
  }

  throw new Error(
    "BOOKING_RETRY_EXHAUSTED: could not confirm booking; try again."
  );
}

export type BookingListItem = {
  id: string;
  productId: string;
  startDate: string;
  endDate: string;
  quantity: number;
  createdAt: string;
};

export async function getBookings(): Promise<BookingListItem[]> {
  if (!isDatabaseConfigured()) {
    throw new Error("DATABASE_URL is not set");
  }

  const rows = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      productId: true,
      startDate: true,
      endDate: true,
      quantity: true,
      createdAt: true,
    },
  });

  return rows.map((r) => ({
    id: r.id,
    productId: r.productId,
    startDate: formatDateId(r.startDate),
    endDate: formatDateId(r.endDate),
    quantity: r.quantity,
    createdAt: r.createdAt.toISOString(),
  }));
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
