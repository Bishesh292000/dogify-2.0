import { LegalPage } from "@/components/dogify-site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Terms & Conditions | DOGIFY",
  description:
    "Review DOGIFY terms for using pet-care products, grooming coordination, medicines support, health support, and platform services.",
  canonical: "/terms-and-conditions"
});

export default function Page() {
  return <LegalPage kind="terms" />;
}
