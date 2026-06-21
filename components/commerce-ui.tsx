"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export const premiumFade = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 }
};

export function PremiumHero({
  eyebrow,
  title,
  copy,
  icon: Icon
}: {
  eyebrow: string;
  title: string;
  copy: string;
  icon: LucideIcon;
}) {
  return (
    <section className="section-shell pb-10 pt-32">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={premiumFade}
        transition={{ duration: 0.45 }}
        className="rounded-[24px] border border-white/60 bg-white/65 p-6 shadow-[0_30px_100px_rgba(15,23,42,0.12)] backdrop-blur-2xl md:p-10"
      >
        <div className="mb-6 inline-flex items-center gap-3 rounded-[14px] border border-white/70 bg-white/70 px-4 py-2 text-sm font-black text-[#FF6B35]">
          <Icon className="h-4 w-4 text-[#22C55E]" />
          {eyebrow}
        </div>
        <h1 className="max-w-4xl text-balance text-5xl font-black tracking-tight text-slate-950 md:text-7xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">{copy}</p>
      </motion.div>
    </section>
  );
}

export function PremiumPanel({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[20px] border border-white/60 bg-white/70 shadow-[0_22px_70px_rgba(15,23,42,0.10)] backdrop-blur-2xl ${className}`}>
      {children}
    </div>
  );
}
