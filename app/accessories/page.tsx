import { ProductCategoryPage } from "@/components/product-category-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Premium Pet Accessories | DOGIFY",
  description:
    "Shop a curated DOGIFY accessory ecosystem for beds, toys, harnesses, bowls, and travel gear designed for safer daily pet life.",
  canonical: "/accessories"
});

export default function Page() {
  return (
    <ProductCategoryPage
      eyebrow="Lifestyle Essentials"
      title="Accessories for calmer, safer pet life."
      copy="Browse live DOGIFY accessories, including beds, toys, harnesses, leashes, bowls, clothing, and travel gear."
      commerceCategory="accessories"
      categories={["Beds", "Toys", "Harnesses", "Leashes", "Bowls", "Clothing", "Travel Accessories"]}
      image="https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=1200&q=86"
    />
  );
}
