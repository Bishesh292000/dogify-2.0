import { SearchPage } from "@/components/search-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Search | DOGIFY",
  description: "Search DOGIFY pet products with live suggestions and product previews.",
  canonical: "/search"
});

export default function Page() {
  return <SearchPage />;
}
