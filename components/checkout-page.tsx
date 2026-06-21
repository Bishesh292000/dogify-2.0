"use client";

import { ArrowRight, CreditCard, Home, ShieldCheck, Truck } from "lucide-react";
import { FormEvent, useState } from "react";
import { CommerceFrame } from "@/components/commerce-frame";
import { PremiumHero, PremiumPanel } from "@/components/commerce-ui";
import { saveOrder } from "@/lib/commerce-api";
import { getCartTotal, useCartStore } from "@/lib/cart-store";
import { createOrderWhatsAppMessage, createWhatsAppUrl, formatCurrency } from "@/lib/whatsapp";
import type { Json } from "@/lib/supabase/types";

const steps = ["Address", "Confirm", "WhatsApp"];

export function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [message, setMessage] = useState("");
  const { items, clearCart } = useCartStore();
  const total = getCartTotal(items);

  async function submitCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    const formData = new FormData(event.currentTarget);
    const customerName = String(formData.get("customer_name") ?? "");
    const phone = String(formData.get("phone") ?? "");
    const email = String(formData.get("email") ?? "");
    const address = String(formData.get("address") ?? "");

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
    window.location.href = createWhatsAppUrl(createOrderWhatsAppMessage(items, { customerName, phone, address }));
  }

  return (
    <CommerceFrame>
      <PremiumHero eyebrow="Premium Checkout" title="A clean checkout that ends in WhatsApp confirmation." copy="DOGIFY does not collect online payments yet. We save the order and open WhatsApp for availability confirmation." icon={CreditCard} />
      <section className="section-shell grid gap-8 pb-24 lg:grid-cols-[1fr_420px] lg:items-start">
        <form onSubmit={submitCheckout} className="grid gap-6">
          <PremiumPanel className="p-6">
            <div className="flex flex-wrap gap-3">
              {steps.map((label, index) => (
                <button key={label} type="button" onClick={() => setStep(index)} className={`rounded-[14px] px-4 py-3 text-sm font-black ${step === index ? "bg-[#FF6B35] text-white" : "bg-white text-slate-600"}`}>
                  {index + 1}. {label}
                </button>
              ))}
            </div>
          </PremiumPanel>
          <PremiumPanel className="p-6 md:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { name: "customer_name", label: "Customer name", type: "text" },
                { name: "phone", label: "Phone number", type: "tel" },
                { name: "email", label: "Email", type: "email" }
              ].map((field) => (
                <label key={field.name} className="grid gap-2 text-sm font-black text-slate-600">
                  {field.label}
                  <input required name={field.name} type={field.type} className="h-12 rounded-[14px] border border-white/70 bg-white px-4 outline-none focus:border-[#FF6B35]" />
                </label>
              ))}
            </div>
            <label className="mt-5 grid gap-2 text-sm font-black text-slate-600">
              Delivery address
              <textarea required name="address" className="min-h-32 rounded-[14px] border border-white/70 bg-white p-4 outline-none focus:border-[#FF6B35]" />
            </label>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[Home, Truck, ShieldCheck].map((Icon, index) => (
                <div key={index} className="rounded-[14px] bg-white p-4">
                  <Icon className="h-5 w-5 text-[#22C55E]" />
                  <p className="mt-2 text-sm font-black text-slate-700">Trusted step</p>
                </div>
              ))}
            </div>
            <button disabled={status === "saving" || items.length === 0} className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-[14px] bg-[#FF6B35] px-6 text-sm font-black text-white disabled:opacity-50">
              {status === "saving" ? "Saving Order..." : "Confirm On WhatsApp"} <ArrowRight className="h-4 w-4" />
            </button>
            {message ? <p className="mt-4 rounded-[14px] bg-red-50 p-4 text-sm font-black text-red-700">{message}</p> : null}
          </PremiumPanel>
        </form>
        <PremiumPanel className="sticky top-28 p-6">
          <h2 className="text-2xl font-black text-slate-950">Order summary</h2>
          <div className="mt-5 grid gap-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between gap-4 rounded-[14px] bg-white p-4 text-sm font-bold">
                <span>{item.name} x{item.quantity}</span>
                <span>{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-slate-200 pt-5">
            <p className="flex justify-between text-2xl font-black text-slate-950">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </p>
          </div>
        </PremiumPanel>
      </section>
    </CommerceFrame>
  );
}
