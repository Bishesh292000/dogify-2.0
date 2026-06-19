"use client";

import { ArrowRight, Mail, MessageCircleHeart, Phone, Send } from "lucide-react";
import { CommerceFrame } from "@/components/commerce-frame";
import { dogifyContact } from "@/lib/contact";

export function ContactPage() {
  return (
    <CommerceFrame>
      <section className="section-shell grid min-h-[680px] items-center gap-10 pb-16 pt-32 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-bold text-dogify-blue shadow-sm backdrop-blur">
            <Mail className="h-4 w-4 text-dogify-green" />
            Contact DOGIFY
          </div>
          <h1 className="text-balance text-5xl font-black tracking-tight text-dogify-ink sm:text-6xl lg:text-7xl">
            Tell us what your pet needs next.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-600">
            Food, accessories, grooming, medicines, health support, or partnership conversations all start here.
          </p>
        </div>
        <div className="relative min-h-[460px] overflow-hidden rounded-[3rem] shadow-premium">
          <img
            src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=86"
            alt="DOGIFY contact support"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dogify-ink via-dogify-ink/20 to-transparent" />
          <div className="glass-dark absolute bottom-5 left-5 right-5 rounded-[2rem] p-6 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-dogify-green">Everything Your Pet Needs</p>
            <p className="mt-3 text-3xl font-black">One trusted platform</p>
          </div>
        </div>
      </section>

      <section className="section-shell grid gap-8 pb-24 pt-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          {[
            {
              title: "WhatsApp Care",
              copy: dogifyContact.whatsappNumber,
              href: dogifyContact.whatsappHref,
              icon: MessageCircleHeart
            },
            {
              title: "Email",
              copy: dogifyContact.email,
              href: dogifyContact.emailHref,
              icon: Mail
            },
            {
              title: "Booking Assistance",
              copy: "Grooming, health support, and product guidance",
              href: dogifyContact.whatsappHref,
              icon: Phone
            }
          ].map((channel) => {
            const Icon = channel.icon;
            return (
              <a key={channel.title} href={channel.href} className="glass flex items-start gap-4 rounded-[2rem] p-6 transition hover:-translate-y-1">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-dogify-blue text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-xl font-black text-dogify-ink">{channel.title}</span>
                  <span className="mt-2 block text-sm font-bold leading-6 text-slate-600">{channel.copy}</span>
                </span>
              </a>
            );
          })}
        </div>
        <form className="glass rounded-[2.5rem] p-6 md:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {["Your name", "Phone number", "Email address", "Pet type"].map((label) => (
              <label key={label} className="grid gap-2 text-sm font-bold text-slate-600">
                {label}
                <input className="h-12 rounded-2xl border border-slate-200 bg-white/80 px-4 outline-none transition focus:border-dogify-cyan" placeholder={label} />
              </label>
            ))}
          </div>
          <label className="mt-5 grid gap-2 text-sm font-bold text-slate-600">
            What do you need?
            <textarea className="min-h-36 rounded-2xl border border-slate-200 bg-white/80 p-4 outline-none transition focus:border-dogify-cyan" placeholder="Food, grooming, medicines, health support, or something else..." />
          </label>
          <a
            href={dogifyContact.emailHref}
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-dogify-blue px-6 py-3 text-sm font-bold text-white shadow-premium transition hover:-translate-y-0.5"
          >
            Email DOGIFY <Send className="h-4 w-4" />
          </a>
          <a
            href={dogifyContact.whatsappHref}
            className="ml-0 mt-3 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-dogify-green px-6 py-3 text-sm font-bold text-white shadow-premium transition hover:-translate-y-0.5 sm:ml-3"
          >
            WhatsApp <ArrowRight className="h-4 w-4" />
          </a>
        </form>
      </section>
    </CommerceFrame>
  );
}
