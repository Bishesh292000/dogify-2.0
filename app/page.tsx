"use client";

import {
  ArrowRight,
  Bath,
  Beef,
  Bone,
  CalendarHeart,
  ChevronRight,
  Dog,
  HeartPulse,
  Home,
  MessageCircleHeart,
  PackageCheck,
  PawPrint,
  Pill,
  Scissors,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Stethoscope,
  Syringe,
  Truck,
  Utensils,
  Wifi
} from "lucide-react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef } from "react";

type CardItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const services: CardItem[] = [
  {
    title: "Food",
    description: "Breed-aware nutrition, daily meals, treats, and supplements from trusted labels.",
    icon: Beef
  },
  {
    title: "Accessories",
    description: "Premium beds, harnesses, toys, bowls, travel gear, and essentials for every routine.",
    icon: ShoppingBag
  },
  {
    title: "Grooming",
    description: "At-home and studio grooming with trained experts, spa-grade products, and clean handling.",
    icon: Scissors
  },
  {
    title: "Medicines",
    description: "Supplements, tick and flea care, first aid, prescription support, and refill guidance.",
    icon: Pill
  },
  {
    title: "Health Support",
    description: "Vet consultation, WhatsApp care, diet guidance, reminders, and emergency assistance.",
    icon: HeartPulse
  }
];

const trustMetrics = [
  { value: 1000, suffix: "+", label: "Happy Pets" },
  { value: 500, suffix: "+", label: "Products" },
  { value: 24, suffix: "/7", label: "Health Support" }
];

const trustBadges = [
  { title: "Fast Delivery", icon: Truck },
  { title: "Certified Groomers", icon: ShieldCheck },
  { title: "Trusted Care", icon: HeartPulse }
];

const foodProducts = [
  {
    name: "Dog Food",
    detail: "High-protein everyday nutrition",
    color: "from-blue-900 to-cyan-500",
    icon: Dog
  },
  {
    name: "Cat Food",
    detail: "Balanced meals for indoor cats",
    color: "from-cyan-500 to-emerald-400",
    icon: PawPrint
  },
  {
    name: "Treats",
    detail: "Training bites and clean rewards",
    color: "from-emerald-500 to-lime-400",
    icon: Bone
  },
  {
    name: "Supplements",
    detail: "Coat, gut, joint, and immunity care",
    color: "from-slate-900 to-blue-700",
    icon: Pill
  }
];

const accessories = [
  "Beds",
  "Toys",
  "Harnesses",
  "Bowls",
  "Travel Gear"
];

const groomingServices = [
  { title: "Bathing", icon: Bath },
  { title: "Hair Trimming", icon: Scissors },
  { title: "Nail Clipping", icon: Sparkles },
  { title: "Spa Treatment", icon: Star },
  { title: "Home Visit Grooming", icon: Home }
];

const medicineItems = [
  { title: "Supplements", icon: Pill },
  { title: "Tick & Flea Care", icon: ShieldCheck },
  { title: "Prescription Medicines", icon: Stethoscope },
  { title: "First Aid", icon: PackageCheck },
  { title: "Vaccination Support", icon: Syringe }
];

const healthNodes = [
  { title: "Vet Consultation", icon: Stethoscope, position: "left-2 top-10 md:left-12 md:top-16" },
  { title: "WhatsApp Support", icon: MessageCircleHeart, position: "right-2 top-12 md:right-12 md:top-20" },
  { title: "Diet Guidance", icon: Utensils, position: "left-4 bottom-20 md:left-20 md:bottom-24" },
  { title: "Emergency Assistance", icon: Wifi, position: "right-4 bottom-20 md:right-16 md:bottom-24" },
  { title: "Health Tracking", icon: HeartPulse, position: "left-1/2 top-2 -translate-x-1/2" },
  { title: "Vaccination Reminders", icon: CalendarHeart, position: "left-1/2 bottom-2 -translate-x-1/2" }
];

const testimonials = [
  {
    quote:
      "DOGIFY made grooming and medicine refills feel effortless. The team actually remembers my beagle's needs.",
    name: "Aarav Mehta",
    pet: "Parent to Bruno"
  },
  {
    quote:
      "The health support is what sold me. Fast replies, proper guidance, and no panic when my cat skipped meals.",
    name: "Neha Iyer",
    pet: "Parent to Miso"
  },
  {
    quote:
      "It feels premium without becoming cold. Great products, clean grooming, and delivery that lands on time.",
    name: "Rhea Kapoor",
    pet: "Parent to Simba"
  }
];

