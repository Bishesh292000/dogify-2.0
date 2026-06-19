"use client";

import { ArrowRight, CalendarHeart, MessageCircleHeart, Scissors } from "lucide-react";
import { FormEvent, useState } from "react";
import { CommerceFrame } from "@/components/commerce-frame";
import { saveGroomingBooking } from "@/lib/commerce-api";
import { dogifyContact } from "@/lib/contact";

const groomingServices = ["Bathing", "Hair Trimming", "Nail Clipping", "Spa Treatment", "Home Visit Grooming"];

export function GroomingPage() {
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setMessage("");

    const formData = new FormData(event.currentTarget);

    const { error } = await saveGroomingBooking({
      customer_name: String(formData.get("customer_name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      pet_type: String(formData.get("pet_type") ?? ""),
      service: String(formData.get("service") ?? ""),
      preferred_date: String(formData.get("preferred_date") ?? ""),
      status: "new"
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("success");
    setMessage("Booking saved. DOGIFY will confirm the grooming slot shortly.");
    event.currentTarget.reset();
  }

  return (
    <CommerceFrame>
      <section className="section-shell grid min-h-[680px] items-center gap-10 pb-16 pt-32 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-bold text-dogify-blue shadow-sm backdrop-blur">
            <Scissors className="h-4 w-4 text-dogify-green" />
            Luxury Grooming
          </div>
          <h1 className="text-balance text-5xl font-black tracking-tight text-dogify-ink sm:text-6xl lg:text-7xl">
            Spa-grade grooming with calm, trained care.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-600">
            Book bathing, trimming, nail care, spa treatment, and home visit grooming with DOGIFY.
          </p>
          <a
            href={dogifyContact.whatsappHref}
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-dogify-green px-6 py-3 text-sm font-black text-white shadow-premium transition hover:-translate-y-0.5"
          >
            WhatsApp Booking <MessageCircleHeart className="h-4 w-4" />
          </a>
        </div>
        <div className="relative min-h-[460px] overflow-hidden rounded-[3rem] shadow-premium">
          <img
            loading="lazy"
            src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=86"
            alt="DOGIFY grooming service"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dogify-ink via-dogify-ink/20 to-transparent" />
          <div className="glass-dark absolute bottom-5 left-5 right-5 rounded-[2rem] p-6 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-dogify-green">{dogifyContact.whatsappNumber}</p>
            <p className="mt-3 text-3xl font-black">Home visit grooming available</p>
          </div>
        </div>
      </section>

      <section className="section-shell py-14">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {groomingServices.map((service) => (
            <article key={service} className="glass rounded-[2rem] p-6">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-dogify-blue text-white">
                <Scissors className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-xl font-black text-dogify-ink">{service}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">Premium hygiene, careful handling, and clear post-care guidance.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell grid gap-8 pb-24 pt-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="glass rounded-[2rem] p-7">
          <CalendarHeart className="h-10 w-10 text-dogify-green" />
          <h2 className="mt-5 text-3xl font-black text-dogify-ink">Book a grooming slot.</h2>
          <p className="mt-4 leading-8 text-slate-600">
            Submit your preferred date and service. DOGIFY will confirm availability through WhatsApp or phone.
          </p>
        </div>
        <form onSubmit={submitBooking} className="glass rounded-[2.5rem] p-6 md:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { name: "customer_name", label: "Customer name", type: "text" },
              { name: "phone", label: "Phone number", type: "tel" },
              { name: "pet_type", label: "Pet type", type: "text" },
              { name: "preferred_date", label: "Preferred date", type: "date" }
            ].map((field) => (
              <label key={field.name} className="grid gap-2 text-sm font-bold text-slate-600">
                {field.label}
                <input
                  required
                  name={field.name}
                  type={field.type}
                  className="h-12 rounded-2xl border border-slate-200 bg-white/80 px-4 outline-none transition focus:border-dogify-cyan"
                />
              </label>
            ))}
          </div>
          <label className="mt-5 grid gap-2 text-sm font-bold text-slate-600">
            Service
            <select
              required
              name="service"
              className="h-12 rounded-2xl border border-slate-200 bg-white/80 px-4 outline-none transition focus:border-dogify-cyan"
            >
              <option value="">Select service</option>
              {groomingServices.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            disabled={status === "saving"}
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-dogify-blue px-6 py-3 text-sm font-black text-white shadow-premium transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {status === "saving" ? "Saving Booking..." : "Save Booking"} <ArrowRight className="h-4 w-4" />
          </button>
          {message ? (
            <p className={`mt-4 rounded-2xl p-4 text-sm font-bold ${status === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
              {message}
            </p>
          ) : null}
        </form>
      </section>
    </CommerceFrame>
  );
}
