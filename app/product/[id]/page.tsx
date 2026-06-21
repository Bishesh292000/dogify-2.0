import { ProductDetailPage } from "@/components/product-detail-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Product Details | DOGIFY",
  description: "Explore premium DOGIFY product details, purchase options, delivery information, reviews, and related products.",
  canonical: "/product"
});

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProductDetailPage productId={id} />;
}
