import { ProductCategoryPage } from "@/components/product-category-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Pet Medicines & Preventive Care | DOGIFY",
  description:
    "Manage pet supplements, tick and flea care, prescription support, first aid, and vaccination reminders with DOGIFY.",
  canonical: "/medicines"
});

export default function Page() {
  return (
    <ProductCategoryPage
      eyebrow="Pet Healthcare"
      title="Medicines and preventive care with clarity."
      copy="Shop live Supabase products for tick and flea care, supplements, vitamins, first aid, and prescription support."
      commerceCategory="medicines"
      categories={["Tick & Flea Care", "Supplements", "Vitamins", "First Aid", "Prescription Support"]}
      image="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=86"
    />
  );
}
