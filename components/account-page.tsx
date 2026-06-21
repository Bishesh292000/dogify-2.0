"use client";

import { motion } from "framer-motion";
import { Heart, Home, MapPin, PawPrint, PackageCheck, User } from "lucide-react";
import { CommerceFrame } from "@/components/commerce-frame";
import { PremiumHero, PremiumPanel } from "@/components/commerce-ui";
import { useCartStore } from "@/lib/cart-store";
import { useWishlistStore } from "@/lib/wishlist-store";

const dashboardCards = [
  { title: "Order history", copy: "Track WhatsApp-confirmed DOGIFY orders.", icon: PackageCheck },
  { title: "Saved addresses", copy: "Keep delivery locations ready.", icon: MapPin },
  { title: "Pet profiles", copy: "Prepare dog, cat, puppy, and senior-care notes.", icon: PawPrint },
  { title: "Recently viewed", copy: "Return to products you explored.", icon: Home }
];

export function AccountPage() {
  const cartCount = useCartStore((state) => state.items.length);
  const wishlistCount = useWishlistStore((state) => state.items.length);

  return (
    <CommerceFrame>
      <PremiumHero eyebrow="Customer Portal" title="A modern DOGIFY account dashboard." copy="A premium customer portal for orders, wishlist, addresses, pet profiles, and care continuity." icon={User} />
      <section className="section-shell grid gap-8 pb-24 lg:grid-cols-[280px_1fr] lg:items-start">
        <PremiumPanel className="sticky top-28 p-5">
          <div className="grid h-20 w-20 place-items-center rounded-[20px] bg-[#FF6B35] text-white">
            <User className="h-9 w-9" />
          </div>
          <h2 className="mt-5 text-2xl font-black text-slate-950">DOGIFY Parent</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">Customer account architecture ready for Supabase Auth and future admin workflows.</p>
          <div className="mt-6 grid gap-2">
            {["Overview", "Orders", "Wishlist", "Addresses", "Pet Profiles", "Profile"].map((item) => (
              <button key={item} type="button" className="rounded-[14px] bg-white px-4 py-3 text-left text-sm font-black text-slate-700 hover:text-[#FF6B35]">
                {item}
              </button>
            ))}
          </div>
        </PremiumPanel>
        <div className="grid gap-6">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { label: "Cart items", value: cartCount },
              { label: "Wishlist", value: wishlistCount },
              { label: "Pet profiles", value: 0 }
            ].map((metric) => (
              <PremiumPanel key={metric.label} className="p-6">
                <p className="text-4xl font-black text-slate-950">{metric.value}</p>
                <p className="mt-2 text-sm font-black uppercase tracking-[0.18em] text-[#FF6B35]">{metric.label}</p>
              </PremiumPanel>
            ))}
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {dashboardCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.article key={card.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: index * 0.05 }}>
                  <PremiumPanel className="p-6">
                    <Icon className="h-8 w-8 text-[#FF6B35]" />
                    <h2 className="mt-5 text-2xl font-black text-slate-950">{card.title}</h2>
                    <p className="mt-3 leading-7 text-slate-600">{card.copy}</p>
                  </PremiumPanel>
                </motion.article>
              );
            })}
          </div>
          <PremiumPanel className="p-6">
            <div className="flex items-center gap-3">
              <Heart className="h-7 w-7 text-[#FF6B35]" />
              <h2 className="text-2xl font-black text-slate-950">Order tracking timeline</h2>
            </div>
            <div className="mt-6 grid gap-4">
              {["Order requested", "DOGIFY confirms availability", "Packed for delivery", "Delivered with care"].map((step, index) => (
                <div key={step} className="flex items-center gap-4 rounded-[14px] bg-white p-4">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#FFB84D]/30 text-sm font-black text-[#FF6B35]">{index + 1}</span>
                  <p className="font-black text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </PremiumPanel>
        </div>
      </section>
    </CommerceFrame>
  );
}
