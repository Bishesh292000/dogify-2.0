"use client";

import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  CalendarHeart,
  ChevronRight,
  HeartPulse,
  Mail,
  Menu,
  MessageCircleHeart,
  PackageCheck,
  PawPrint,
  Sparkles,
  Star,
  ShoppingCart,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { OptimizedImage } from "@/components/optimized-image";
import {
  careValues,
  companyStats,
  contactChannels,
  faqItems,
  footerLinks,
  heroImage,
  legalSections,
  servicePages,
  services,
  testimonials,
  trustBadges,
  trustMetrics
} from "@/lib/dogify-data";
import { useCartStore } from "@/lib/cart-store";
import { dogifyContact } from "@/lib/contact";
import type { ServicePageData, ServiceSlug } from "@/lib/dogify-data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

function IconBubble({ icon: Icon, tone = "blue" }: { icon: LucideIcon; tone?: "blue" | "cyan" | "green" | "dark" }) {
  const tones = {
    blue: "bg-[#FF6B35]",
    cyan: "bg-[#FFB84D]",
    green: "bg-dogify-green",
    dark: "bg-dogify-ink"
  };

  return (
    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${tones[tone]} text-white shadow-glow`}>
      <Icon className="h-6 w-6" />
    </span>
  );
}

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

export function SectionHeader({
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
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-[#FF6B35]">{eyebrow}</p>
      <h2 className="text-balance text-4xl font-black tracking-tight text-dogify-ink md:text-6xl">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-slate-600">{copy}</p>
    </motion.div>
  );
}

function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-[14px] bg-[#FF6B35] px-6 py-3 text-sm font-bold text-white shadow-[0_18px_45px_rgba(255,107,53,0.26)] transition hover:-translate-y-0.5 hover:bg-slate-950"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
    </Link>
  );
}

function SecondaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-12 items-center justify-center gap-3 rounded-[14px] border border-white/70 bg-white/75 px-6 py-3 text-sm font-bold text-dogify-ink shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-[#FFB84D] hover:text-[#FF6B35]"
    >
      {children}
      <CalendarHeart className="h-4 w-4" />
    </Link>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const cartCount = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));
  const primaryLinks = [
  { label: "Food", href: "/food" },
  { label: "Accessories", href: "/accessories" },
  { label: "Medicines", href: "/medicines" },
  { label: "Health", href: "/health-support" },
  { label: "About", href: "/about" }
];

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 rounded-[20px] border border-white/70 bg-white/75 px-4 shadow-[0_20px_70px_rgba(15,23,42,0.12)] backdrop-blur-2xl md:px-5">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-[14px] bg-[#FF6B35] text-white shadow-[0_18px_45px_rgba(255,107,53,0.26)]">
            <PawPrint className="h-5 w-5" />
          </span>
          <span className="text-lg font-black tracking-tight text-dogify-ink">DOGIFY</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm font-semibold text-slate-600 lg:flex">
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-[#FF6B35]">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden h-11 items-center justify-center rounded-[14px] bg-[#22C55E] px-5 text-sm font-black text-white shadow-lg shadow-green-500/20 transition hover:-translate-y-0.5 sm:inline-flex"
          >
            Get Started
          </Link>
          <Link
            href="/cart"
            aria-label="Open DOGIFY cart"
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
      {open && (
        <div className="mx-auto mt-3 grid max-w-6xl gap-2 rounded-[20px] border border-white/70 bg-white/80 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl lg:hidden">
          {[...primaryLinks, { label: "Cart", href: "/cart" }, { label: "Contact", href: "/contact" }, { label: "FAQ", href: "/faq" }].map((link) => (
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
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white/60 py-12 backdrop-blur">
      <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-[14px] bg-[#FF6B35] text-white">
              <PawPrint className="h-5 w-5" />
            </span>
            <span className="text-xl font-black text-dogify-ink">DOGIFY</span>
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
            Everything your pet needs. One trusted platform for modern pet parents in India.
          </p>
          <div className="mt-5 grid gap-2 text-sm font-bold text-slate-600">
            <a href={dogifyContact.whatsappHref} className="transition hover:text-[#FF6B35]">
              WhatsApp: {dogifyContact.whatsappNumber}
            </a>
            <a href={dogifyContact.emailHref} className="transition hover:text-[#FF6B35]">
              Email: {dogifyContact.email}
            </a>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-bold text-slate-600 transition hover:text-[#FF6B35]">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8FAFC]">
      <div className="noise" />
      <Navigation />
      {children}
      <Footer />
    </main>
  );
}

export function HomePage() {
  return (
    <SiteFrame>
      <section className="section-shell grid min-h-screen items-center gap-12 pb-16 pt-32 lg:grid-cols-[0.9fr_1.1fr] lg:pt-24">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8 }}>
          <div className="mb-6 inline-flex items-center gap-3 rounded-[14px] border border-white/70 bg-white/70 px-4 py-2 text-sm font-bold text-[#FF6B35] shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-[#22C55E]" />
            India&apos;s premium pet-care ecosystem
          </div>
          <h1 className="text-balance text-5xl font-black tracking-tight text-dogify-ink sm:text-6xl lg:text-7xl">
            Everything Your Pet Needs.
            <span className="block bg-gradient-to-r from-[#FF6B35] via-[#FFB84D] to-[#22C55E] bg-clip-text text-transparent">
              One Trusted Platform.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-600">
            Premium Food, Accessories, Medicines and Expert Health Support.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <PrimaryLink href="/food">Shop Pet Essentials</PrimaryLink>
            <SecondaryLink href="/health-support">Get Health Support</SecondaryLink>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {["Food", "Medicines", "24/7 Care"].map((item) => (
              <div key={item} className="rounded-[20px] border border-white/70 bg-white/70 px-4 py-4 text-center shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
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
            <div className="absolute inset-8 rounded-[3rem] bg-gradient-to-br from-[#FF6B35]/25 via-[#FFB84D]/20 to-[#22C55E]/16 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[24px] border border-white/70 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.16)] max-sm:h-[300px] max-sm:w-[300px]">
              <OptimizedImage
                src={heroImage}
                alt="Happy golden dog representing DOGIFY pet care"
                priority
                sizes="(max-width: 640px) 300px, 390px"
              />
            </div>
            {[
              { label: "Food Packs", icon: servicePages.food.icon, className: "left-0 top-16", rotate: "-7deg" },
              { label: "Medicines", icon: servicePages.medicines.icon, className: "bottom-24 left-4", rotate: "5deg" },
              { label: "Vet Icons", icon: servicePages["health-support"].icon, className: "bottom-16 right-7", rotate: "-5deg" },
              { label: "Pet Toys", icon: servicePages.accessories.icon, className: "left-1/2 top-0 -translate-x-1/2", rotate: "3deg" }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  style={{ "--rotate": item.rotate } as React.CSSProperties}
                  className={`floating-card absolute ${index % 2 ? "float-delay" : "float-slow"} ${item.className} flex items-center gap-3 rounded-[20px] border border-white/70 bg-white/75 px-4 py-3 shadow-[0_22px_70px_rgba(15,23,42,0.12)] backdrop-blur-2xl max-sm:px-3 max-sm:py-2`}
                >
                  <IconBubble icon={Icon} tone={index % 2 ? "cyan" : "blue"} />
                  <span className="text-sm font-black text-dogify-ink max-sm:hidden">{item.label}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="section-shell py-24">
        <SectionHeader
          eyebrow="Services Ecosystem"
          title="One connected care layer for every pet need."
          copy="DOGIFY brings everyday essentials and health confidence into a single premium experience."
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
                <IconBubble icon={Icon} tone={index % 3 === 0 ? "blue" : index % 3 === 1 ? "cyan" : "green"} />
                <h3 className="mt-6 text-xl font-black text-dogify-ink">{service.eyebrow.replace("Premium ", "")}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{service.description}</p>
                <Link href={service.href} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#FF6B35]">
                  Explore <ChevronRight className="h-4 w-4" />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </section>

      <HowDogifyWorks />
      <CommerceTrustStrip />
      <TrustSection />
      <ShowcaseSections />
      <TestimonialsSection />
      <FinalCta />
    </SiteFrame>
  );
}

function TrustSection() {
  return (
    <section className="section-shell py-20">
      <div className="rounded-[24px] bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,0.18)] md:p-10">
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
  );
}

function HowDogifyWorks() {
  const steps = [
    {
      step: "01",
      title: "Browse products",
      copy: "Shop live DOGIFY food, accessories, and medicines from a curated premium catalog.",
      icon: ShoppingCart
    },
    {
      step: "02",
      title: "Cart or WhatsApp order",
      copy: "Add products to cart or use Buy Now to open a ready WhatsApp order instantly.",
      icon: MessageCircleHeart
    },
    {
      step: "03",
      title: "DOGIFY confirms",
      copy: "The team confirms availability, delivery or health support next steps.",
      icon: PackageCheck
    }
  ];

  return (
    <section className="section-shell py-20">
      <div className="grid gap-10 rounded-[24px] border border-white/70 bg-white/75 p-6 shadow-[0_28px_90px_rgba(15,23,42,0.10)] backdrop-blur-2xl lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
        <SectionHeader
          eyebrow="How DOGIFY Works"
          title="A simpler path from need to confirmed care."
          copy="DOGIFY keeps ordering human-first: browse, generate a bill, and confirm through WhatsApp without online payment collection."
          align="left"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="glass rounded-[2rem] p-6"
              >
                <p className="text-sm font-black text-[#FF6B35]">{item.step}</p>
                <IconBubble icon={Icon} tone={index === 1 ? "green" : "blue"} />
                <h3 className="mt-5 text-xl font-black text-dogify-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.copy}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CommerceTrustStrip() {
  const badges = [
    "Live premium catalog",
    "WhatsApp-first ordering",
    "Health support requests",
    "No online payment collection"
  ];

  return (
    <section className="section-shell py-10">
      <div className="glass flex flex-wrap items-center justify-center gap-3 rounded-[2rem] p-4">
        {badges.map((badge) => (
          <span
            key={badge}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-white/80 px-4 text-sm font-black text-dogify-ink shadow-sm"
          >
            {badge}
          </span>
        ))}
      </div>
    </section>
  );
}

function ShowcaseSections() {
  return (
    <>
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <section key={service.slug} className="section-shell grid gap-10 py-24 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className={index % 2 ? "lg:order-2" : ""}
            >
              <SectionHeader eyebrow={service.eyebrow} title={service.title} copy={service.heroCopy} align="left" />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {service.collections.slice(0, 4).map((item) => (
                  <div key={item.title} className="glass rounded-3xl p-5">
                    <p className="font-black text-dogify-ink">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.copy}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <PrimaryLink href={service.href}>Explore {service.eyebrow.replace("Premium ", "")}</PrimaryLink>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="relative min-h-[500px] overflow-hidden rounded-[24px] shadow-[0_28px_90px_rgba(15,23,42,0.14)]"
            >
              <OptimizedImage src={service.image} alt={service.title} sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-dogify-ink via-dogify-ink/20 to-transparent" />
              <div className="glass-dark absolute bottom-5 left-5 right-5 rounded-[2rem] p-6 text-white">
                <Icon className="h-9 w-9 text-dogify-green" />
                <h3 className="mt-3 text-3xl font-black">{service.eyebrow}</h3>
              </div>
            </motion.div>
          </section>
        );
      })}
    </>
  );
}

function TestimonialsSection() {
  return (
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
  );
}

function FinalCta() {
  return (
    <section className="section-shell py-24">
      <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#FF6B35] via-[#FFB84D] to-[#22C55E] p-8 text-white shadow-[0_28px_90px_rgba(255,107,53,0.22)] md:p-14">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-white/80">DOGIFY</p>
            <h2 className="text-balance text-4xl font-black tracking-tight md:text-6xl">Your Pet Deserves Better Care.</h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-14 items-center justify-center gap-3 rounded-[14px] bg-white px-7 py-4 text-sm font-black text-[#FF6B35] shadow-xl transition hover:-translate-y-0.5"
          >
            Get Started Today <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function InnerHero({ eyebrow, title, copy, icon: Icon, image }: { eyebrow: string; title: string; copy: string; icon: LucideIcon; image?: string }) {
  return (
    <section className="section-shell grid min-h-[720px] items-center gap-10 pb-16 pt-32 lg:grid-cols-[0.92fr_1.08fr]">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.75 }}>
        <div className="mb-6 inline-flex items-center gap-3 rounded-[14px] border border-white/70 bg-white/70 px-4 py-2 text-sm font-bold text-[#FF6B35] shadow-sm backdrop-blur">
          <Icon className="h-4 w-4 text-[#22C55E]" />
          {eyebrow}
        </div>
        <h1 className="text-balance text-5xl font-black tracking-tight text-dogify-ink sm:text-6xl lg:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-600">{copy}</p>
        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
          <PrimaryLink href="/contact">Talk to DOGIFY</PrimaryLink>
          <SecondaryLink href="/faq">Common Questions</SecondaryLink>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative min-h-[480px] overflow-hidden rounded-[24px] shadow-[0_28px_90px_rgba(15,23,42,0.14)]"
      >
        {image ? <OptimizedImage src={image} alt={title} priority sizes="(max-width: 1024px) 100vw, 50vw" /> : null}
        <div className={`absolute inset-0 bg-gradient-to-br from-[#FF6B35]/80 via-[#FFB84D]/50 to-[#22C55E]/60 ${image ? "mix-blend-multiply" : ""}`} />
        <div className="glass-dark absolute bottom-5 left-5 right-5 rounded-[2rem] p-6 text-white">
          <Icon className="h-10 w-10 text-dogify-green" />
          <p className="mt-4 text-3xl font-black">{eyebrow}</p>
        </div>
      </motion.div>
    </section>
  );
}

export function ServicePage({ slug }: { slug: ServiceSlug }) {
  const service = servicePages[slug];
  const Icon = service.icon;

  return (
    <SiteFrame>
      <InnerHero eyebrow={service.eyebrow} title={service.title} copy={service.heroCopy} icon={Icon} image={service.image} />
      <section className="section-shell py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {service.metrics.map((metric) => (
            <div key={metric.label} className="glass rounded-[2rem] p-7">
              <p className="text-4xl font-black text-dogify-ink">{metric.value}</p>
              <p className="mt-2 text-sm font-bold text-slate-500">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section-shell py-20">
        <SectionHeader eyebrow="What DOGIFY Handles" title="Designed as a complete care workflow." copy={service.description} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {service.pillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="glass rounded-[2rem] p-7"
            >
              <IconBubble icon={pillar.icon} tone={index === 0 ? "blue" : index === 1 ? "cyan" : "green"} />
              <h2 className="mt-6 text-2xl font-black text-dogify-ink">{pillar.title}</h2>
              <p className="mt-4 leading-7 text-slate-600">{pillar.copy}</p>
            </motion.article>
          ))}
        </div>
      </section>
      <section className="section-shell py-20">
        <div className="grid gap-8 rounded-[24px] bg-white p-6 shadow-[0_28px_90px_rgba(15,23,42,0.10)] lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
          <SectionHeader eyebrow="Collections" title="A premium range without the noise." copy="Each category is organized around real pet-parent routines, not endless browsing." align="left" />
          <div className="grid gap-4 sm:grid-cols-2">
            {service.collections.map((item) => (
              <Link key={item.title} href="/contact" className="group rounded-3xl border border-slate-100 bg-slate-50 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg">
                <p className="text-xl font-black text-dogify-ink">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.copy}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#FF6B35]">
                  Ask DOGIFY <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section-shell py-20">
        <SectionHeader eyebrow="How It Works" title="Care that feels organized from the first step." copy="DOGIFY connects selection, service, support, and follow-up into one calmer experience." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {service.process.map((step) => (
            <div key={step.step} className="glass rounded-[2rem] p-7">
              <p className="text-sm font-black text-[#FF6B35]">{step.step}</p>
              <h2 className="mt-4 text-2xl font-black text-dogify-ink">{step.title}</h2>
              <p className="mt-4 leading-7 text-slate-600">{step.copy}</p>
            </div>
          ))}
        </div>
      </section>
      <RelatedServices current={service} />
      <FinalCta />
    </SiteFrame>
  );
}

function RelatedServices({ current }: { current: ServicePageData }) {
  return (
    <section className="section-shell py-20">
      <SectionHeader eyebrow="Connected Ecosystem" title="Explore the rest of DOGIFY." copy="Every care vertical works better when it connects with the others." />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services
          .filter((service) => service.slug !== current.slug)
          .slice(0, 3)
          .map((service) => (
            <Link key={service.slug} href={service.href} className="glass group rounded-[2rem] p-6 transition hover:-translate-y-2">
              <IconBubble icon={service.icon} tone="cyan" />
              <h2 className="mt-5 text-xl font-black text-dogify-ink">{service.eyebrow}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
            </Link>
          ))}
      </div>
    </section>
  );
}

