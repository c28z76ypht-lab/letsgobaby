import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { getCollections, getCollectionWithProducts } from "@/lib/shopify";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((col) => ({ slug: col.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getCollectionWithProducts(slug);
  if (!data) return {};
  return {
    title: `${data.collection.name} Rental — Let's go baby®`,
    description: data.collection.description,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getCollectionWithProducts(slug);
  if (!data) notFound();

  const allCollections = await getCollections();
  const { collection, products } = data;

  return (
    <>
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-light mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All Collections
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            {collection.name}
          </h1>
          <p className="mt-4 text-lg text-foreground/60">
            {collection.description}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-3 pb-6 scrollbar-hide">
            {allCollections.map((col) => (
              <Link
                key={col.id}
                href={`/collections/${col.slug}`}
                className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-colors border ${
                  col.slug === collection.slug
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-foreground/70 border-border hover:bg-muted"
                }`}
              >
                {col.name}
              </Link>
            ))}
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {product.ageTag && (
                        <span className="px-2.5 py-1 bg-primary text-white text-xs font-medium rounded-full">
                          {product.ageTag}
                        </span>
                      )}
                      {product.foldable && (
                        <span className="px-2.5 py-1 bg-white/90 text-foreground/70 text-xs font-medium rounded-full">
                          Foldable
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-5">
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
          ) : (
            <div className="text-center py-20">
              <p className="text-foreground/40">
                Products coming soon for this category.
              </p>
              <Link
                href="/collections"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary"
              >
                Browse all products
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
