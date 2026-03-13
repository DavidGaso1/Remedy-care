import { getProductBySlug } from "@/lib/products";
import ProductPage from "@/components/ProductPage";

export const metadata = {
  title: "Joint Pain & Arthritis Relief | Natural Joint Solution",
  description: "Natural solution for joint pain, arthritis, and rheumatism. Move freely without pain. NAFDAC approved. Pay on delivery.",
};

export default function JointPainPage() {
  const product = getProductBySlug("joint-pain")!;
  return <ProductPage product={product} />;
}
