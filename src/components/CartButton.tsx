"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/booking/store";

export function CartButton() {
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const itemCount = useCartStore((s) => s.getItemCount);
  const count = itemCount();

  return (
    <button
      onClick={() => setCartOpen(true)}
      className="relative p-2 text-foreground/60 hover:text-foreground transition-colors"
      aria-label="Open cart"
    >
      <ShoppingBag className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] h-[18px]">
          {count}
        </span>
      )}
    </button>
  );
}
