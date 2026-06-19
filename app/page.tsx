import { HomePage } from "@/components/dogify-site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "DOGIFY | Everything Your Pet Needs. One Trusted Platform.",
  description:
    "DOGIFY is India's premium pet-care ecosystem for food, accessories, grooming, medicines, and expert health support.",
  canonical: "/"
});

export default function Page() {
  return <HomePage />;
}
