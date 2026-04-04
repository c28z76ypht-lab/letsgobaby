"use client";

import Link from "next/link";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/booking/store";

export function CartSidebar() {
  const cartOpen = useCartStore((s) => s.cartOpen);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getItemCount = useCartStore((s) => s.getItemCount);

  if (!cartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-50"
        onClick={() => setCartOpen(false)}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Your Booking
            {getItemCount() > 0 && (
              <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                {getItemCount()}
              </span>
            )}
          </h2>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 text-foreground/40 hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-12 h-12 text-foreground/10 mx-auto mb-4" />
              <p className="text-foreground/40 text-sm">
                Your booking is empty.
              </p>
              <button
                onClick={() => setCartOpen(false)}
                className="mt-4 text-sm font-medium text-primary"
              >
                Browse equipment →
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.startDate}`}
                  className="bg-muted rounded-xl p-4 relative"
                >
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="absolute top-3 right-3 p-1 text-foreground/30 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <Link
                    href={`/products/${item.productSlug}`}
                    className="font-medium text-foreground hover:text-primary text-sm"
                    onClick={() => setCartOpen(false)}
                  >
                    {item.productName}
                  </Link>

                  <div className="mt-2 space-y-1 text-xs text-foreground/50">
                    <p>
                      {new Date(item.startDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}{" "}
                      →{" "}
                      {new Date(item.endDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}
                      {" "}({item.days} days)
                    </p>
                    <p>Qty: {item.quantity}</p>
                    <p>
                      €{item.pricePerDay}/day × {item.days} days × {item.quantity}
                    </p>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-foreground">
                    €{item.subtotal}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-border space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground/60">Subtotal</span>
              <span className="text-lg font-bold text-foreground">
                €{getSubtotal()}
              </span>
            </div>
            <p className="text-xs text-foreground/40">
              Night surcharges and delivery calculated at checkout.
            </p>
            <Link
              href="/checkout"
              onClick={() => setCartOpen(false)}
              className="block w-full py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-light transition-colors text-center text-sm flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
