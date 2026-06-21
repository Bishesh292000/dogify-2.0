"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartProduct } from "@/lib/cart-store";

type WishlistState = {
  items: CartProduct[];
  toggleItem: (product: CartProduct) => void;
  removeItem: (id: string) => void;
  hasItem: (id: string) => boolean;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (product) =>
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id);
          return {
            items: exists ? state.items.filter((item) => item.id !== product.id) : [...state.items, product]
          };
        }),
      removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      hasItem: (id) => get().items.some((item) => item.id === id)
    }),
    {
      name: "dogify-wishlist"
    }
  )
);
