import type { Metadata } from "next";
import { AboutPage } from "@/components/dogify-site";

export const metadata: Metadata = {
  title: "About DOGIFY | India's Trusted Pet-Care Ecosystem",
  description:
    "Learn about DOGIFY's mission to create India's most trusted pet-care ecosystem across food, accessories, grooming, medicines, and health support.",
  alternates: {
    canonical: "/about"
  }
};

export default function Page() {
  return <AboutPage />;
}
