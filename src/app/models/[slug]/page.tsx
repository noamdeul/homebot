import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug } from "@/data/products";
import { AddToCartButton } from "./AddToCartButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ModelPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const allProducts = getAllProducts();
  const others = allProducts.filter((p) => p.slug !== product.slug);

  const features = product.capabilities.split(" + ").map((s) => s.trim());

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-blue-700">
        <Link href="/" className="hover:text-blue-900">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-blue-900">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-blue-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-blue-900">{product.name}</h1>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-blue-700">
            {features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
          <p className="mt-6 text-2xl font-semibold text-blue-900">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(product.price)}
          </p>
          <div className="mt-6">
            <AddToCartButton slug={product.slug} />
          </div>
        </div>
      </div>

      <section className="mt-12 border-t border-blue-200 pt-8">
        <h2 className="text-lg font-semibold text-blue-900">
          Compare with other models
        </h2>
        <div className="mt-4 flex flex-wrap gap-4">
          {others.map((p) => (
            <Link
              key={p.slug}
              href={`/models/${p.slug}`}
              className="rounded-md border border-blue-200 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
            >
              {p.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
