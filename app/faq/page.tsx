import { FaqPage } from "@/components/dogify-site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "DOGIFY FAQ | Pet Care Questions Answered",
  description:
    "Find answers about DOGIFY food, accessories, medicines, health support, service availability, and care coordination.",
  canonical: "/faq"
});

export default function Page() {
  return <FaqPage />;
}
