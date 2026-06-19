import { ProductCategoryPage } from "@/components/product-category-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Premium Pet Food | DOGIFY",
  description:
    "Explore curated dog food, cat food, treats, and supplements selected around breed, age, lifestyle, and wellness needs.",
  canonical: "/food"
});

export default function Page() {
  return (
    <ProductCategoryPage
      eyebrow="Premium Pet Food"
      title="Nutrition, treats, and supplements from DOGIFY."
      copy="Search and shop live Supabase products across dog food, cat food, puppy food, treats, and wellness supplements."
      commerceCategory="food"
      categories={["Dog Food", "Cat Food", "Puppy Food", "Treats", "Supplements"]}
      image="https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=1200&q=86"
    />
  );
}
