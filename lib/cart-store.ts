"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url: string | null;
};

export type CartItem = CartProduct & {
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: CartProduct) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              )
            };
          }

          return { items: [...state.items, { ...product, quantity: 1 }] };
        }),
      removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
            .filter((item) => item.quantity > 0)
        })),
      clearCart: () => set({ items: [] })
    }),
    {
      name: "dogify-cart"
    }
  )
);

export function getCartTotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}