export function AboutPage() {
  return (
    <SiteFrame>
      <InnerHero
        eyebrow="About DOGIFY"
        title="India's most trusted pet-care ecosystem."
        copy="DOGIFY exists to make premium pet care feel connected, clear, and deeply dependable for modern pet parents."
        icon={PawPrint}
        image="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=86"
      />
      <section className="section-shell py-20">
        <div className="grid gap-5 md:grid-cols-4">
          {companyStats.map((stat) => (
            <div key={stat.label} className="glass rounded-[2rem] p-7">
              <p className="text-4xl font-black text-dogify-ink">{stat.value}</p>
              <p className="mt-2 text-sm font-bold text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section-shell grid gap-10 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeader
          eyebrow="Mission"
          title="Create India's most trusted pet-care ecosystem."
          copy="DOGIFY brings together food, accessories, medicines, and health support so pet parents do not have to stitch care together from disconnected services."
          align="left"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {careValues.map((value, index) => (
            <div key={value.title} className="glass rounded-[2rem] p-6">
              <IconBubble icon={value.icon} tone={index % 2 ? "green" : "blue"} />
              <h2 className="mt-5 text-xl font-black text-dogify-ink">{value.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{value.copy}</p>
            </div>
          ))}
        </div>
      </section>
      <FinalCta />
    </SiteFrame>
  );
}

export function ContactPage() {
  return (
    <SiteFrame>
      <InnerHero
        eyebrow="Contact DOGIFY"
        title="Tell us what your pet needs next."
         copy="Reach out for product guidance, medicine support, health questions, order assistance, or partnership conversations."
        icon={Mail}
        image="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=86"
      />
      <section className="section-shell grid gap-8 py-20 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          {contactChannels.map((channel, index) => (
            <div key={channel.title} className="glass flex items-start gap-4 rounded-[2rem] p-6">
              <IconBubble icon={channel.icon} tone={index % 2 ? "cyan" : "blue"} />
              <div>
                <h2 className="text-xl font-black text-dogify-ink">{channel.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{channel.copy}</p>
              </div>
            </div>
          ))}
        </div>
        <form className="glass rounded-[24px] p-6 md:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {["Your name", "Phone number", "Email address", "Pet type"].map((label) => (
              <label key={label} className="grid gap-2 text-sm font-bold text-slate-600">
                {label}
                <input className="h-12 rounded-[14px] border border-slate-200 bg-white/80 px-4 outline-none transition focus:border-[#FF6B35]" placeholder={label} />
              </label>
            ))}
          </div>
          <label className="mt-5 grid gap-2 text-sm font-bold text-slate-600">
            What do you need?
            <textarea className="min-h-36 rounded-[14px] border border-slate-200 bg-white/80 p-4 outline-none transition focus:border-[#FF6B35]" placeholder="Food, accessories, medicines, health support, or something else..." />
          </label>
          <button type="button" className="mt-6 inline-flex min-h-12 items-center justify-center gap-3 rounded-[14px] bg-[#FF6B35] px-6 py-3 text-sm font-bold text-white shadow-premium transition hover:-translate-y-0.5">
            Send Request <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </section>
    </SiteFrame>
  );
}

