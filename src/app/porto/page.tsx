import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, MapPin } from "lucide-react";
import { getCollectionWithProducts } from "@/lib/shopify";
import { ProductCardRateHint } from "@/components/ProductCardRateHint";
import type { Metadata } from "next";

const title = "Porto — Baby equipment rental | Let's go baby®";

export const metadata: Metadata = {
  title,
  description:
    "Rent strollers, car seats, travel cots and more in Porto and northern Portugal. Same concierge service — local delivery and pickup.",
};

function portoCollectionHandle(): string {
  return process.env.PORTO_COLLECTION_HANDLE?.trim() ?? "";
}

export default async function PortoPage() {
  const handle = portoCollectionHandle();
  const data = handle ? await getCollectionWithProducts(handle) : null;

  if (!handle || !data) {
    return (
      <>
        <section className="py-20 bg-muted">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 text-primary font-medium text-sm mb-4">
              <MapPin className="w-4 h-4" />
              Porto mini-site
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Porto equipment catalog
            </h1>
            <p className="mt-4 text-foreground/60 leading-relaxed">
              To show a dedicated Porto assortment, create a collection in
              Shopify (e.g. products you deliver in the Porto area) and set the
              environment variable{" "}
              <code className="text-sm bg-white px-1.5 py-0.5 rounded border border-border">
                PORTO_COLLECTION_HANDLE
              </code>{" "}
              to that collection&apos;s handle. Until then, browse the full
              catalog — checkout is the same.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/collections"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-light transition-colors"
              >
                Browse all equipment
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border bg-white font-medium rounded-full hover:bg-muted transition-colors"
              >
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  const { collection, products } = data;

  return (
    <>
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-light mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Main site
          </Link>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
                Porto & north
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                {collection.name}
              </h1>
              <p className="mt-4 text-lg text-foreground/60 max-w-2xl">
                {collection.description ||
                  "Equipment rentals with delivery and pickup in the Porto area — same booking flow as the rest of Portugal."}
              </p>
            </div>
            <Link
              href="/collections"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-light shrink-0"
            >
              Full catalog
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all hover:border-primary/20"
                >
                  <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                    {product.image && (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                      />
                    )}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {product.ageTag && (
                        <span className="px-2.5 py-1 bg-primary text-white text-xs font-medium rounded-full">
                          {product.ageTag}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-foreground/50 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-end justify-between mt-3 sm:mt-4 gap-2">
                      <ProductCardRateHint className="min-w-0 flex-1" />
                      <span className="text-sm font-medium text-primary flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        View details
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-foreground/50">
              No products in this collection yet.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
