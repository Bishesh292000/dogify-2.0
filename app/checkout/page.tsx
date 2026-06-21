import { CheckoutPage } from "@/components/checkout-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Checkout | DOGIFY",
  description: "Complete a clean DOGIFY checkout and confirm your pet-care order through WhatsApp.",
  canonical: "/checkout"
});

export default function Page() {
  return <CheckoutPage />;
}
