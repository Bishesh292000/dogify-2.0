import type { Metadata } from "next";
import { LegalPage } from "@/components/dogify-site";

export const metadata: Metadata = {
  title: "Terms & Conditions | DOGIFY",
  description:
    "Review DOGIFY terms for using pet-care products, grooming coordination, medicines support, health support, and platform services.",
  alternates: {
    canonical: "/terms-and-conditions"
  }
};

export default function Page() {
  return <LegalPage kind="terms" />;
}
