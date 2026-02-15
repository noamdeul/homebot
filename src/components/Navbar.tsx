"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export function Navbar() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-blue-200 bg-white">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-xl font-semibold text-blue-800 hover:text-blue-600"
        >
          Homebot
        </Link>
        <div className="flex items-center gap-6">
          <div className="relative flex items-center gap-4">
            <Link
              href="/#models"
              className="text-blue-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded"
            >
              Models
            </Link>
            <Link
              href="/cart"
              className="relative flex items-center gap-1 rounded-md px-3 py-2 text-blue-700 hover:bg-emerald-50 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              aria-label={`Cart, ${itemCount} items`}
            >
              Cart
              {itemCount > 0 && (
                <span
                  className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-emerald-600 px-1.5 text-xs font-medium text-white"
                  aria-hidden
                >
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
