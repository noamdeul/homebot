"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents);
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <article className="flex flex-col rounded-lg border border-blue-200 bg-white shadow-sm overflow-hidden">
      <div className="relative h-48 bg-blue-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain object-center"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h2 className="text-lg font-semibold text-blue-900">{product.name}</h2>
        <p className="mt-1 flex-1 text-sm text-blue-700/90">{product.capabilities}</p>
        <p className="mt-2 text-lg font-semibold text-blue-900">
          {formatPrice(product.price)}
        </p>
        <div className="mt-4 flex gap-3">
          <Link
            href={`/models/${product.slug}`}
            className="flex-1 rounded-md border border-blue-200 bg-white px-4 py-2 text-center text-sm font-medium text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            View model
          </Link>
          <button
            type="button"
            onClick={() => addItem(product.slug)}
            className="flex-1 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
