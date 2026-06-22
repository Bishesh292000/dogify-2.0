import { ContactPage } from "@/components/contact-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact DOGIFY | Pet Care Support",
  description:
    "Contact DOGIFY for pet food guidance, accessories, medicines, health support, partnerships, and care questions.",
  canonical: "/contact"
});

export default function Page() {
  return <ContactPage />;
}
