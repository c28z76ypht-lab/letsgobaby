import { sampleProducts, collections } from "@/lib/data";
import { notFound } from "next/navigation";
import { ProductDetail } from "./ProductDetail";

export function generateStaticParams() {
  return sampleProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = sampleProducts.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} — Rent from Let's go baby®`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = sampleProducts.find((p) => p.slug === slug);
  if (!product) notFound();

  const collection = collections.find((c) => c.id === product.collection);
  const recommended = sampleProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <ProductDetail
      product={product}
      collection={collection}
      recommended={recommended}
    />
  );
}
