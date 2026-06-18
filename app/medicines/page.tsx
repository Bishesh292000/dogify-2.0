import type { Metadata } from "next";
import { ServicePage } from "@/components/dogify-site";

export const metadata: Metadata = {
  title: "Pet Medicines & Preventive Care | DOGIFY",
  description:
    "Manage pet supplements, tick and flea care, prescription support, first aid, and vaccination reminders with DOGIFY.",
  alternates: {
    canonical: "/medicines"
  }
};

export default function Page() {
  return <ServicePage slug="medicines" />;
}
