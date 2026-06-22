import { AboutCommercePage } from "@/components/about-commerce-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About DOGIFY | India's Trusted Pet-Care Ecosystem",
  description:
    "Learn about DOGIFY's mission to create India's most trusted pet-care ecosystem across food, accessories, medicines, and health support.",
  canonical: "/about"
});

export default function Page() {
  return <AboutCommercePage />;
}
