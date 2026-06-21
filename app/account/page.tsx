import { AccountPage } from "@/components/account-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Account | DOGIFY",
  description: "Manage DOGIFY orders, wishlist, saved addresses, pet profiles, and care preferences.",
  canonical: "/account"
});

export default function Page() {
  return <AccountPage />;
}
