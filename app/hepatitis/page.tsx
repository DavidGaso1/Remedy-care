import { getProductBySlug } from "@/lib/products";
import ProductPage from "@/components/ProductPage";

export const metadata = {
  title: "Hepatitis Treatment | Restore Liver Function Naturally",
  description: "Natural hepatitis treatment. B-Clear, Sto-Care, Ganoderma, Myco Balance, Livities & I-Detox Tea. Comprehensive liver restoration. NAFDAC approved. Pay on delivery.",
};

export default function HepatitisPage() {
  const product = getProductBySlug("hepatitis")!;
  return <ProductPage product={product} />;
}
