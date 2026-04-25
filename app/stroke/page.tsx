import { getProductBySlug } from "@/lib/products";
import ProductPage from "@/components/ProductPage";

export const metadata = {
  title: "Stroke Recovery & Prevention | Natural Support",
  description: "Natural stroke recovery and prevention support. Longzit & GHT Ginseng & Royal Jelly. Blood circulation & nerve repair. NAFDAC approved. Pay on delivery.",
};

export default function StrokePage() {
  const product = getProductBySlug("stroke")!;
  return <ProductPage product={product} />;
}
