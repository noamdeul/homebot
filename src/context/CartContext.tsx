"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getProductBySlug, type Product, type ProductSlug } from "@/data/products";

const STORAGE_KEY = "homebot-cart";

export interface CartLineItem {
  product: Product;
  quantity: number;
}

interface CartState {
  /** slug -> quantity */
  items: Record<string, number>;
}

interface CartContextValue {
  items: CartLineItem[];
  itemCount: number;
  subtotal: number;
  addItem: (slug: ProductSlug, quantity?: number) => void;
  removeItem: (slug: ProductSlug) => void;
  updateQuantity: (slug: ProductSlug, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadFromStorage(): CartState {
  if (typeof window === "undefined") return { items: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: {} };
    const parsed = JSON.parse(raw) as CartState;
    return { items: parsed.items ?? {} };
  } catch {
    return { items: {} };
  }
}

function saveToStorage(state: CartState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>({ items: {} });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadFromStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveToStorage(state);
  }, [hydrated, state]);

  const addItem = useCallback((slug: ProductSlug, quantity = 1) => {
    setState((prev) => ({
      items: {
        ...prev.items,
        [slug]: (prev.items[slug] ?? 0) + quantity,
      },
    }));
  }, []);

  const removeItem = useCallback((slug: ProductSlug) => {
    setState((prev) => {
      const next = { ...prev.items };
      delete next[slug];
      return { items: next };
    });
  }, []);

  const updateQuantity = useCallback((slug: ProductSlug, quantity: number) => {
    if (quantity <= 0) {
      setState((prev) => {
        const next = { ...prev.items };
        delete next[slug];
        return { items: next };
      });
      return;
    }
    setState((prev) => ({
      items: { ...prev.items, [slug]: quantity },
    }));
  }, []);

  const clearCart = useCallback(() => {
    setState({ items: {} });
  }, []);

  const value = useMemo(() => {
    const entries = Object.entries(state.items);
    const lineItems: CartLineItem[] = [];
    let itemCount = 0;
    let subtotal = 0;

    for (const [slug, qty] of entries) {
      const product = getProductBySlug(slug);
      if (product && qty > 0) {
        lineItems.push({ product, quantity: qty });
        itemCount += qty;
        subtotal += product.price * qty;
      }
    }

    return {
      items: lineItems,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    };
  }, [state, addItem, removeItem, updateQuantity, clearCart]);

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
