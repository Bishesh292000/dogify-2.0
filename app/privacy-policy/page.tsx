import { LegalPage } from "@/components/dogify-site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Policy | DOGIFY",
  description:
    "Read how DOGIFY handles information shared by pet parents for products, grooming, medicines, health support, and care coordination.",
  canonical: "/privacy-policy"
});

export default function Page() {
  return <LegalPage kind="privacy" />;
}
