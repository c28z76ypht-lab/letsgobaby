"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Check,
  Star,
  Info,
  Ruler,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { reviews } from "@/lib/data";
import { BookingWidget } from "@/components/BookingWidget";
import { RegisterInterest } from "@/components/RegisterInterest";
import { ProductCardRateHint } from "@/components/ProductCardRateHint";
import type { NormalizedProduct } from "@/lib/shopify";

type Collection = {
  id: string;
  name: string;
  slug: string;
};

export function ProductDetail({
  product,
  collection,
  recommended,
}: {
  product: NormalizedProduct;
  collection: Collection | undefined;
  recommended: NormalizedProduct[];
}) {
  const [unavailableDates, setUnavailableDates] = useState<{
    start: string;
    end: string;
  } | null>(null);

  return (
    <>
      <section className="py-6 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-foreground/50">
            <Link href="/collections" className="hover:text-primary">
              Collections
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              href={`/collections/${collection?.slug}`}
              className="hover:text-primary"
            >
              {collection?.name}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-muted rounded-3xl aspect-square relative overflow-hidden">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              )}
              <div className="absolute top-4 left-4 flex gap-2">
                {product.ageTag && (
                  <span className="px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-full">
                    {product.ageTag}
                  </span>
                )}
                {product.foldable && (
                  <span className="px-3 py-1.5 bg-white text-foreground/70 text-xs font-medium rounded-full shadow-sm">
                    Foldable
                  </span>
                )}
              </div>
            </div>

            <div>
              <Link
                href={`/collections/${collection?.slug}`}
                className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-light mb-2"
              >
                <ArrowLeft className="w-3 h-3" />
                {collection?.name}
              </Link>

              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                  ))}
                </div>
                <span className="text-sm text-foreground/50">
                  Based on Trustpilot reviews
                </span>
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-muted/60 px-4 py-3 sm:px-5 sm:py-4">
                <p className="text-sm font-semibold text-foreground">
                  How pricing works
                </p>
                <p className="text-sm text-foreground/60 mt-1.5 leading-relaxed">
                  Your total depends on how many days you rent (2–28 days). Longer
                  stays usually mean a lower cost per day. Pick your dates below —
                  we show the amount for your trip, not a big “per day” figure on its
                  own.
                </p>
              </div>

              <p className="mt-6 text-foreground/60 leading-relaxed">
                {product.description}
              </p>

              <div className="mt-8">
                <BookingWidget
                  productId={product.id}
                  productName={product.name}
                  productSlug={product.slug}
                  collection={product.collection}
                  pricePerDay={product.price}
                  onUnavailable={(start, end) =>
                    setUnavailableDates({ start, end })
                  }
                />
              </div>

              <div className="mt-4">
                <RegisterInterest
                  productId={product.id}
                  productName={product.name}
                  initialStartDate={unavailableDates?.start}
                  initialEndDate={unavailableDates?.end}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                Key Features
              </h3>
              <ul className="space-y-2">
                {product.keyFeatures.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-foreground/60"
                  >
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Good to Know
              </h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                {product.goodToKnow}
              </p>
              <div className="mt-4 space-y-2 text-sm text-foreground/60">
                <p>
                  <strong className="text-foreground">Age:</strong>{" "}
                  {product.ageTag}
                </p>
                <p>
                  <strong className="text-foreground">Max weight:</strong>{" "}
                  {product.maxWeight}
                </p>
                {product.foldable !== undefined && (
                  <p>
                    <strong className="text-foreground">Foldable:</strong>{" "}
                    {product.foldable ? "Yes" : "No"}
                  </p>
                )}
                {product.rearFacing && (
                  <p>
                    <strong className="text-foreground">Rear-facing:</strong> Yes
                  </p>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-primary" />
                Size & Weight
              </h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                {product.sizeWeight}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Customer Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 border border-border"
              >
                <div className="flex items-center gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-sm text-foreground/60 leading-relaxed mb-3">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="text-sm font-medium text-foreground">
                  {review.name}{" "}
                  <span className="text-foreground/40 font-normal">
                    — {review.country}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            You Might Also Need
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recommended.map((rec) => (
              <Link
                key={rec.id}
                href={`/products/${rec.slug}`}
                className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all hover:border-primary/20"
              >
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  {rec.image && (
                    <Image
                      src={rec.image}
                      alt={rec.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="33vw"
                    />
                  )}
                  {rec.ageTag && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-white text-xs font-medium rounded-full">
                      {rec.ageTag}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    {rec.name}
                  </h3>
                  <ProductCardRateHint className="mt-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
