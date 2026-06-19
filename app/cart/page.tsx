import { CartPage } from "@/components/cart-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Cart | DOGIFY",
  description: "Review DOGIFY food, accessories, and medicines in one persistent cart before checkout.",
  canonical: "/cart"
});

export default function Page() {
  return <CartPage />;
}
