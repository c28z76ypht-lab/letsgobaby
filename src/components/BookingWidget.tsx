"use client";

import { useState, useCallback } from "react";
import {
  Calendar,
  ShoppingBag,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useCartStore } from "@/lib/booking/store";
import { MIN_RENTAL_DAYS, MAX_RENTAL_DAYS } from "@/lib/booking/types";

type Props = {
  productId: string;
  productName: string;
  productSlug: string;
  collection: string;
  pricePerDay: number;
  onUnavailable?: (startDate: string, endDate: string) => void;
};

type AvailabilityResult = {
  available: boolean;
  maxQuantity: number;
  pricePerDay: number;
  days: number;
  quantity: number;
  subtotal: number;
} | null;

export function BookingWidget({
  productId,
  productName,
  productSlug,
  collection,
  pricePerDay,
  onUnavailable,
}: Props) {
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<AvailabilityResult>(null);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  const checkAvailability = useCallback(async () => {
    if (!startDate || !endDate) return;
    setChecking(true);
    setError("");
    setResult(null);
    setAdded(false);

    try {
      const params = new URLSearchParams({
        productId,
        startDate,
        endDate,
        quantity: String(quantity),
      });
      const res = await fetch(`/api/availability?${params}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setResult(data);

      if (!data.available && onUnavailable) {
        onUnavailable(startDate, endDate);
      }
    } catch {
      setError("Could not check availability. Please try again.");
    } finally {
      setChecking(false);
    }
  }, [startDate, endDate, quantity, productId, onUnavailable]);

  const handleStartDateChange = (val: string) => {
    setStartDate(val);
    setResult(null);
    setAdded(false);
    if (endDate && val >= endDate) {
      setEndDate("");
    }
  };

  const handleEndDateChange = (val: string) => {
    setEndDate(val);
    setResult(null);
    setAdded(false);
  };

  const handleAddToCart = () => {
    if (!result || !result.available) return;

    addItem({
      productId,
      productName,
      productSlug,
      collection,
      pricePerDay,
      quantity,
      startDate,
      endDate,
      days: result.days,
      subtotal: result.subtotal,
    });

    setAdded(true);
    setTimeout(() => setCartOpen(true), 300);
  };

  const minEndDate = startDate
    ? new Date(
        new Date(startDate).getTime() + MIN_RENTAL_DAYS * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0]
    : "";

  const maxEndDate = startDate
    ? new Date(
        new Date(startDate).getTime() + MAX_RENTAL_DAYS * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0]
    : "";

  return (
    <div className="bg-muted rounded-2xl p-6 border border-border">
      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-primary" />
        Check Availability & Book
      </h3>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-xs font-medium text-foreground/60 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            min={today}
            onChange={(e) => handleStartDateChange(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-foreground/60 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            min={minEndDate}
            max={maxEndDate}
            onChange={(e) => handleEndDateChange(e.target.value)}
            disabled={!startDate}
            className="w-full px-3 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-40"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-medium text-foreground/60 mb-1">
          Quantity
        </label>
        <select
          value={quantity}
          onChange={(e) => {
            setQuantity(Number(e.target.value));
            setResult(null);
            setAdded(false);
          }}
          className="w-full px-3 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {startDate && endDate && !result && !checking && (
        <button
          onClick={checkAvailability}
          className="w-full py-3 bg-foreground/10 text-foreground font-medium rounded-full hover:bg-foreground/15 transition-colors mb-3"
        >
          Check Availability
        </button>
      )}

      {checking && (
        <div className="flex items-center justify-center gap-2 py-3 text-sm text-foreground/50">
          <Loader2 className="w-4 h-4 animate-spin" />
          Checking availability…
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 p-3 bg-red-50 rounded-xl mb-3">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {result && (
        <div className="space-y-3">
          {result.available ? (
            <>
              <div className="bg-white rounded-xl p-4 border border-border space-y-2">
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <Check className="w-4 h-4" />
                  <span className="font-medium">Available for your dates!</span>
                </div>
                <div className="text-xs text-foreground/50 space-y-1">
                  <div className="flex justify-between">
                    <span>
                      €{pricePerDay} × {result.days} days × {quantity}
                    </span>
                    <span className="font-medium text-foreground">
                      €{result.subtotal}
                    </span>
                  </div>
                </div>
                <div className="pt-2 border-t border-border flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">
                    Subtotal
                  </span>
                  <span className="text-lg font-bold text-foreground">
                    €{result.subtotal}
                  </span>
                </div>
              </div>

              {!added ? (
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Booking
                </button>
              ) : (
                <button
                  onClick={() => setCartOpen(true)}
                  className="w-full py-3 bg-green-600 text-white font-medium rounded-full flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Added — View Cart
                </button>
              )}
            </>
          ) : (
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <div className="flex items-center gap-2 text-sm text-amber-700">
                <AlertCircle className="w-4 h-4" />
                <span className="font-medium">
                  Not available for these dates
                </span>
              </div>
              <p className="text-xs text-amber-600 mt-1">
                {result.maxQuantity > 0
                  ? `Only ${result.maxQuantity} available. Try reducing quantity.`
                  : "All units are booked for this period."}
              </p>
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-foreground/40 text-center mt-3">
        No deposit required • Instant confirmation • {MIN_RENTAL_DAYS}–{MAX_RENTAL_DAYS} days
      </p>
    </div>
  );
}
