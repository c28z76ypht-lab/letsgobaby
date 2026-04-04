import { NextRequest, NextResponse } from "next/server";
import { createBooking, getBookings } from "@/lib/booking/availability";
import {
  createDraftOrder,
  isAdminConfigured,
  type DraftOrderLineItem,
} from "@/lib/shopify/admin";
import { NIGHT_SURCHARGE, NIGHT_START_HOUR, NIGHT_END_HOUR } from "@/lib/booking/types";
import type { BookingItem, DeliveryDetails, CustomerDetails } from "@/lib/booking/types";

function isNightTime(time: string): boolean {
  if (!time) return false;
  const hour = parseInt(time.split(":")[0], 10);
  return hour >= NIGHT_START_HOUR || hour < NIGHT_END_HOUR;
}

function buildNote(
  items: BookingItem[],
  delivery: DeliveryDetails,
  customer: CustomerDetails
): string {
  const lines: string[] = [];

  lines.push("=== BOOKING FROM WEBSITE ===");
  lines.push("");

  for (const item of items) {
    lines.push(
      `${item.productName} × ${item.quantity} — ${item.startDate} to ${item.endDate} (${item.days} days) — €${item.subtotal}`
    );
  }

  lines.push("");
  lines.push(`📍 Delivery: ${delivery.deliveryAddress}`);
  if (delivery.deliveryTime) {
    lines.push(`   Time: ${delivery.deliveryTime}${delivery.isNightDelivery ? " (NIGHT)" : ""}`);
  }

  const pickupAddr = delivery.pickupSameAsDelivery
    ? delivery.deliveryAddress
    : delivery.pickupAddress;
  lines.push(`📍 Pickup: ${pickupAddr}`);
  if (delivery.pickupTime) {
    lines.push(`   Time: ${delivery.pickupTime}${delivery.isNightPickup ? " (NIGHT)" : ""}`);
  }

  if (customer.flightNumber) {
    lines.push("");
    lines.push(`✈️ Flight: ${customer.flightNumber}`);
    if (customer.flightArrivalTime) {
      lines.push(`   Arrival: ${customer.flightArrivalTime}`);
    }
  }

  if (customer.phone) {
    lines.push("");
    lines.push(`📞 Phone/WhatsApp: ${customer.phone}`);
  }

  if (customer.notes) {
    lines.push("");
    lines.push(`📝 Notes: ${customer.notes}`);
  }

  return lines.join("\n");
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { items, delivery, customer } = body as {
    items: BookingItem[];
    delivery: DeliveryDetails;
    customer: CustomerDetails;
  };

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
      failedItems.push(item.productName || item.productId);
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

  const localOrderId = `LGB-${Date.now().toString(36).toUpperCase()}`;

  // Create Shopify Draft Order if Admin API is configured
  let shopifyDraftOrder = null;
  if (isAdminConfigured()) {
    try {
      const lineItems: DraftOrderLineItem[] = items.map((item) => ({
        title: `${item.productName} (${item.startDate} → ${item.endDate})`,
        price: String(item.subtotal),
        quantity: 1,
        taxable: false,
        requires_shipping: false,
      }));

      const nightSurchargeCount =
        (delivery.isNightDelivery || isNightTime(delivery.deliveryTime) ? 1 : 0) +
        (delivery.isNightPickup || isNightTime(delivery.pickupTime) ? 1 : 0);

      if (nightSurchargeCount > 0) {
        lineItems.push({
          title: `Night surcharge (${nightSurchargeCount}×)`,
          price: String(NIGHT_SURCHARGE * nightSurchargeCount),
          quantity: 1,
          taxable: false,
          requires_shipping: false,
        });
      }

      const nameParts = customer.name.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || firstName;

      shopifyDraftOrder = await createDraftOrder({
        lineItems,
        email: customer.email,
        note: buildNote(items, delivery, customer),
        tags: ["website-booking", localOrderId],
        shippingAddress: {
          first_name: firstName,
          last_name: lastName,
          address1: delivery.deliveryAddress,
          city: "Lisbon",
          country: "PT",
          phone: customer.phone || undefined,
        },
      });
    } catch (err) {
      console.error("Failed to create Shopify draft order:", err);
    }
  }

  return NextResponse.json({
    orderId: shopifyDraftOrder?.name || localOrderId,
    shopifyOrderId: shopifyDraftOrder?.id || null,
    invoiceUrl: shopifyDraftOrder?.invoice_url || null,
    status: "confirmed",
    message:
      "Booking confirmed! You will receive a confirmation email shortly.",
    items: succeededItems,
  });
}

export async function GET() {
  const bookings = getBookings();
  return NextResponse.json({ bookings });
}
