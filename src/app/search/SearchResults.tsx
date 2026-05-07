"use client";

import { useSearchParams } from "next/navigation";
import { searchProducts } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q")?.trim() ?? "";
  const results = searchProducts(q);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-blue-900">
        {q ? `Search results for “${q}”` : "Search"}
      </h1>

      {results.length === 0 ? (
        <p className="mt-6 text-blue-700">No results found.</p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
