import type { Metadata } from "next";
import { HomePage } from "@/components/dogify-site";

export const metadata: Metadata = {
  title: "DOGIFY | Everything Your Pet Needs. One Trusted Platform.",
  description:
    "DOGIFY is India's premium pet-care ecosystem for food, accessories, grooming, medicines, and expert health support.",
  alternates: {
    canonical: "/"
  }
};

export default function Page() {
  return <HomePage />;
}