export function FaqPage() {
  return (
    <SiteFrame>
      <InnerHero
        eyebrow="FAQ"
        title="Clear answers for modern pet parents."
        copy="Everything you need to understand DOGIFY services, support, medicines, and care coordination."
        icon={HeartPulse}
      />
      <section className="section-shell py-20">
        <div className="grid gap-5">
          {faqItems.map((item, index) => (
            <motion.article
              key={item.question}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.55, delay: index * 0.04 }}
              className="glass rounded-[2rem] p-6 md:p-8"
            >
              <h2 className="text-2xl font-black text-dogify-ink">{item.question}</h2>
              <p className="mt-4 leading-8 text-slate-600">{item.answer}</p>
            </motion.article>
          ))}
        </div>
      </section>
      <FinalCta />
    </SiteFrame>
  );
}

export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const isPrivacy = kind === "privacy";
  const sections = legalSections[kind];

  return (
    <SiteFrame>
      <InnerHero
        eyebrow={isPrivacy ? "Privacy Policy" : "Terms & Conditions"}
        title={isPrivacy ? "How DOGIFY protects pet-parent trust." : "Clear terms for a connected pet-care platform."}
        copy={
          isPrivacy
            ? "A practical overview of how DOGIFY handles information shared for products, medicines, and health support."
            : "A responsible framework for using DOGIFY services, support flows, product guidance, and care coordination."
        }
        icon={isPrivacy ? HeartPulse : Sparkles}
      />
      <section className="section-shell py-20">
        <div className="glass rounded-[24px] p-6 md:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#FF6B35]">Last updated: June 18, 2026</p>
          <div className="mt-8 grid gap-6">
            {sections.map((section) => (
              <article key={section.title} className="rounded-[2rem] bg-white/70 p-6">
                <h2 className="text-2xl font-black text-dogify-ink">{section.title}</h2>
                <p className="mt-4 leading-8 text-slate-600">{section.copy}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm leading-6 text-slate-500">
              For questions regarding these policies, please contact DOGIFY support.
          </p>
        </div>
      </section>
    </SiteFrame>
  );
}
