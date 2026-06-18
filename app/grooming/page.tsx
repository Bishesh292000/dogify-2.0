import type { Metadata } from "next";
import { ServicePage } from "@/components/dogify-site";

export const metadata: Metadata = {
  title: "Luxury Pet Grooming | DOGIFY",
  description:
    "Book premium DOGIFY grooming for bathing, trimming, nail care, spa treatments, and home visit grooming.",
  alternates: {
    canonical: "/grooming"
  }
};

export default function Page() {
  return <ServicePage slug="grooming" />;
}
