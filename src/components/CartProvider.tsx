"use client";

import { CartSidebar } from "@/components/CartSidebar";

export function CartProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CartSidebar />
    </>
  );
}
