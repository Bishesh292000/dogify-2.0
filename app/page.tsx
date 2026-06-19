import { HomePage } from "@/components/dogify-site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "DOGIFY | Everything Your Pet Needs. One Trusted Platform.",
  description:
    "DOGIFY is India's premium pet-care platform for shopping pet food, accessories, medicines, grooming bookings, WhatsApp ordering, and expert health support.",
  canonical: "/"
});

export default function Page() {
  return <HomePage />;
}
