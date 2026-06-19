import { GroomingPage } from "@/components/grooming-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Luxury Pet Grooming | DOGIFY",
  description:
    "Book premium DOGIFY grooming for bathing, trimming, nail care, spa treatments, and home visit grooming.",
  canonical: "/grooming"
});

export default function Page() {
  return <GroomingPage />;
}
