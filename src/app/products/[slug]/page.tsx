"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Star,
  Info,
  Ruler,
  ChevronRight,
  ShoppingBag,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { sampleProducts, collections, reviews } from "@/lib/data";
import { notFound } from "next/navigation";

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = sampleProducts.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const collection = collections.find((c) => c.id === product.collection);

  const recommended = sampleProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState(1);

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
            {/* Image */}
            <div className="bg-muted rounded-3xl aspect-square relative">
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-full">
                  {product.ageTag}
                </span>
                {product.foldable && (
                  <span className="px-3 py-1.5 bg-white text-foreground/70 text-xs font-medium rounded-full shadow-sm">
                    Foldable
                  </span>
                )}
              </div>
            </div>

            {/* Details */}
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
                    <Star
                      key={i}
                      className="w-4 h-4 text-accent fill-accent"
                    />
                  ))}
                </div>
                <span className="text-sm text-foreground/50">
                  Based on Trustpilot reviews
                </span>
              </div>

              <div className="mt-6">
                <p className="text-3xl font-bold text-foreground">
                  €{product.price}
                  <span className="text-base font-normal text-foreground/50">
                    /{product.priceUnit}
                  </span>
                </p>
              </div>

              <p className="mt-6 text-foreground/60 leading-relaxed">
                {product.description}
              </p>

              {/* Booking widget placeholder */}
              <div className="mt-8 bg-muted rounded-2xl p-6 border border-border">
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
                      onChange={(e) => setStartDate(e.target.value)}
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
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-medium text-foreground/60 mb-1">
                    Quantity
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="w-full py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-light transition-colors flex items-center justify-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  Add to Booking
                </button>
                <p className="text-xs text-foreground/40 text-center mt-3">
                  No deposit required. Instant confirmation.
                </p>
              </div>

              {/* Interest form for unavailable dates */}
              <div className="mt-4 bg-accent/10 rounded-xl p-4 border border-accent/20">
                <p className="text-sm text-foreground/70">
                  <strong>Not available for your dates?</strong> Let us know
                  and we&apos;ll notify you if it becomes available.
                </p>
                <button className="mt-2 text-sm font-medium text-primary hover:text-primary-light flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5" />
                  Register Interest
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details */}
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
                {"rearFacing" in product && (
                  <p>
                    <strong className="text-foreground">Rear-facing:</strong>{" "}
                    Yes
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

      {/* Reviews */}
      <section className="py-12 bg-muted border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Customer Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-border">
                <div className="flex items-center gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-3.5 h-3.5 text-accent fill-accent"
                    />
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

      {/* Recommendations */}
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
                <div className="aspect-[4/3] bg-muted relative">
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-white text-xs font-medium rounded-full">
                    {rec.ageTag}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    {rec.name}
                  </h3>
                  <p className="text-sm font-bold text-foreground mt-1">
                    €{rec.price}
                    <span className="text-xs font-normal text-foreground/50">
                      /{rec.priceUnit}
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
