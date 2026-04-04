import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { collections, sampleProducts } from "@/lib/data";

export const metadata = {
  title: "Baby Equipment Rental — Let's go baby®",
  description:
    "Browse our full range of baby equipment for hire in Portugal. Strollers, car seats, cots, highchairs, carriers and more.",
};

export default function CollectionsPage() {
  return (
    <>
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
              Equipment Rental
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              Baby Equipment for Hire
            </h1>
            <p className="mt-6 text-lg text-foreground/60 leading-relaxed">
              Top-quality products from trusted brands — cleaned, sanitised and
              delivered to your door. Choose a category or browse all products.
            </p>
          </div>
        </div>
      </section>

      {/* Category grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
            {collections.map((col) => (
              <Link
                key={col.id}
                href={`/collections/${col.slug}`}
                className="shrink-0 px-5 py-2.5 bg-muted rounded-full text-sm font-medium text-foreground/70 hover:bg-primary hover:text-white transition-colors border border-border hover:border-primary"
              >
                {col.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all hover:border-primary/20"
              >
                <div className="aspect-[4/3] bg-muted relative">
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 bg-primary text-white text-xs font-medium rounded-full">
                      {product.ageTag}
                    </span>
                    {product.foldable && (
                      <span className="px-2.5 py-1 bg-white/90 text-foreground/70 text-xs font-medium rounded-full">
                        Foldable
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-primary font-medium uppercase tracking-wider mb-1">
                    {collections.find((c) => c.id === product.collection)?.name}
                  </p>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-foreground/50 mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-lg font-bold text-foreground">
                      €{product.price}
                      <span className="text-sm font-normal text-foreground/50">
                        /{product.priceUnit}
                      </span>
                    </p>
                    <span className="text-sm font-medium text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      View details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
