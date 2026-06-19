import { HealthSupportPage } from "@/components/health-support-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Pet Health Support | DOGIFY",
  description:
    "DOGIFY health support connects vet consultation, WhatsApp guidance, diet support, emergency direction, tracking, and vaccination reminders.",
  canonical: "/health-support"
});

export default function Page() {
  return <HealthSupportPage />;
}
