"use client";

import Link from "next/link";
import { Heart, Menu, PawPrint, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { dogifyContact } from "@/lib/contact";
import { useCartStore } from "@/lib/cart-store";

const links = [
  { label: "Food", href: "/food" },
  { label: "Accessories", href: "/accessories" },
  { label: "Medicines", href: "/medicines" },
  { label: "Health", href: "/health-support" },
  { label: "Search", href: "/search" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export function CommerceFrame({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const cartCount = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8FAFC]">
      <div className="noise" />
      <nav className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
        <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 rounded-[20px] border border-white/70 bg-white/70 px-4 shadow-[0_20px_70px_rgba(15,23,42,0.12)] backdrop-blur-2xl md:px-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-[14px] bg-[#FF6B35] text-white shadow-[0_18px_40px_rgba(255,107,53,0.28)]">
              <PawPrint className="h-5 w-5" />
            </span>
            <span className="text-lg font-black tracking-tight text-dogify-ink">DOGIFY</span>
          </Link>
          <div className="hidden items-center gap-5 text-sm font-semibold text-slate-600 lg:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-[#FF6B35]">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/search"
              aria-label="Search DOGIFY"
              className="hidden h-11 w-11 place-items-center rounded-[14px] bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-[#FF6B35] sm:grid"
            >
              <Search className="h-5 w-5" />
            </Link>
            <Link
              href="/wishlist"
              aria-label="Open wishlist"
              className="hidden h-11 w-11 place-items-center rounded-[14px] bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-[#FF6B35] sm:grid"
            >
              <Heart className="h-5 w-5" />
            </Link>
            <Link
              href="/account"
              aria-label="Open account"
              className="hidden h-11 w-11 place-items-center rounded-[14px] bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-[#FF6B35] sm:grid"
            >
              <User className="h-5 w-5" />
            </Link>
            <Link
              href="/cart"
              aria-label="Open cart"
              className="relative grid h-11 w-11 place-items-center rounded-[14px] bg-slate-950 text-white shadow-lg transition hover:-translate-y-0.5"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 ? (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#FF6B35] px-1 text-[11px] font-black text-white">
                  {cartCount}
                </span>
              ) : null}
            </Link>
            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => setOpen((value) => !value)}
              className="grid h-11 w-11 place-items-center rounded-[14px] border border-white/70 bg-white/70 text-dogify-ink lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open ? (
          <div className="mx-auto mt-3 grid max-w-6xl gap-2 rounded-[20px] border border-white/70 bg-white/80 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl lg:hidden">
            {[...links, { label: "Wishlist", href: "/wishlist" }, { label: "Account", href: "/account" }, { label: "Cart", href: "/cart" }].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-[14px] px-4 py-3 text-sm font-bold text-slate-700 hover:bg-white/70 hover:text-[#FF6B35]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ) : null}
      </nav>
      {children}
      <footer className="border-t border-slate-200/70 bg-white/60 py-12 backdrop-blur">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-dogify-blue text-white">
                <PawPrint className="h-5 w-5" />
              </span>
              <span className="text-xl font-black text-dogify-ink">DOGIFY</span>
            </Link>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
              Everything Your Pet Needs. One Trusted Platform.
            </p>
            <div className="mt-5 grid gap-2 text-sm font-bold text-slate-600">
              <a href={dogifyContact.whatsappHref} className="hover:text-dogify-blue">
                WhatsApp: {dogifyContact.whatsappNumber}
              </a>
              <a href={dogifyContact.emailHref} className="hover:text-dogify-blue">
                Email: {dogifyContact.email}
              </a>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-bold text-slate-600 transition hover:text-dogify-blue">
                {link.label}
              </Link>
            ))}
            <Link href="/cart" className="text-sm font-bold text-slate-600 transition hover:text-dogify-blue">
              Cart
            </Link>
            <Link href="/wishlist" className="text-sm font-bold text-slate-600 transition hover:text-[#FF6B35]">
              Wishlist
            </Link>
            <Link href="/checkout" className="text-sm font-bold text-slate-600 transition hover:text-[#FF6B35]">
              Checkout
            </Link>
            <Link href="/account" className="text-sm font-bold text-slate-600 transition hover:text-[#FF6B35]">
              Account
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
