"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ShoppingCart, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CommerceFrame } from "@/components/commerce-frame";
import { ProductCard } from "@/components/product-card";
import { ProductFilters } from "@/components/product-filters";
import { fetchProductsByCategories } from "@/lib/commerce-api";
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
  categories,
  image
}: ProductCategoryPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "missing-config" | "error">("loading");
  const [message, setMessage] = useState("");
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      const { data, error } = await fetchProductsByCategories(categories);

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
  }, [categories]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = `${product.name} ${product.description ?? ""}`
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [products, query, selectedCategory]);

  function addToCart(product: Product) {
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image_url: product.image_url
    });
  }

  function buyNow(product: Product) {
    openWhatsApp(
      createBuyNowWhatsAppMessage({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        image_url: product.image_url
      })
    );
  }

  return (
    <CommerceFrame>
      <section className="section-shell grid min-h-[680px] items-center gap-10 pb-16 pt-32 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-bold text-dogify-blue shadow-sm backdrop-blur">
            <ShoppingCart className="h-4 w-4 text-dogify-green" />
            {eyebrow}
          </div>
          <h1 className="text-balance text-5xl font-black tracking-tight text-dogify-ink sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-600">{copy}</p>
        </div>
        <div className="relative min-h-[460px] overflow-hidden rounded-[3rem] shadow-premium">
          <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dogify-ink via-dogify-ink/20 to-transparent" />
          <div className="glass-dark absolute bottom-5 left-5 right-5 rounded-[2rem] p-6 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-dogify-green">Live Supabase Catalog</p>
            <p className="mt-3 text-3xl font-black">{categories.join(" | ")}</p>
          </div>
        </div>
      </section>

      <section className="section-shell py-12">
        <ProductFilters
          categories={categories}
          query={query}
          selectedCategory={selectedCategory}
          onQueryChange={setQuery}
          onCategoryChange={setSelectedCategory}
        />
      </section>

      <section className="section-shell pb-24 pt-6">
        {status === "loading" ? (
          <div className="glass rounded-[2rem] p-10 text-center text-lg font-black text-dogify-ink">Loading DOGIFY products...</div>
        ) : status !== "ready" ? (
          <div className="glass rounded-[2rem] p-10 text-center">
            <h2 className="text-2xl font-black text-dogify-ink">Supabase products are ready to connect.</h2>
            <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">{message}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="glass rounded-[2rem] p-10 text-center">
            <h2 className="text-2xl font-black text-dogify-ink">No products found.</h2>
            <p className="mt-3 text-slate-600">Add matching rows in Supabase or adjust the search and filters.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                <div className="min-h-[360px] bg-slate-100">
                  {selectedProduct.image_url ? (
                    <img loading="lazy" src={selectedProduct.image_url} alt={selectedProduct.name} className="h-full w-full object-cover" />
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
                  <p className="mt-6 text-4xl font-black text-dogify-ink">{formatCurrency(selectedProduct.price)}</p>
                  <p className="mt-2 text-sm font-bold text-slate-500">
                    {selectedProduct.stock && selectedProduct.stock > 0 ? `${selectedProduct.stock} in stock` : "Stock updates from Supabase"}
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