const heroImage =
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=86";
const groomingImage =
  "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=86";
const medicineImage =
  "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=86";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1.8, bounce: 0 });
  const rounded = useTransform(spring, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, motionValue, value]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${latest}${suffix}`;
      }
    });
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

function SectionHeader({
  eyebrow,
  title,
  copy,
  align = "center"
}: {
  eyebrow: string;
  title: string;
  copy: string;
  align?: "center" | "left";
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ duration: 0.7 }}
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}
    >
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-dogify-cyan">{eyebrow}</p>
      <h2 className="text-balance text-4xl font-black tracking-tight text-dogify-ink md:text-6xl">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-8 text-slate-600">{copy}</p>
    </motion.div>
  );
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-dogify-blue px-6 py-3 text-sm font-bold text-white shadow-premium transition hover:-translate-y-0.5 hover:bg-slate-950">
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
    </button>
  );
}

function SecondaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-slate-200 bg-white/70 px-6 py-3 text-sm font-bold text-dogify-ink shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-dogify-cyan hover:text-dogify-blue">
      {children}
      <CalendarHeart className="h-4 w-4" />
    </button>
  );
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="noise" />
      <nav className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
        <div className="glass mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full px-5">
          <a href="#hero" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-dogify-blue text-white shadow-glow">
              <PawPrint className="h-5 w-5" />
            </span>
            <span className="text-lg font-black tracking-tight text-dogify-ink">DOGIFY</span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
            <a href="#services" className="transition hover:text-dogify-blue">Services</a>
            <a href="#food" className="transition hover:text-dogify-blue">Food</a>
            <a href="#grooming" className="transition hover:text-dogify-blue">Grooming</a>
            <a href="#health" className="transition hover:text-dogify-blue">Health</a>
          </div>
          <a
            href="#cta"
            className="inline-flex h-11 items-center justify-center rounded-full bg-dogify-green px-5 text-sm font-black text-white shadow-lg shadow-green-500/20 transition hover:-translate-y-0.5"
          >
            Get Started
          </a>
        </div>
      </nav>

      <section id="hero" className="section-shell grid min-h-screen items-center gap-12 pb-16 pt-32 lg:grid-cols-[0.9fr_1.1fr] lg:pt-24">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8 }}>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-bold text-dogify-blue shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-dogify-green" />
            India&apos;s premium pet-care ecosystem
          </div>
          <h1 className="text-balance text-5xl font-black tracking-tight text-dogify-ink sm:text-6xl lg:text-7xl">
            Everything Your Pet Needs.
            <span className="block bg-gradient-to-r from-dogify-blue via-dogify-cyan to-dogify-green bg-clip-text text-transparent">
              One Trusted Platform.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-600">
            Premium Food, Accessories, Grooming, Medicines and Expert Health Support.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <PrimaryButton>Explore Services</PrimaryButton>
            <SecondaryButton>Book Grooming</SecondaryButton>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {["Food", "Grooming", "24/7 Care"].map((item) => (
              <div key={item} className="glass rounded-3xl px-4 py-4 text-center">
                <p className="text-sm font-black text-dogify-ink">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="hero-visual relative min-h-[520px]">
          <motion.div
            className="pet-orbit relative mx-auto h-[520px] max-w-[620px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            <div className="absolute inset-8 rounded-[3rem] bg-gradient-to-br from-dogify-blue/20 via-dogify-cyan/20 to-dogify-green/20 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[3.2rem] border border-white/60 bg-white shadow-premium">
              <img src={heroImage} alt="Happy golden dog representing DOGIFY pet care" className="h-full w-full object-cover" />
            </div>
            {[
              { label: "Food Packs", icon: Beef, className: "left-0 top-16", rotate: "-7deg" },
              { label: "Grooming", icon: Scissors, className: "right-2 top-20", rotate: "6deg" },
              { label: "Medicines", icon: Pill, className: "bottom-24 left-4", rotate: "5deg" },
              { label: "Vet Icons", icon: Stethoscope, className: "bottom-16 right-7", rotate: "-5deg" },
              { label: "Pet Toys", icon: Bone, className: "left-1/2 top-0 -translate-x-1/2", rotate: "3deg" }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  style={{ "--rotate": item.rotate } as React.CSSProperties}
                  className={`floating-card glass absolute ${index % 2 ? "float-delay" : "float-slow"} ${item.className} flex items-center gap-3 rounded-3xl px-4 py-3`}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-dogify-blue to-dogify-cyan text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-black text-dogify-ink">{item.label}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section id="services" className="section-shell py-24">
        <SectionHeader
          eyebrow="Services Ecosystem"
          title="One connected care layer for every pet need."
          copy="DOGIFY brings everyday essentials, expert care, and health confidence into a single premium experience."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                whileHover={{ y: -10, rotateX: 3 }}
                className="glass group rounded-[2rem] p-6"
              >
                <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-dogify-blue text-white shadow-glow transition group-hover:scale-110 group-hover:bg-dogify-cyan">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-black text-dogify-ink">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{service.description}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="rounded-[2.5rem] bg-dogify-ink p-6 text-white shadow-premium md:p-10">
          <div className="grid gap-5 lg:grid-cols-6">
            {trustMetrics.map((metric) => (
              <div key={metric.label} className="glass-dark rounded-[2rem] p-7 lg:col-span-1">
                <p className="text-4xl font-black">
                  <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-300">{metric.label}</p>
              </div>
            ))}
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div key={badge.title} className="glass-dark flex items-center gap-4 rounded-[2rem] p-7 lg:col-span-1">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-dogify-green">
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="text-lg font-black">{badge.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="food" className="section-shell grid gap-12 py-24 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <SectionHeader
          eyebrow="Pet Food"
          title="Nutrition that feels curated, not crowded."
          copy="Explore food, treats, and supplements through a premium shelf built around trust, quality, and daily wellness."
          align="left"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {foodProducts.map((product, index) => {
            const Icon = product.icon;
            return (
              <motion.article
                key={product.name}
                initial={{ opacity: 0, y: 34, rotate: index % 2 ? 2 : -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="relative min-h-64 overflow-hidden rounded-[2rem] bg-white p-6 shadow-premium"
              >
                <div className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-br ${product.color}`} />
                <div className="relative grid h-20 w-20 place-items-center rounded-[1.6rem] bg-white text-dogify-blue shadow-lg">
                  <Icon className="h-9 w-9" />
                </div>
                <div className="relative mt-16">
                  <h3 className="text-2xl font-black text-dogify-ink">{product.name}</h3>
                  <p className="mt-2 text-slate-600">{product.detail}</p>
                  <button className="mt-5 inline-flex items-center gap-2 text-sm font-black text-dogify-blue">
                    View range <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="overflow-hidden py-24">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Accessories"
            title="Objects your pet uses daily, elevated."
            copy="Beds, toys, harnesses, bowls, and travel gear presented with the feel of a modern lifestyle brand."
          />
        </div>
        <div className="mt-12 flex w-max gap-5 marquee-track">
          {[...accessories, ...accessories, ...accessories].map((item, index) => (
            <motion.div
              key={`${item}-${index}`}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass flex h-56 w-72 shrink-0 flex-col justify-between rounded-[2rem] p-6"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-dogify-cyan text-white">
                {index % 2 ? <Bone className="h-7 w-7" /> : <PackageCheck className="h-7 w-7" />}
              </span>
              <div>
                <h3 className="text-3xl font-black text-dogify-ink">{item}</h3>
                <p className="mt-2 text-sm text-slate-600">Premium build, pet-safe materials, clean everyday design.</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="grooming" className="section-shell grid gap-10 py-24 lg:grid-cols-2 lg:items-center">
        <div className="relative min-h-[560px] overflow-hidden rounded-[2.5rem] shadow-premium">
          <img src={groomingImage} alt="Premium dog grooming experience" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dogify-ink via-dogify-ink/20 to-transparent" />
          <div className="glass-dark absolute bottom-5 left-5 right-5 rounded-[2rem] p-6 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-dogify-cyan">Luxury Grooming</p>
            <h3 className="mt-3 text-3xl font-black">Spa-grade care, trained hands.</h3>
          </div>
        </div>
        <div>
          <SectionHeader
            eyebrow="Grooming"
            title="A cleaner, calmer grooming ritual."
            copy="From bathing to full spa treatments, DOGIFY grooming is built for comfort, hygiene, and visible confidence."
            align="left"
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {groomingServices.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="glass flex items-center gap-4 rounded-3xl p-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-dogify-green text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="font-black text-dogify-ink">{item.title}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-9">
            <PrimaryButton>Book Grooming</PrimaryButton>
          </div>
        </div>
      </section>

      <section className="section-shell py-24">
        <div className="grid gap-8 rounded-[2.5rem] bg-white p-6 shadow-premium lg:grid-cols-[1fr_0.8fr] lg:p-10">
          <div>
            <SectionHeader
              eyebrow="Medicines"
              title="Healthcare essentials with a professional standard."
              copy="A calmer way to manage medicines, preventive care, refills, and support when your pet needs attention."
              align="left"
            />
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {medicineItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-center gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-4">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-dogify-blue text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <p className="font-black text-dogify-ink">{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-slate-100">
            <img src={medicineImage} alt="Professional pet healthcare support" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
            <div className="glass absolute bottom-5 left-5 right-5 rounded-3xl p-5">
              <p className="text-sm font-bold text-slate-500">Verified care layer</p>
              <p className="mt-1 text-2xl font-black text-dogify-ink">Guided refills, preventive health, and emergency clarity.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="health" className="section-shell py-24">
        <SectionHeader
          eyebrow="Health Support"
          title="A digital health ecosystem for pets."
          copy="Vet consultation, WhatsApp care, diet guidance, emergency assistance, health tracking, and vaccination reminders connected in one place."
        />
        <div className="relative mx-auto mt-14 min-h-[620px] max-w-5xl overflow-hidden rounded-[2.5rem] bg-dogify-ink p-6 shadow-premium">
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-dogify-cyan/20 blur-3xl" />
          <div className="absolute inset-10 rounded-full border border-white/10" />
          <div className="absolute inset-24 rounded-full border border-dogify-cyan/20" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/20"
          />
          <div className="glass-dark absolute left-1/2 top-1/2 grid h-52 w-52 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-center text-white">
            <div>
              <HeartPulse className="mx-auto h-12 w-12 text-dogify-green" />
              <p className="mt-3 text-2xl font-black">DOGIFY Care OS</p>
            </div>
          </div>
          {healthNodes.map((node) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.title}
                whileHover={{ scale: 1.05, y: -4 }}
                className={`glass absolute ${node.position} flex w-44 items-center gap-3 rounded-3xl p-4`}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-dogify-cyan text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="text-sm font-black text-dogify-ink">{node.title}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="section-shell py-24">
        <SectionHeader
          eyebrow="Pet Parent Love"
          title="Built for people who treat pets like family."
          copy="Real stories from pet parents who wanted care to feel organized, premium, and deeply dependable."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((review, index) => (
            <motion.article
              key={review.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="glass rounded-[2rem] p-7"
            >
              <div className="flex gap-1 text-dogify-green">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-6 text-lg leading-8 text-slate-700">&ldquo;{review.quote}&rdquo;</p>
              <div className="mt-7 border-t border-white/70 pt-5">
                <p className="font-black text-dogify-ink">{review.name}</p>
                <p className="text-sm font-semibold text-slate-500">{review.pet}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="cta" className="section-shell py-24">
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-dogify-blue via-dogify-cyan to-dogify-green p-8 text-white shadow-premium md:p-14">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-white/80">DOGIFY</p>
              <h2 className="text-balance text-4xl font-black tracking-tight md:text-6xl">Your Pet Deserves Better Care.</h2>
            </div>
            <button className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-black text-dogify-blue shadow-xl transition hover:-translate-y-0.5">
              Get Started Today <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200/70 bg-white/60 py-12 backdrop-blur">
        <div className="section-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-dogify-blue text-white">
                <PawPrint className="h-5 w-5" />
              </span>
              <span className="text-xl font-black text-dogify-ink">DOGIFY</span>
            </div>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
              Everything your pet needs. One trusted platform for modern pet parents in India.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-slate-600">
            <a href="#hero" className="hover:text-dogify-blue">About</a>
            <a href="#services" className="hover:text-dogify-blue">Services</a>
            <a href="mailto:hello@dogify.in" className="hover:text-dogify-blue">Contact</a>
            <a href="#" className="hover:text-dogify-blue">Instagram</a>
            <a href="#" className="hover:text-dogify-blue">Privacy Policy</a>
            <a href="#" className="hover:text-dogify-blue">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
