import { getProductBySlug } from "@/lib/products";
import ProductPage from "@/components/ProductPage";

export const metadata = {
  title: "Hemorrhoid (Pile) Treatment | Natural Relief Without Surgery",
  description: "Treat hemorrhoids and piles naturally. Ganoderma Softgel & Constifree Tea. Anti-inflammatory & digestive regulation. NAFDAC approved. Pay on delivery.",
};

export default function HemorrhoidPilePage() {
  const product = getProductBySlug("hemorrhoid-pile")!;
  return <ProductPage product={product} />;
}
