import { getProductBySlug } from "@/lib/products";
import ProductPage from "@/components/ProductPage";

export const metadata = {
  title: "Prostate Health Treatment | Natural Prostate Solution Pack",
  description: "Natural treatment for enlarged prostate, frequent urination, weak urine stream. NAFDAC approved. Pay on delivery.",
};

export default function ProstatePage() {
  const product = getProductBySlug("prostate")!;
  return <ProductPage product={product} />;
}
