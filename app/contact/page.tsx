import type { Metadata } from "next";
import { ContactPage } from "@/components/dogify-site";

export const metadata: Metadata = {
  title: "Contact DOGIFY | Pet Care Support",
  description:
    "Contact DOGIFY for grooming bookings, pet food guidance, accessories, medicines, health support, partnerships, and care questions.",
  alternates: {
    canonical: "/contact"
  }
};

export default function Page() {
  return <ContactPage />;
}
