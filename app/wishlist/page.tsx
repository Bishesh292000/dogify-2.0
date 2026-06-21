import { WishlistPage } from "@/components/wishlist-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Wishlist | DOGIFY",
  description: "Save premium DOGIFY pet products and move them to cart when ready.",
  canonical: "/wishlist"
});

export default function Page() {
  return <WishlistPage />;
}
