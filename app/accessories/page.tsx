import type { Metadata } from "next";
import { ServicePage } from "@/components/dogify-site";

export const metadata: Metadata = {
  title: "Premium Pet Accessories | DOGIFY",
  description:
    "Shop a curated DOGIFY accessory ecosystem for beds, toys, harnesses, bowls, and travel gear designed for safer daily pet life.",
  alternates: {
    canonical: "/accessories"
  }
};

export default function Page() {
  return <ServicePage slug="accessories" />;
}
