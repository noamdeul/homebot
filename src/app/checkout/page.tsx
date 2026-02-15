"use client";

import { useState, FormEvent } from "react";
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

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: "", email: "", address: "" });

  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;
  const isEmpty = items.length === 0;

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.address.trim()) e.address = "Address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    clearCart();
    setPlaced(true);
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-blue-900">Order placed</h1>
        <p className="mt-4 text-blue-700">
          Thank you for your order. This is a demo — no real payment was
          processed.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-blue-900">Checkout</h1>
        <p className="mt-4 text-blue-700">Your cart is empty.</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-blue-900">Checkout</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="checkout-name" className="block text-sm font-medium text-blue-800">
              Name
            </label>
            <input
              id="checkout-name"
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="mt-1 w-full rounded-md border border-blue-200 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              required
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="checkout-email" className="block text-sm font-medium text-blue-800">
              Email
            </label>
            <input
              id="checkout-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="mt-1 w-full rounded-md border border-blue-200 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="checkout-address" className="block text-sm font-medium text-blue-800">
              Address
            </label>
            <textarea
              id="checkout-address"
              rows={3}
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
              className="mt-1 w-full rounded-md border border-blue-200 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              required
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-emerald-600 px-6 py-3 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Place order
          </button>
        </form>

        <div>
          <h2 className="text-lg font-semibold text-blue-900">Order summary</h2>
          <ul className="mt-4 divide-y divide-blue-200">
            {items.map(({ product, quantity }) => (
              <li key={product.slug} className="flex justify-between py-2 text-sm text-blue-800">
                <span>
                  {product.name} × {quantity}
                </span>
                <span>{formatPrice(product.price * quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-blue-200 pt-4 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-700">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Tax (8%)</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between font-semibold text-base pt-2 text-blue-900">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
