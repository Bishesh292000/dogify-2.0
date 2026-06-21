"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CommerceFrame } from "@/components/commerce-frame";
import { PremiumHero, PremiumPanel } from "@/components/commerce-ui";
import { ProductCard } from "@/components/product-card";
import { fetchActiveProducts } from "@/lib/commerce-api";
import { useCartStore } from "@/lib/cart-store";
import { createBuyNowWhatsAppMessage, openWhatsApp } from "@/lib/whatsapp";
import type { Product } from "@/lib/supabase/types";

export function SearchPage() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetchActiveProducts().then(({ data }) => setProducts(data ?? []));
  }, []);

  const results = useMemo(() => {
    const normalized = query.toLowerCase();
    if (!normalized) return products.slice(0, 6);
    return products.filter((product) =>
      [product.name, product.description, product.category, product.subcategory, product.brand, product.pet_type, ...(product.tags ?? [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    );
  }, [products, query]);

  return (
    <CommerceFrame>
      <PremiumHero eyebrow="Live Search" title="Find pet-care products instantly." copy="Search by product, category, brand, pet type, or tags." icon={Search} />
      <section className="section-shell pb-24">
        <PremiumPanel className="p-4">
          <input value={query} onChange={(event) => setQuery(event.target.value)} autoFocus placeholder="Search DOGIFY products..." className="h-16 w-full rounded-[14px] border border-white/70 bg-white px-5 text-lg font-black outline-none focus:border-[#FF6B35]" />
          <div className="mt-4 flex flex-wrap gap-2">
            {["Dog Food", "Beds", "Supplements", "Tick Care", "Toys"].map((term) => (
              <button key={term} type="button" onClick={() => setQuery(term)} className="rounded-[14px] bg-white px-4 py-2 text-sm font-black text-slate-600">
                {term}
              </button>
            ))}
          </div>
        </PremiumPanel>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} onOpen={() => router.push(`/product/${product.id}`)} onAddToCart={() => addItem({ id: String(product.id), name: product.name, category: product.category, price: product.price, image_url: product.image_url })} onBuyNow={() => openWhatsApp(createBuyNowWhatsAppMessage({ id: String(product.id), name: product.name, category: product.category, price: product.price, image_url: product.image_url }))} />
          ))}
        </div>
      </section>
    </CommerceFrame>
  );
}
