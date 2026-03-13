import { getProductBySlug } from "@/lib/products";
import ProductPage from "@/components/ProductPage";

export const metadata = {
  title: "ED & Sexual Health Treatment | Reodeo/Vigormax Capsules",
  description: "Natural treatment for erectile dysfunction, premature ejaculation. Last 50+ minutes. NAFDAC approved herbal capsules. Pay on delivery.",
};

export default function EDPage() {
  const product = getProductBySlug("ed-sexual-health")!;
  return <ProductPage product={product} />;
}
