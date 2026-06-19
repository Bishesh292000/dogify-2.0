"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { formatCurrency } from "@/lib/whatsapp";
import type { Product } from "@/lib/supabase/types";

type ProductCardProps = {
  product: Product;
  index: number;
  onOpen: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
};

export function ProductCard({ product, index, onOpen, onAddToCart, onBuyNow }: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className="glass overflow-hidden rounded-[2rem]"
    >
      <button type="button" onClick={() => onOpen(product)} className="block w-full text-left">
        <div className="aspect-[4/3] bg-slate-100">
          {product.image_url ? (
            <img loading="lazy" src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full place-items-center text-sm font-black text-slate-400">DOGIFY</div>
          )}
        </div>
        <div className="p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-dogify-cyan">{product.category}</p>
          <h2 className="mt-3 text-2xl font-black text-dogify-ink">{product.name}</h2>
          <p className="mt-3 line-clamp-2 min-h-14 text-sm leading-7 text-slate-600">{product.description}</p>
          <p className="mt-4 text-3xl font-black text-dogify-ink">{formatCurrency(product.price)}</p>
        </div>
      </button>
      <div className="grid gap-3 px-6 pb-6 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-dogify-blue px-4 text-sm font-black text-white transition hover:-translate-y-0.5"
        >
          Add To Cart <ShoppingCart className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onBuyNow(product)}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-dogify-green px-4 text-sm font-black text-white transition hover:-translate-y-0.5"
        >
          Buy Now <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.article>
  );
}
