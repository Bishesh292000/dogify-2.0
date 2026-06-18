import type { Metadata } from "next";
import { LegalPage } from "@/components/dogify-site";

export const metadata: Metadata = {
  title: "Privacy Policy | DOGIFY",
  description:
    "Read how DOGIFY handles information shared by pet parents for products, grooming, medicines, health support, and care coordination.",
  alternates: {
    canonical: "/privacy-policy"
  }
};

export default function Page() {
  return <LegalPage kind="privacy" />;
}
