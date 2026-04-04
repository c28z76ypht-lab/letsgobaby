"use client";

import { useState } from "react";
import { MessageCircle, X, Check, Loader2 } from "lucide-react";

type Props = {
  productId: string;
  productName: string;
  initialStartDate?: string;
  initialEndDate?: string;
};

export function RegisterInterest({
  productId,
  productName,
  initialStartDate = "",
  initialEndDate = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !startDate || !endDate) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, productName, email, startDate, endDate }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Could not send. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) {
    return (
      <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
        <p className="text-sm text-foreground/70">
          <strong>Not available for your dates?</strong> Let us know and
          we&apos;ll notify you when it becomes available.
        </p>
        <button
          onClick={() => setOpen(true)}
          className="mt-2 text-sm font-medium text-primary hover:text-primary-light flex items-center gap-1"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Register Interest
        </button>
      </div>
    );
  }

  return (
    <div className="bg-accent/10 rounded-xl p-5 border border-accent/20 relative">
      <button
        onClick={() => setOpen(false)}
        className="absolute top-3 right-3 text-foreground/30 hover:text-foreground/60"
      >
        <X className="w-4 h-4" />
      </button>

      {submitted ? (
        <div className="text-center py-2">
          <Check className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-foreground">Thank you!</p>
          <p className="text-xs text-foreground/50 mt-1">
            We&apos;ll email you at {email} if {productName} becomes available
            for your dates.
          </p>
        </div>
      ) : (
        <>
          <h4 className="text-sm font-semibold text-foreground mb-3">
            Get notified when available
          </h4>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="w-full px-3 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-light transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Notify Me"
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
