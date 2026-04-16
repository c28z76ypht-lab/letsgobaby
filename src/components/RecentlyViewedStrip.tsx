"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  readRecentProducts,
  type RecentProduct,
} from "@/lib/recent-products";
import { ProductCardRateHint } from "@/components/ProductCardRateHint";

export function RecentlyViewedStrip({
  currentSlug,
}: {
  currentSlug: string;
}) {
  const [items, setItems] = useState<RecentProduct[]>([]);

  useEffect(() => {
    setItems(
      readRecentProducts().filter((p) => p.slug !== currentSlug).slice(0, 4)
    );
  }, [currentSlug]);

  if (items.length === 0) return null;

  return (
    <section className="py-12 border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Recently viewed
        </h2>
        <p className="text-sm text-foreground/55 mb-8 max-w-xl">
          Pick up where you left off — based on products you opened in this
          browser.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group bg-muted/40 rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all hover:border-primary/20"
            >
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                ) : null}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {p.name}
                </h3>
                <ProductCardRateHint className="mt-2" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
