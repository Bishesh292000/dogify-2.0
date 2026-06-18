import type { Metadata } from "next";
import { ServicePage } from "@/components/dogify-site";

export const metadata: Metadata = {
  title: "Pet Health Support | DOGIFY",
  description:
    "DOGIFY health support connects vet consultation, WhatsApp guidance, diet support, emergency direction, tracking, and vaccination reminders.",
  alternates: {
    canonical: "/health-support"
  }
};

export default function Page() {
  return <ServicePage slug="health-support" />;
}
