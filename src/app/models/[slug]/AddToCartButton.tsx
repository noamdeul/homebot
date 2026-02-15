"use client";

import { useCart } from "@/context/CartContext";
import type { ProductSlug } from "@/data/products";

interface AddToCartButtonProps {
  slug: ProductSlug;
}

export function AddToCartButton({ slug }: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() => addItem(slug)}
      className="w-full rounded-md bg-emerald-600 px-6 py-3 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:w-auto"
    >
      Add to cart
    </button>
  );
}
