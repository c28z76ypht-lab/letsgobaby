import { NextRequest, NextResponse } from "next/server";
import { createBooking, getBookings } from "@/lib/booking/availability";
import { sampleProducts } from "@/lib/data";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { items, delivery, customer } = body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { error: "At least one booking item is required" },
      { status: 400 }
    );
  }

  if (!customer?.name || !customer?.email) {
    return NextResponse.json(
      { error: "Customer name and email are required" },
      { status: 400 }
    );
  }

  if (!delivery?.deliveryAddress) {
    return NextResponse.json(
      { error: "Delivery address is required" },
      { status: 400 }
    );
  }

  const failedItems: string[] = [];
  const succeededItems: string[] = [];

  for (const item of items) {
    const success = createBooking(
      item.productId,
      item.startDate,
      item.endDate,
      item.quantity
    );
    if (success) {
      succeededItems.push(item.productId);
    } else {
      const product = sampleProducts.find((p) => p.id === item.productId);
      failedItems.push(product?.name || item.productId);
    }
  }

  if (failedItems.length > 0) {
    return NextResponse.json(
      {
        error: `Some items are no longer available: ${failedItems.join(", ")}`,
        succeededItems,
        failedItems,
      },
      { status: 409 }
    );
  }

  const orderId = `LGB-${Date.now().toString(36).toUpperCase()}`;

  return NextResponse.json({
    orderId,
    status: "confirmed",
    message: "Booking confirmed! You will receive a confirmation email shortly.",
    items: succeededItems,
  });
}

export async function GET() {
  const bookings = getBookings();
  return NextResponse.json({ bookings });
}
