"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Clock,
  User,
  Plane,
  FileText,
  CreditCard,
  Check,
  AlertCircle,
  Loader2,
  Moon,
  ShoppingBag,
} from "lucide-react";
import { useCartStore } from "@/lib/booking/store";
import { NIGHT_SURCHARGE } from "@/lib/booking/types";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const delivery = useCartStore((s) => s.delivery);
  const customer = useCartStore((s) => s.customer);
  const setDelivery = useCartStore((s) => s.setDelivery);
  const setCustomer = useCartStore((s) => s.setCustomer);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getNightSurcharge = useCartStore((s) => s.getNightSurcharge);
  const getTotal = useCartStore((s) => s.getTotal);
  const clearCart = useCartStore((s) => s.clearCart);

  const [submitting, setSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [invoiceUrl, setInvoiceUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, delivery, customer }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setOrderId(data.orderId);
      if (data.invoiceUrl) {
        setInvoiceUrl(data.invoiceUrl);
      }
      setOrderConfirmed(true);
      clearCart();
    } catch {
      setError("Could not process booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (orderConfirmed) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">
            Booking Confirmed!
          </h1>
          <p className="text-foreground/60 mb-2">
            Your booking reference is{" "}
            <strong className="text-foreground">{orderId}</strong>
          </p>
          <p className="text-sm text-foreground/50 mb-8">
            You&apos;ll receive a confirmation email shortly. Our team will
            contact you via WhatsApp to coordinate delivery details.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {invoiceUrl && (
              <a
                href={invoiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-light transition-colors"
              >
                <CreditCard className="w-4 h-4" />
                Pay Now
              </a>
            )}
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-muted text-foreground font-medium rounded-full hover:bg-muted-dark transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-lg px-4 text-center">
          <ShoppingBag className="w-12 h-12 text-foreground/10 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-3">
            Your booking is empty
          </h1>
          <p className="text-foreground/50 mb-6">
            Add some equipment to get started.
          </p>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-light"
          >
            Browse Equipment
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-6 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-light"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Continue browsing
          </Link>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground mb-10">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left: Forms */}
              <div className="lg:col-span-2 space-y-8">
                {/* Customer details */}
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Your Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customer.name}
                        onChange={(e) => setCustomer({ name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={customer.email}
                        onChange={(e) => setCustomer({ email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Phone (WhatsApp preferred)
                      </label>
                      <input
                        type="tel"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="+44 7911 123456"
                      />
                    </div>
                  </div>
                </div>

                {/* Flight details */}
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Plane className="w-5 h-5 text-primary" />
                    Flight Details
                    <span className="text-xs font-normal text-foreground/40">
                      (optional)
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Flight Number
                      </label>
                      <input
                        type="text"
                        value={customer.flightNumber}
                        onChange={(e) =>
                          setCustomer({ flightNumber: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="e.g. TP1234"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Arrival Time
                      </label>
                      <input
                        type="time"
                        value={customer.flightArrivalTime}
                        onChange={(e) =>
                          setCustomer({ flightArrivalTime: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery */}
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Delivery & Pickup
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Delivery Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={delivery.deliveryAddress}
                        onChange={(e) =>
                          setDelivery({ deliveryAddress: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="Hotel name or full address"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 text-sm text-foreground/70 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={delivery.pickupSameAsDelivery}
                          onChange={(e) =>
                            setDelivery({
                              pickupSameAsDelivery: e.target.checked,
                            })
                          }
                          className="rounded border-border text-primary focus:ring-primary/20"
                        />
                        Pickup at same address
                      </label>
                    </div>

                    {!delivery.pickupSameAsDelivery && (
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                          Pickup Address
                        </label>
                        <input
                          type="text"
                          value={delivery.pickupAddress}
                          onChange={(e) =>
                            setDelivery({ pickupAddress: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          placeholder="Different address for equipment return"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-foreground/40" />
                          Preferred Delivery Time
                        </label>
                        <input
                          type="time"
                          value={delivery.deliveryTime}
                          onChange={(e) =>
                            setDelivery({ deliveryTime: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                        {delivery.isNightDelivery && (
                          <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                            <Moon className="w-3 h-3" />
                            Night delivery: +€{NIGHT_SURCHARGE} surcharge
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-foreground/40" />
                          Preferred Pickup Time
                        </label>
                        <input
                          type="time"
                          value={delivery.pickupTime}
                          onChange={(e) =>
                            setDelivery({ pickupTime: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                        {delivery.isNightPickup && (
                          <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                            <Moon className="w-3 h-3" />
                            Night pickup: +€{NIGHT_SURCHARGE} surcharge
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-foreground/40">
                      We allow a 1h30 delivery window from the time you specify.
                      Deliveries/pickups between 22:00–06:00 have a €{NIGHT_SURCHARGE} surcharge.
                    </p>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Additional Notes
                  </h2>
                  <textarea
                    rows={4}
                    value={customer.notes}
                    onChange={(e) => setCustomer({ notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    placeholder="Anything else we should know? Special requirements, building access codes, nearby landmarks..."
                  />
                </div>
              </div>

              {/* Right: Order Summary */}
              <div>
                <div className="sticky top-24 bg-muted rounded-2xl p-6 border border-border">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-4">
                    {items.map((item) => (
                      <div
                        key={`${item.productId}-${item.startDate}`}
                        className="text-sm"
                      >
                        <div className="flex justify-between">
                          <span className="text-foreground font-medium">
                            {item.productName}
                          </span>
                          <span className="text-foreground font-medium">
                            €{item.subtotal}
                          </span>
                        </div>
                        <p className="text-xs text-foreground/40">
                          {item.quantity}× · {item.days} days ·{" "}
                          {new Date(item.startDate).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                          })}
                          –
                          {new Date(item.endDate).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                          })}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground/60">Equipment subtotal</span>
                      <span className="text-foreground">€{getSubtotal()}</span>
                    </div>

                    {getNightSurcharge() > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-amber-600 flex items-center gap-1">
                          <Moon className="w-3 h-3" />
                          Night surcharge
                        </span>
                        <span className="text-amber-600">
                          €{getNightSurcharge()}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm pt-2 border-t border-border">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="text-xl font-bold text-foreground">
                        €{getTotal()}
                      </span>
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 rounded-xl mt-4">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-red-700">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-4 py-3.5 bg-primary text-white font-medium rounded-full hover:bg-primary-light transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        Confirm Booking
                      </>
                    )}
                  </button>

                  <div className="mt-3 space-y-1 text-xs text-foreground/40 text-center">
                    <p>No deposit required</p>
                    <p>Instant confirmation via email & WhatsApp</p>
                    <p>Free cancellation up to 48h before delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
