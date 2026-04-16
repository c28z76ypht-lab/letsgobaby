import { NextRequest, NextResponse } from "next/server";
import { checkAvailability, calculateRentalPrice } from "@/lib/booking/availability";
import { isDatabaseConfigured } from "@/lib/db-env";
import { sampleProducts } from "@/lib/data";
import { MIN_RENTAL_DAYS, MAX_RENTAL_DAYS } from "@/lib/booking/types";

export async function GET(request: NextRequest) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "Database not configured. Set DATABASE_URL." },
      { status: 503 }
    );
  }

  const { searchParams } = request.nextUrl;
  const productId = searchParams.get("productId");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const quantity = parseInt(searchParams.get("quantity") || "1", 10);

  if (!productId || !startDate || !endDate) {
    return NextResponse.json(
      { error: "Missing required parameters: productId, startDate, endDate" },
      { status: 400 }
    );
  }

  const product = sampleProducts.find((p) => p.id === productId);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (start < today) {
    return NextResponse.json(
      { error: "Start date cannot be in the past" },
      { status: 400 }
    );
  }

  const daysDiff = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysDiff < MIN_RENTAL_DAYS) {
    return NextResponse.json(
      { error: `Minimum rental period is ${MIN_RENTAL_DAYS} days` },
      { status: 400 }
    );
  }

  if (daysDiff > MAX_RENTAL_DAYS) {
    return NextResponse.json(
      { error: `Maximum rental period is ${MAX_RENTAL_DAYS} days. Contact us for longer rentals.` },
      { status: 400 }
    );
  }

  const { available, minAvailable } = await checkAvailability(
    productId,
    startDate,
    endDate,
    quantity
  );
  const { days, subtotal } = calculateRentalPrice(
    product.price,
    startDate,
    endDate,
    quantity
  );

  return NextResponse.json({
    available,
    maxQuantity: minAvailable,
    pricePerDay: product.price,
    days,
    quantity,
    subtotal,
  });
}
