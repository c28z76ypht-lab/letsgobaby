/** Replaces raw €/day on listing cards — avoids alarming “high daily rate” out of context. */

export function ProductCardRateHint({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="text-sm font-medium text-primary">See rates for your dates</p>
      <p className="text-xs text-foreground/45 mt-0.5 leading-snug">
        2–28 day rentals. Total shown when you pick dates.
      </p>
    </div>
  );
}
