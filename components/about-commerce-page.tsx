import { HeartHandshake, PawPrint, ShieldCheck, Sparkles } from "lucide-react";
import { CommerceFrame } from "@/components/commerce-frame";

export function AboutCommercePage() {
  return (
    <CommerceFrame>
      <section className="section-shell grid min-h-[680px] items-center gap-10 pb-16 pt-32 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-bold text-dogify-blue shadow-sm backdrop-blur">
            <PawPrint className="h-4 w-4 text-dogify-green" />
            About DOGIFY
          </div>
          <h1 className="text-balance text-5xl font-black tracking-tight text-dogify-ink sm:text-6xl lg:text-7xl">
            India's most trusted pet-care ecosystem.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-600">
            DOGIFY brings food, accessories, grooming, medicines, and health support into one dependable platform for modern pet parents.
          </p>
        </div>
        <div className="relative min-h-[460px] overflow-hidden rounded-[3rem] shadow-premium">
          <img
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=86"
            alt="DOGIFY pet-care ecosystem"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dogify-ink via-dogify-ink/20 to-transparent" />
          <div className="glass-dark absolute bottom-5 left-5 right-5 rounded-[2rem] p-6 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-dogify-green">Mission</p>
            <p className="mt-3 text-3xl font-black">Create India's most trusted pet-care ecosystem.</p>
          </div>
        </div>
      </section>

      <section className="section-shell grid gap-5 pb-24 pt-10 md:grid-cols-3">
        {[
          { title: "Trust before transaction", copy: "Every interaction should make care easier to understand.", icon: ShieldCheck },
          { title: "Premium but warm", copy: "DOGIFY feels polished, friendly, and useful every day.", icon: HeartHandshake },
          { title: "Connected care", copy: "Products, services, bookings, and support work around the same pet parent journey.", icon: Sparkles }
        ].map((value) => {
          const Icon = value.icon;
          return (
            <article key={value.title} className="glass rounded-[2rem] p-7">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-dogify-blue text-white">
                <Icon className="h-6 w-6" />
              </span>
              <h2 className="mt-6 text-2xl font-black text-dogify-ink">{value.title}</h2>
              <p className="mt-4 leading-7 text-slate-600">{value.copy}</p>
            </article>
          );
        })}
      </section>
    </CommerceFrame>
  );
}
