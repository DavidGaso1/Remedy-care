import { getProductBySlug } from "@/lib/products";
import ProductPage from "@/components/ProductPage";

export const metadata = {
  title: "Female Infertility Treatment | Restore Fertility Naturally",
  description: "Natural fertility support for women. Female Care, Longzit, B-Clear & Ganoderma. Hormonal balance & ovulation support. NAFDAC approved. Pay on delivery.",
};

export default function FemaleInfertilityPage() {
  const product = getProductBySlug("female-infertility")!;
  return <ProductPage product={product} />;
}
