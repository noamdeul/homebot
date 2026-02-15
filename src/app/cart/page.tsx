"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

const TAX_RATE = 0.08;

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents);
}

export default function CartPage() {
  const { items, itemCount, subtotal, updateQuantity, removeItem } = useCart();
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;
  const isEmpty = items.length === 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-blue-900">Your Cart</h1>

      {isEmpty ? (
        <p className="mt-6 text-blue-700">Your cart is empty.</p>
      ) : (
        <div className="mt-6 space-y-6">
          <ul className="divide-y divide-blue-200">
            {items.map(({ product, quantity }) => (
              <li key={product.slug} className="flex flex-wrap items-center gap-4 py-4 sm:flex-nowrap">
                <div className="w-full sm:w-auto">
                  <p className="font-medium text-blue-900">{product.name}</p>
                  <p className="text-sm text-blue-700/90">
                    {formatPrice(product.price)} each
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.slug, quantity - 1)}
                    className="rounded border border-blue-200 px-2 py-1 text-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    aria-label={`Decrease quantity of ${product.name}`}
                  >
                    −
                  </button>
                  <span className="min-w-[2rem] text-center" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.slug, quantity + 1)}
                    className="rounded border border-blue-200 px-2 py-1 text-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    aria-label={`Increase quantity of ${product.name}`}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(product.slug)}
                    className="ml-2 text-sm text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                  >
                    Remove
                  </button>
                </div>
                <p className="w-full text-right font-medium sm:w-auto">
                  {formatPrice(product.price * quantity)}
                </p>
              </li>
            ))}
          </ul>

          <div className="border-t border-blue-200 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-blue-700">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-blue-700">Estimated tax (8%)</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between font-semibold mt-2 text-base text-blue-900">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/"
              className="rounded-md border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Continue shopping
            </Link>
            <Link
              href="/checkout"
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
