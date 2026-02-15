"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, FormEvent } from "react";

export function Footer() {
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = searchRef.current?.value?.trim() ?? "";
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <footer className="mt-auto border-t border-blue-200 bg-blue-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <form
            onSubmit={handleSearch}
            className="flex gap-2"
            role="search"
            aria-label="Search products"
          >
            <label htmlFor="footer-search" className="sr-only">
              Search products
            </label>
            <input
              id="footer-search"
              ref={searchRef}
              type="search"
              name="q"
              placeholder="Search products..."
              className="rounded-md border border-blue-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Search
            </button>
          </form>
          <div className="flex items-center gap-4 text-sm text-blue-700">
            <Link href="/about" className="hover:text-blue-800">
              About us
            </Link>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-blue-600/80 sm:text-left">
          © {new Date().getFullYear()} Homebot. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
