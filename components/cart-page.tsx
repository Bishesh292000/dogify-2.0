"use client";

import Link from "next/link";
import { ArrowRight, FileText, Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { CommerceFrame } from "@/components/commerce-frame";
import { PremiumHero, PremiumPanel } from "@/components/commerce-ui";
import { OptimizedImage } from "@/components/optimized-image";
import { saveOrder } from "@/lib/commerce-api";
import { getCartTotal, useCartStore } from "@/lib/cart-store";
import { dogifyContact } from "@/lib/contact";
import { createOrderWhatsAppMessage, createWhatsAppUrl, formatCurrency, generateBill, getItemSubtotal } from "@/lib/whatsapp";
import type { Json } from "@/lib/supabase/types";

export function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const total = useMemo(() => getCartTotal(items), [items]);
  const bill = useMemo(() => generateBill(items), [items]);

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const customerName = String(formData.get("customer_name") ?? "");
    const phone = String(formData.get("phone") ?? "");
    const email = String(formData.get("email") ?? "");
    const address = String(formData.get("address") ?? "");

    if (items.length === 0) {
      setStatus("error");
      setMessage("Add at least one product before placing an order.");
      return;
    }

    const { error } = await saveOrder({
      customer_name: customerName,
      phone,
      email,
      address,
      order_data_json: items.map((item) => ({
        product_id: Number(item.id),
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })) as Json,
      total_amount: total,
      status: "pending"
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    clearCart();
    setStatus("success");
    setMessage("Order saved. Opening WhatsApp with your bill.");
    event.currentTarget.reset();
    window.location.href = createWhatsAppUrl(
      createOrderWhatsAppMessage(items, {
        customerName,
        phone,
        address
      })
    );
  }

  return (
    <CommerceFrame>
      <PremiumHero
        eyebrow="DOGIFY Cart"
        title="One premium cart for every pet need."
        copy="Review products, track your shipping progress, and place a WhatsApp-confirmed DOGIFY order."
        icon={ShoppingBag}
      />
      <section className="section-shell pb-10">
          <PremiumPanel className="p-6">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-dogify-cyan">Support</p>
            <p className="mt-3 text-2xl font-black text-dogify-ink">Need help before checkout?</p>
            <div className="mt-5 grid gap-3">
              <a href={dogifyContact.whatsappHref} className="rounded-2xl bg-white/80 p-4 text-sm font-bold text-slate-600 hover:text-dogify-blue">
                WhatsApp {dogifyContact.whatsappNumber}
              </a>
              <a href={dogifyContact.emailHref} className="rounded-2xl bg-white/80 p-4 text-sm font-bold text-slate-600 hover:text-dogify-blue">
                {dogifyContact.email}
              </a>
            </div>
          </PremiumPanel>
      </section>

      <section className="section-shell grid gap-8 pb-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="grid gap-4">
          {items.length === 0 ? (
            <PremiumPanel className="p-10 text-center">
              <h2 className="text-3xl font-black text-dogify-ink">Your cart is empty.</h2>
              <p className="mt-3 text-slate-600">Start with food, accessories, or medicines.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {[
                  { label: "Food", href: "/food" },
                  { label: "Accessories", href: "/accessories" },
                  { label: "Medicines", href: "/medicines" }
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="rounded-[14px] bg-[#FF6B35] px-5 py-3 text-sm font-black text-white">
                    {link.label}
                  </Link>
                ))}
              </div>
            </PremiumPanel>
          ) : (
            items.map((item) => (
              <article key={item.id} className="grid gap-4 rounded-[20px] border border-white/60 bg-white/70 p-4 shadow-[0_24px_90px_rgba(15,23,42,0.10)] backdrop-blur-2xl sm:grid-cols-[120px_1fr_auto] sm:items-center">
                <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-slate-100">
                  {item.image_url ? (
                    <OptimizedImage src={item.image_url} alt={item.name} sizes="120px" />
                  ) : (
                    <div className="grid h-full place-items-center text-xs font-black text-slate-400">DOGIFY</div>
                  )}
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-dogify-cyan">{item.category}</p>
                  <h2 className="mt-2 text-2xl font-black text-dogify-ink">{item.name}</h2>
                  <p className="mt-2 text-xl font-black text-dogify-ink">{formatCurrency(item.price)}</p>
                  <p className="mt-1 text-sm font-bold text-slate-500">
                    Subtotal: {formatCurrency(getItemSubtotal(item))}
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:justify-end">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="grid h-10 w-10 place-items-center rounded-[14px] bg-white text-dogify-ink"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="grid h-10 min-w-12 place-items-center rounded-[14px] bg-slate-950 px-3 text-sm font-black text-white">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="grid h-10 w-10 place-items-center rounded-[14px] bg-white text-dogify-ink"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Remove product"
                    onClick={() => removeItem(item.id)}
                    className="grid h-10 w-10 place-items-center rounded-[14px] bg-red-50 text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))
          )}
        </div>

        <form onSubmit={submitOrder} className="rounded-[24px] border border-white/60 bg-white/70 p-6 shadow-[0_24px_90px_rgba(15,23,42,0.10)] backdrop-blur-2xl md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-dogify-cyan">Checkout</p>
          <div className="mt-4 flex items-end justify-between gap-4 border-b border-white/70 pb-5">
            <div>
              <p className="text-sm font-bold text-slate-500">Total amount</p>
              <p className="text-4xl font-black text-dogify-ink">{formatCurrency(total)}</p>
            </div>
            <p className="text-sm font-bold text-slate-500">{items.length} item types</p>
          </div>
          <div className="mt-5 rounded-[2rem] bg-white/80 p-5">
            <div className="mb-5 rounded-[14px] bg-[#FFB84D]/20 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-black text-slate-700">
                <Truck className="h-4 w-4 text-[#FF6B35]" />
                Shipping progress
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FFB84D]" />
              </div>
              <p className="mt-2 text-xs font-bold text-slate-500">Add confirmed address details for DOGIFY delivery coordination.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-dogify-ink text-white">
                <FileText className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-dogify-cyan">Auto Bill</p>
                <h2 className="text-xl font-black text-dogify-ink">DOGIFY ORDER</h2>
              </div>
            </div>
            <div className="mt-4 grid gap-2 text-sm font-bold text-slate-600">
              {bill.lines.length > 0 ? (
                bill.lines.map((line) => <p key={line}>{line}</p>)
              ) : (
                <p>Add products to generate a bill automatically.</p>
              )}
              <p className="border-t border-slate-200 pt-3 text-lg font-black text-dogify-ink">
                Total = {formatCurrency(bill.grandTotal)}
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4">
            {[
              { name: "customer_name", label: "Customer name", type: "text" },
              { name: "phone", label: "Phone", type: "tel" },
              { name: "email", label: "Email", type: "email" }
            ].map((field) => (
              <label key={field.name} className="grid gap-2 text-sm font-bold text-slate-600">
                {field.label}
                <input
                  required
                  name={field.name}
                  type={field.type}
                  className="h-12 rounded-[14px] border border-slate-200 bg-white/80 px-4 outline-none transition focus:border-[#FF6B35]"
                />
              </label>
            ))}
            <label className="grid gap-2 text-sm font-bold text-slate-600">
              Address
              <textarea
                required
                name="address"
                className="min-h-28 rounded-[14px] border border-slate-200 bg-white/80 p-4 outline-none transition focus:border-[#FF6B35]"
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={status === "saving"}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-[14px] bg-[#FF6B35] px-6 py-3 text-sm font-black text-white shadow-premium transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "saving" ? "Saving Order..." : "Order Now"} <ArrowRight className="h-4 w-4" />
          </button>
          {message ? (
            <p className={`mt-4 rounded-2xl p-4 text-sm font-bold ${status === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
              {message}
            </p>
          ) : null}
          <Link href="/checkout" className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-[14px] bg-slate-950 text-sm font-black text-white">
            Continue To Premium Checkout
          </Link>
        </form>
      </section>
    </CommerceFrame>
  );
}
