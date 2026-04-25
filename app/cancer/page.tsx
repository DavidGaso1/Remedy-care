import { getProductBySlug } from "@/lib/products";
import ProductPage from "@/components/ProductPage";

export const metadata = {
  title: "Cancer Support | Natural Immune-Boosting Herbal Treatment",
  description: "Natural immune support for cancer prevention and recovery. B-Clear, Myco Balance & Garlic Oil. NAFDAC approved. Pay on delivery.",
};

export default function CancerPage() {
  const product = getProductBySlug("cancer")!;
  return <ProductPage product={product} />;
}
