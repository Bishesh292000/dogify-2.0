"use client";

import { motion } from "framer-motion";
import { HeartPulse, MessageCircleHeart, PawPrint, Phone, Scissors, ShoppingBag, X } from "lucide-react";
import { PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { assistantMessages, createWhatsAppUrl } from "@/lib/whatsapp";

type Position = {
  x: number;
  y: number;
};

const assistantActions = [
  { label: "Chat On WhatsApp", icon: MessageCircleHeart, message: undefined },
  { label: "Place Order", icon: ShoppingBag, message: assistantMessages.order },
  { label: "Grooming Support", icon: Scissors, message: assistantMessages.grooming },
  { label: "Health Support", icon: HeartPulse, message: assistantMessages.health },
  { label: "Contact Us", icon: Phone, message: assistantMessages.contact }
];

function getInitialPosition(): Position {
  if (typeof window === "undefined") {
    return { x: 24, y: 120 };
  }

  const stored = window.sessionStorage.getItem("dogify-assistant-position");
  if (stored) {
    try {
      return JSON.parse(stored) as Position;
    } catch {
      return { x: 24, y: 120 };
    }
  }

  return { x: 24, y: 120 };
}

export function WhatsAppAssistant() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 24, y: 120 });
  const dragStart = useRef<{ pointerX: number; pointerY: number; x: number; y: number } | null>(null);
  const moved = useRef(false);
  const idleTimer = useRef<number | null>(null);

  useEffect(() => {
    setPosition(getInitialPosition());
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("dogify-assistant-position", JSON.stringify(position));
  }, [position]);

  const resetIdle = useMemo(
    () => () => {
      if (idleTimer.current) {
        window.clearTimeout(idleTimer.current);
      }

      setHidden(false);
      idleTimer.current = window.setTimeout(() => {
        setOpen(false);
        setHidden(true);
      }, 12000);
    },
    []
  );

  useEffect(() => {
    resetIdle();
    window.addEventListener("pointerdown", resetIdle);
    window.addEventListener("scroll", resetIdle, { passive: true });
    window.addEventListener("keydown", resetIdle);

    return () => {
      if (idleTimer.current) {
        window.clearTimeout(idleTimer.current);
      }
      window.removeEventListener("pointerdown", resetIdle);
      window.removeEventListener("scroll", resetIdle);
      window.removeEventListener("keydown", resetIdle);
    };
  }, [resetIdle]);

  function clampPosition(next: Position): Position {
    const maxX = Math.max(8, window.innerWidth - 76);
    const maxY = Math.max(80, window.innerHeight - 92);

    return {
      x: Math.min(Math.max(8, next.x), maxX),
      y: Math.min(Math.max(80, next.y), maxY)
    };
  }

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    moved.current = false;
    dragStart.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      x: position.x,
      y: position.y
    };
    resetIdle();
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (!dragStart.current) {
      return;
    }

    const deltaX = event.clientX - dragStart.current.pointerX;
    const deltaY = event.clientY - dragStart.current.pointerY;

    if (Math.abs(deltaX) + Math.abs(deltaY) > 4) {
      moved.current = true;
    }

    setPosition(
      clampPosition({
        x: dragStart.current.x + deltaX,
        y: dragStart.current.y + deltaY
      })
    );
  }

  function handlePointerUp() {
    dragStart.current = null;
  }

  function handleMainClick() {
    resetIdle();
    if (moved.current) {
      moved.current = false;
      return;
    }

    if (hidden) {
      setHidden(false);
      return;
    }

    setOpen((value) => !value);
  }

  const right = hidden ? -42 : position.x;

  return (
    <div
      className="fixed z-[90]"
      style={{
        right,
        bottom: position.y
      }}
    >
      {open && !hidden ? (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="glass mb-3 w-[min(280px,calc(100vw-32px))] rounded-[2rem] p-3"
        >
          <div className="mb-2 flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-dogify-green text-white">
                <PawPrint className="h-4 w-4" />
              </span>
              <p className="text-sm font-black text-dogify-ink">DOGIFY Assistant</p>
            </div>
            <button
              type="button"
              aria-label="Close assistant"
              onClick={() => setOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-full bg-white text-slate-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-2">
            {assistantActions.map((action) => {
              const Icon = action.icon;
              return (
                <a
                  key={action.label}
                  href={createWhatsAppUrl(action.message)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-12 items-center gap-3 rounded-2xl bg-white/80 px-4 text-sm font-black text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-dogify-blue"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-dogify-blue text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  {action.label}
                </a>
              );
            })}
          </div>
        </motion.div>
      ) : null}
      <motion.button
        type="button"
        aria-label="Open DOGIFY WhatsApp assistant"
        onClick={handleMainClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        animate={{ scale: hidden ? 0.92 : 1, x: hidden ? 8 : 0 }}
        whileTap={{ scale: 0.94 }}
        className="grid h-16 w-16 touch-none place-items-center rounded-full border border-white/70 bg-white/70 text-dogify-green shadow-premium backdrop-blur-xl transition hover:-translate-y-1"
      >
        <span className="absolute inset-2 rounded-full bg-dogify-green/15" />
        <MessageCircleHeart className="relative h-8 w-8" />
      </motion.button>
    </div>
  );
}
