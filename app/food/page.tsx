import type { Metadata } from "next";
import { ServicePage } from "@/components/dogify-site";

export const metadata: Metadata = {
  title: "Premium Pet Food | DOGIFY",
  description:
    "Explore curated dog food, cat food, treats, and supplements selected around breed, age, lifestyle, and wellness needs.",
  alternates: {
    canonical: "/food"
  }
};

export default function Page() {
  return <ServicePage slug="food" />;
}
