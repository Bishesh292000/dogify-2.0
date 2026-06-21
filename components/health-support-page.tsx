"use client";

import { ArrowRight, HeartPulse, MessageCircleHeart, Stethoscope } from "lucide-react";
import { FormEvent, useState } from "react";
import { CommerceFrame } from "@/components/commerce-frame";
import { OptimizedImage } from "@/components/optimized-image";
import { saveHealthSupportRequest } from "@/lib/commerce-api";
import { dogifyContact } from "@/lib/contact";

const supportTypes = ["Vet Consultation", "Diet Guidance", "Emergency Assistance"];

export function HealthSupportPage() {
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setMessage("");

    const formData = new FormData(event.currentTarget);

    const issue = [
      `Support type: ${String(formData.get("support_type") ?? "")}`,
      `Pet type: ${String(formData.get("pet_type") ?? "")}`,
      `Details: ${String(formData.get("issue") ?? "")}`
    ].join("\n");

    const { error } = await saveHealthSupportRequest({
      customer_name: String(formData.get("customer_name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      issue
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("success");
    setMessage("Health support request saved. DOGIFY will contact you shortly.");
    event.currentTarget.reset();
  }

  return (
    <CommerceFrame>
      <section className="section-shell grid min-h-[680px] items-center gap-10 pb-16 pt-32 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-bold text-dogify-blue shadow-sm backdrop-blur">
            <HeartPulse className="h-4 w-4 text-dogify-green" />
            Health Support
          </div>
          <h1 className="text-balance text-5xl font-black tracking-tight text-dogify-ink sm:text-6xl lg:text-7xl">
            Pet health guidance when you need clarity.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-600">
            Request vet consultation, diet guidance, or emergency assistance through DOGIFY.
          </p>
          <a
            href={dogifyContact.whatsappHref}
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-dogify-green px-6 py-3 text-sm font-black text-white shadow-premium transition hover:-translate-y-0.5"
          >
            WhatsApp Support <MessageCircleHeart className="h-4 w-4" />
          </a>
        </div>
        <div className="relative min-h-[460px] overflow-hidden rounded-[3rem] shadow-premium">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=86"
            alt="DOGIFY health support"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dogify-ink via-dogify-ink/20 to-transparent" />
          <div className="glass-dark absolute bottom-5 left-5 right-5 rounded-[2rem] p-6 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-dogify-green">{dogifyContact.email}</p>
            <p className="mt-3 text-3xl font-black">Vet, diet, and urgent care direction</p>
          </div>
        </div>
      </section>

      <section className="section-shell py-14">
        <div className="grid gap-5 md:grid-cols-3">
          {supportTypes.map((type) => (
            <article key={type} className="glass rounded-[2rem] p-7">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-dogify-blue text-white">
                <Stethoscope className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-2xl font-black text-dogify-ink">{type}</h2>
              <p className="mt-3 leading-7 text-slate-600">Structured support details saved for fast DOGIFY follow-up.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell grid gap-8 pb-24 pt-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="glass rounded-[2rem] p-7">
          <HeartPulse className="h-10 w-10 text-dogify-green" />
          <h2 className="mt-5 text-3xl font-black text-dogify-ink">Send a health request.</h2>
          <p className="mt-4 leading-8 text-slate-600">
            DOGIFY health support does not replace emergency veterinary care, but it helps pet parents move faster and more calmly.
          </p>
        </div>
        <form onSubmit={submitRequest} className="glass rounded-[2.5rem] p-6 md:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { name: "customer_name", label: "Customer name", type: "text" },
              { name: "phone", label: "Phone number", type: "tel" },
              { name: "pet_type", label: "Pet type", type: "text" }
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
            <label className="grid gap-2 text-sm font-bold text-slate-600">
              Support type
              <select
                required
                name="support_type"
                className="h-12 rounded-2xl border border-slate-200 bg-white/80 px-4 outline-none transition focus:border-dogify-cyan"
              >
                <option value="">Select support</option>
                {supportTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="mt-5 grid gap-2 text-sm font-bold text-slate-600">
            Issue or request details
            <textarea
              required
              name="issue"
              className="min-h-36 rounded-2xl border border-slate-200 bg-white/80 p-4 outline-none transition focus:border-dogify-cyan"
            />
          </label>
          <button
            type="submit"
            disabled={status === "saving"}
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-dogify-blue px-6 py-3 text-sm font-black text-white shadow-premium transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {status === "saving" ? "Saving Request..." : "Save Request"} <ArrowRight className="h-4 w-4" />
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
