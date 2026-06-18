import type { Metadata } from "next";
import { FaqPage } from "@/components/dogify-site";

export const metadata: Metadata = {
  title: "DOGIFY FAQ | Pet Care Questions Answered",
  description:
    "Find answers about DOGIFY grooming, food, accessories, medicines, health support, service availability, and care coordination.",
  alternates: {
    canonical: "/faq"
  }
};

export default function Page() {
  return <FaqPage />;
}
