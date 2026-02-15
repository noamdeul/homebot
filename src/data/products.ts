/**
 * Central product catalog for Homebot. No database — all products hardcoded.
 */

export type ProductSlug = "x1" | "x2" | "x3";

export interface Product {
  id: string;
  slug: ProductSlug;
  name: string;
  price: number;
  capabilities: string;
  /** Path to product image in public folder (e.g. /model_x1.png) */
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: "homebot-x1",
    slug: "x1",
    name: "Homebot X1",
    price: 399,
    capabilities: "clears floors like a modern robot vacuum cleaner",
    image: "/model_x1.png",
  },
  {
    id: "homebot-x2",
    slug: "x2",
    name: "Homebot X2",
    price: 899,
    capabilities: "clears floors + can also wash dishes",
    image: "/model_x2.png",
  },
  {
    id: "homebot-x3",
    slug: "x3",
    name: "Homebot X3",
    price: 1499,
    capabilities:
      "clears floors + washes dishes + does laundry + cleans windows",
    image: "/model_x3.png",
  },
];

export function getAllProducts(): Product[] {
  return [...PRODUCTS];
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/**
 * Filter products by search query (name and capabilities, case-insensitive).
 */
export function searchProducts(query: string): Product[] {
  if (!query.trim()) return getAllProducts();
  const q = query.trim().toLowerCase();
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.capabilities.toLowerCase().includes(q)
  );
}
