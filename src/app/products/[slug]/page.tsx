import { getAllProducts, getProductByHandle, getCollections } from "@/lib/shopify";
import { notFound } from "next/navigation";
import { ProductDetail } from "./ProductDetail";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductByHandle(slug);
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
  const [product, allProducts, allCollections] = await Promise.all([
    getProductByHandle(slug),
    getAllProducts(),
    getCollections(),
  ]);

  if (!product) notFound();

  const collection = allCollections.find(
    (c) => c.slug === product.collection
  );

  const recommended = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <ProductDetail
      product={product}
      collection={collection ? { id: collection.id, name: collection.name, slug: collection.slug } : undefined}
      recommended={recommended}
    />
  );
}
