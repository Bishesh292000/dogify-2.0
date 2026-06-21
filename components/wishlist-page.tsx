"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { CommerceFrame } from "@/components/commerce-frame";
import { PremiumHero, PremiumPanel } from "@/components/commerce-ui";
import { OptimizedImage } from "@/components/optimized-image";
import { useCartStore } from "@/lib/cart-store";
import { useWishlistStore } from "@/lib/wishlist-store";
import { formatCurrency } from "@/lib/whatsapp";

export function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const addItem = useCartStore((state) => state.addItem);

  return (
    <CommerceFrame>
      <PremiumHero eyebrow="Wishlist" title="Your saved pet-care picks." copy="Keep products ready for later, then move them to cart when your pet needs them." icon={Heart} />
      <section className="section-shell pb-24">
        {items.length === 0 ? (
          <PremiumPanel className="p-12 text-center">
            <Heart className="mx-auto h-12 w-12 text-[#FF6B35]" />
            <h2 className="mt-4 text-3xl font-black text-slate-950">Your wishlist is empty.</h2>
            <p className="mt-3 text-slate-600">Save premium DOGIFY products while browsing.</p>
          </PremiumPanel>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {items.map((item) => (
                <motion.article key={item.id} layout exit={{ opacity: 0, scale: 0.95 }} className="overflow-hidden rounded-[20px] border border-white/60 bg-white/70 shadow-[0_24px_90px_rgba(15,23,42,0.10)]">
                  <div className="relative aspect-[4/3] bg-slate-100">
                    {item.image_url ? <OptimizedImage src={item.image_url} alt={item.name} /> : <div className="grid h-full place-items-center font-black text-slate-400">DOGIFY</div>}
                  </div>
                  <div className="p-6">
                    <p className="text-sm font-black uppercase tracking-[0.2em] text-[#FF6B35]">{item.category}</p>
                    <h2 className="mt-3 text-2xl font-black text-slate-950">{item.name}</h2>
                    <p className="mt-4 text-3xl font-black">{formatCurrency(item.price)}</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => {
                          addItem(item);
                          removeItem(item.id);
                        }}
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[14px] bg-slate-950 text-sm font-black text-white"
                      >
                        Move To Cart <ShoppingCart className="h-4 w-4" />
                      </button>
                      <button type="button" onClick={() => removeItem(item.id)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[14px] bg-red-50 text-sm font-black text-red-600">
                        Remove <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </CommerceFrame>
  );
}
