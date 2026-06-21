"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Minus, Plus, ShieldCheck, ShoppingCart, Star, Truck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CommerceFrame } from "@/components/commerce-frame";
import { OptimizedImage } from "@/components/optimized-image";
import { ProductCard } from "@/components/product-card";
import { PremiumPanel } from "@/components/commerce-ui";
import { fetchActiveProducts, fetchProductById } from "@/lib/commerce-api";
import { useCartStore } from "@/lib/cart-store";
import { createBuyNowWhatsAppMessage, formatCurrency, openWhatsApp } from "@/lib/whatsapp";
import type { Product } from "@/lib/supabase/types";

export function ProductDetailPage({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState("Standard");
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function loadProduct() {
      const [{ data }, allProducts] = await Promise.all([fetchProductById(productId), fetchActiveProducts()]);
      setProduct(data);
      setRelated((allProducts.data ?? []).filter((item) => item.id !== Number(productId)).slice(0, 4));
    }

    loadProduct();
  }, [productId]);

  const gallery = useMemo(() => [product?.image_url, product?.image_url, product?.image_url].filter(Boolean) as string[], [product]);

  function addToCart() {
    if (!product) return;
    Array.from({ length: quantity }).forEach(() =>
      addItem({
        id: String(product.id),
        name: product.name,
        category: product.category,
        price: product.price,
        image_url: product.image_url
      })
    );
  }

  if (!product) {
    return (
      <CommerceFrame>
        <section className="section-shell grid min-h-screen place-items-center pt-28">
          <PremiumPanel className="w-full p-10 text-center">
            <div className="mx-auto h-20 w-20 animate-pulse rounded-[20px] bg-[#FF6B35]/20" />
            <p className="mt-5 text-xl font-black text-slate-950">Loading product experience...</p>
          </PremiumPanel>
        </section>
      </CommerceFrame>
    );
  }

  return (
    <CommerceFrame>
      <section className="section-shell grid gap-8 pb-16 pt-32 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <div className="grid gap-4">
          <PremiumPanel className="relative aspect-square overflow-hidden">
            {product.image_url ? (
              <OptimizedImage src={product.image_url} alt={product.name} priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover transition duration-500 hover:scale-110" />
            ) : (
              <div className="grid h-full place-items-center bg-gradient-to-br from-[#FF6B35]/15 to-[#FFB84D]/20 text-2xl font-black text-slate-400">DOGIFY</div>
            )}
          </PremiumPanel>
          <div className="grid grid-cols-3 gap-3">
            {(gallery.length ? gallery : [""]).map((src, index) => (
              <PremiumPanel key={index} className="relative aspect-square overflow-hidden">
                {src ? <OptimizedImage src={src} alt={`${product.name} view ${index + 1}`} sizes="180px" /> : <div className="h-full bg-[#FF6B35]/10" />}
              </PremiumPanel>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-28">
          <PremiumPanel className="p-6 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#FF6B35]">{product.subcategory ?? product.category}</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">{product.name}</h1>
            <div className="mt-4 flex items-center gap-1 text-[#FFB84D]">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-5 w-5 fill-current" />
              ))}
              <span className="ml-2 text-sm font-black text-slate-500">4.9 reviews</span>
            </div>
            <p className="mt-5 text-lg leading-8 text-slate-600">{product.description}</p>
            <p className="mt-6 text-5xl font-black text-slate-950">{formatCurrency(product.price)}</p>

            <div className="mt-7 grid gap-4">
              <div>
                <p className="mb-2 text-sm font-black text-slate-700">Variant</p>
                <div className="flex flex-wrap gap-2">
                  {["Standard", "Value Pack", "Premium Care"].map((variant) => (
                    <button
                      key={variant}
                      type="button"
                      onClick={() => setSelectedVariant(variant)}
                      className={`rounded-[14px] px-4 py-3 text-sm font-black ${selectedVariant === variant ? "bg-[#FF6B35] text-white" : "bg-white text-slate-700"}`}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm font-black text-slate-700">Quantity</p>
                <div className="inline-flex items-center gap-2 rounded-[14px] bg-white p-2">
                  <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="grid h-10 w-10 place-items-center rounded-[12px] bg-slate-100">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="grid h-10 min-w-12 place-items-center text-sm font-black">{quantity}</span>
                  <button type="button" onClick={() => setQuantity(quantity + 1)} className="grid h-10 w-10 place-items-center rounded-[12px] bg-slate-100">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={addToCart} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[14px] bg-slate-950 px-5 text-sm font-black text-white">
                Add To Cart <ShoppingCart className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  openWhatsApp(
                    createBuyNowWhatsAppMessage({
                      id: String(product.id),
                      name: product.name,
                      category: product.category,
                      price: product.price,
                      image_url: product.image_url
                    }, quantity)
                  )
                }
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[14px] bg-[#FF6B35] px-5 text-sm font-black text-white"
              >
                Buy Now <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-8 grid gap-3">
              {[
                { icon: Truck, title: "Delivery", copy: "WhatsApp confirmation before dispatch." },
                { icon: ShieldCheck, title: "Trust", copy: "DOGIFY checks availability and suitability." },
                { icon: BadgeCheck, title: "Care support", copy: "Ask us before buying for your pet." }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-3 rounded-[14px] bg-white p-4">
                    <Icon className="h-5 w-5 text-[#22C55E]" />
                    <div>
                      <p className="text-sm font-black text-slate-950">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.copy}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </PremiumPanel>
        </aside>
      </section>

      <section className="section-shell grid gap-6 py-14 lg:grid-cols-3">
        {["Product highlights", "Customer reviews", "Frequently bought together"].map((title, index) => (
          <motion.article key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: index * 0.05 }}>
            <PremiumPanel className="min-h-48 p-6">
              <h2 className="text-2xl font-black text-slate-950">{title}</h2>
              <p className="mt-3 leading-7 text-slate-600">Premium DOGIFY guidance, trust markers, and care context for confident pet-parent decisions.</p>
            </PremiumPanel>
          </motion.article>
        ))}
      </section>

      <section className="section-shell pb-24 pt-8">
        <h2 className="text-3xl font-black text-slate-950">Related products</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((item, index) => (
            <ProductCard key={item.id} product={item} index={index} onOpen={() => setProduct(item)} onAddToCart={() => addItem({ id: String(item.id), name: item.name, category: item.category, price: item.price, image_url: item.image_url })} onBuyNow={() => openWhatsApp(createBuyNowWhatsAppMessage({ id: String(item.id), name: item.name, category: item.category, price: item.price, image_url: item.image_url }))} />
          ))}
        </div>
      </section>
    </CommerceFrame>
  );
}
