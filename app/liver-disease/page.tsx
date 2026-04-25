import { getProductBySlug } from "@/lib/products";
import ProductPage from "@/components/ProductPage";

export const metadata = {
  title: "Liver Disease Treatment | Reverse Liver Damage Naturally",
  description: "Natural liver disease treatment. B-Clear, Sto-Care, Myco Balance, Livities, Garlic Oil & I-Detox Tea. Complete liver restoration. NAFDAC approved. Pay on delivery.",
};

export default function LiverDiseasePage() {
  const product = getProductBySlug("liver-disease")!;
  return <ProductPage product={product} />;
}
