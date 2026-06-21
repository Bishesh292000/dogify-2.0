"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Box, SlidersHorizontal, ShoppingCart, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CommerceFrame } from "@/components/commerce-frame";
import { OptimizedImage } from "@/components/optimized-image";
import { ProductCard } from "@/components/product-card";
import { ProductFilters } from "@/components/product-filters";
import { PremiumHero, PremiumPanel } from "@/components/commerce-ui";
import { fetchProductsByCategory } from "@/lib/commerce-api";
import { useCartStore } from "@/lib/cart-store";
import { createBuyNowWhatsAppMessage, formatCurrency, openWhatsApp } from "@/lib/whatsapp";
import type { Product } from "@/lib/supabase/types";

type ProductCategoryPageProps = {
  title: string;
  eyebrow: string;
  copy: string;
  commerceCategory: "food" | "accessories" | "medicines";
  categories: string[];
  image: string;
};

export function ProductCategoryPage({
  title,
  eyebrow,
  copy,
  commerceCategory,
  categories,
  image
}: ProductCategoryPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "missing-config" | "error">("loading");
  const [message, setMessage] = useState("");
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      const { data, error } = await fetchProductsByCategory(commerceCategory);

      if (!active) {
        return;
      }

      if (error) {
        setStatus(data === null ? "missing-config" : "error");
        setMessage(error.message);
        return;
      }

      setProducts(data ?? []);
      setStatus("ready");
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, [commerceCategory]);

  const filteredProducts = useMemo(() => {
    const nextProducts = products.filter((product) => {
      const searchableText = [
        product.name,
        product.description,
        product.category,
        product.subcategory,
        product.brand,
        product.pet_type,
        ...(product.tags ?? [])
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesSearch = searchableText.includes(query.trim().toLowerCase());
      const matchesCategory =
        selectedCategory === "All" ||
        product.subcategory?.toLowerCase() === selectedCategory.toLowerCase() ||
        searchableText.includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });

    return nextProducts.sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "newest") return new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime();
      return Number(b.featured) - Number(a.featured);
    });
  }, [products, query, selectedCategory, sort]);

  function addToCart(product: Product) {
    addItem({
      id: String(product.id),
      name: product.name,
      category: product.category,
      price: product.price,
      image_url: product.image_url
    });
  }

  function buyNow(product: Product) {
    openWhatsApp(
      createBuyNowWhatsAppMessage({
        id: String(product.id),
        name: product.name,
        category: product.category,
        price: product.price,
        image_url: product.image_url
      })
    );
  }

  return (
    <CommerceFrame>
      <PremiumHero eyebrow={eyebrow} title={title} copy={copy} icon={ShoppingCart} />

      <section className="section-shell grid gap-6 py-10 lg:grid-cols-[290px_1fr] lg:items-start">
        <aside className="lg:sticky lg:top-28">
          <PremiumPanel className="p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#FF6B35] text-white">
                <SlidersHorizontal className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#FF6B35]">Filters</p>
                <h2 className="text-xl font-black text-slate-950">Shop smarter</h2>
              </div>
            </div>
            <div className="mt-5">
              <ProductFilters
                categories={categories}
                query={query}
                selectedCategory={selectedCategory}
                onQueryChange={setQuery}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          </PremiumPanel>
        </aside>

        <div>
          <PremiumPanel className="mb-6 flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#FF6B35]">Live DOGIFY Catalog</p>
              <p className="mt-1 text-sm font-bold text-slate-500">{filteredProducts.length} products ready for DOGIFY parents</p>
            </div>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="h-12 rounded-[14px] border border-white/70 bg-white px-4 text-sm font-black text-slate-700 outline-none"
            >
              <option value="featured">Sort: Featured</option>
              <option value="newest">Sort: Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </PremiumPanel>
          {status === "loading" ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-[430px] animate-pulse rounded-[20px] border border-white/70 bg-white/70 shadow-[0_24px_90px_rgba(15,23,42,0.08)]" />
              ))}
            </div>
          ) : status !== "ready" ? (
            <PremiumPanel className="p-10 text-center">
              <Sparkles className="mx-auto h-10 w-10 text-[#FF6B35]" />
              <h2 className="mt-4 text-2xl font-black text-slate-950">DOGIFY products are ready to connect.</h2>
              <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">{message}</p>
            </PremiumPanel>
          ) : filteredProducts.length === 0 ? (
            <PremiumPanel className="p-10 text-center">
              <Box className="mx-auto h-12 w-12 text-[#FF6B35]" />
              <h2 className="mt-4 text-3xl font-black text-slate-950">No products found.</h2>
              <p className="mt-3 text-slate-600">Try a different search, sort, or category chip.</p>
            </PremiumPanel>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onOpen={setSelectedProduct}
                  onAddToCart={addToCart}
                  onBuyNow={buyNow}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedProduct ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ y: 24, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 24, scale: 0.96 }}
              className="max-h-[92vh] w-full max-w-4xl overflow-auto rounded-[2.5rem] bg-white shadow-premium"
            >
              <div className="grid gap-0 lg:grid-cols-2">
                <div className="relative min-h-[360px] bg-slate-100">
                  {selectedProduct.image_url ? (
                    <OptimizedImage src={selectedProduct.image_url} alt={selectedProduct.name} sizes="(max-width: 1024px) 100vw, 50vw" />
                  ) : (
                    <div className="grid h-full min-h-[360px] place-items-center text-xl font-black text-slate-400">DOGIFY</div>
                  )}
                </div>
                <div className="p-6 md:p-8">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(null)}
                    aria-label="Close product details"
                    className="ml-auto grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-dogify-ink"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-dogify-cyan">{selectedProduct.category}</p>
                  <h2 className="mt-3 text-4xl font-black text-dogify-ink">{selectedProduct.name}</h2>
                  <p className="mt-4 leading-8 text-slate-600">{selectedProduct.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {[selectedProduct.subcategory, selectedProduct.brand, selectedProduct.pet_type, ...(selectedProduct.tags ?? [])]
                      .filter(Boolean)
                      .map((label) => (
                        <span key={label} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-black text-slate-600">
                          {label}
                        </span>
                      ))}
                  </div>
                  <p className="mt-6 text-4xl font-black text-dogify-ink">{formatCurrency(selectedProduct.price)}</p>
                  <p className="mt-2 text-sm font-bold text-slate-500">
                    {selectedProduct.stock && selectedProduct.stock > 0 ? `${selectedProduct.stock} in stock` : "Stock updates from DOGIFY"}
                  </p>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => addToCart(selectedProduct)}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-dogify-blue px-4 text-sm font-black text-white"
                    >
                      Add To Cart <ShoppingCart className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => buyNow(selectedProduct)}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-dogify-green px-4 text-sm font-black text-white"
                    >
                      Buy Now <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </CommerceFrame>
  );
}
