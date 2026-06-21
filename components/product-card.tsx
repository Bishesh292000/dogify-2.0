"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Eye, Heart, ShoppingCart, Star } from "lucide-react";
import { OptimizedImage } from "@/components/optimized-image";
import { useWishlistStore } from "@/lib/wishlist-store";
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
  const isWishlisted = useWishlistStore((state) => state.hasItem(String(product.id)));
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-[20px] border border-white/60 bg-white/65 shadow-[0_24px_90px_rgba(15,23,42,0.12)] backdrop-blur-2xl"
    >
      <div className="relative">
        <div
          role="button"
          tabIndex={0}
          onClick={() => onOpen(product)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              onOpen(product);
            }
          }}
          className="relative aspect-[4/3] cursor-pointer overflow-hidden bg-slate-100"
        >
          {product.image_url ? (
            <OptimizedImage
              src={product.image_url}
              alt={product.name}
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="grid h-full place-items-center bg-gradient-to-br from-[#FF6B35]/15 to-[#FFB84D]/20 text-sm font-black text-slate-400">DOGIFY</div>
          )}
          <div className="absolute left-4 top-4 rounded-full bg-[#FF6B35] px-3 py-1 text-xs font-black text-white shadow-lg">
            {product.featured ? "Featured" : "Fresh"}
          </div>
          <button
            type="button"
            aria-label="Toggle wishlist"
            onClick={(event) => {
              event.stopPropagation();
              toggleWishlist({
                id: String(product.id),
                name: product.name,
                category: product.category,
                price: product.price,
                image_url: product.image_url
              });
            }}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-[14px] bg-white/85 text-slate-700 shadow-lg backdrop-blur transition hover:text-[#FF6B35]"
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? "fill-[#FF6B35] text-[#FF6B35]" : ""}`} />
          </button>
          <div className="absolute bottom-4 left-4 right-4 flex translate-y-4 items-center gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onOpen(product);
              }}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-[14px] bg-white/90 px-4 text-sm font-black text-slate-950 backdrop-blur"
            >
              Quick View <Eye className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-dogify-cyan">
            {product.subcategory ?? product.category}
          </p>
          <Link href={`/product/${product.id}`} className="mt-3 block text-2xl font-black text-slate-950 transition hover:text-[#FF6B35]">
            {product.name}
          </Link>
          <div className="mt-3 flex items-center gap-1 text-[#FFB84D]">
            {Array.from({ length: 5 }).map((_, starIndex) => (
              <Star key={starIndex} className="h-4 w-4 fill-current" />
            ))}
            <span className="ml-2 text-xs font-black text-slate-500">4.9</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {[product.brand, product.pet_type].filter(Boolean).map((label) => (
              <span key={label} className="rounded-full bg-white/80 px-3 py-1 text-xs font-black text-slate-500">
                {label}
              </span>
            ))}
          </div>
          <p className="mt-3 line-clamp-2 min-h-14 text-sm leading-7 text-slate-600">{product.description}</p>
          <div className="mt-4 flex items-end justify-between gap-3">
            <p className="text-3xl font-black text-slate-950">{formatCurrency(product.price)}</p>
            <p className="text-xs font-bold text-[#22C55E]">{product.stock > 0 ? "In stock" : "Check stock"}</p>
          </div>
        </div>
      </div>
      <div className="grid gap-3 px-6 pb-6 transition duration-300 sm:grid-cols-2 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[14px] bg-slate-950 px-4 text-sm font-black text-white transition hover:-translate-y-0.5"
        >
          Add To Cart <ShoppingCart className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onBuyNow(product)}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[14px] bg-[#FF6B35] px-4 text-sm font-black text-white transition hover:-translate-y-0.5"
        >
          Buy Now <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.article>
  );
}
