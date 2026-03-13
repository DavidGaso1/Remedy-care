import { getProductBySlug } from "@/lib/products";
import ProductPage from "@/components/ProductPage";

export const metadata = {
  title: "High Blood Pressure Treatment | Natural HBP Solution",
  description: "Control hypertension naturally. GHT BP Support + Caerite pack. NAFDAC, Kosher, Halal certified. Pay on delivery.",
};

export default function BloodPressurePage() {
  const product = getProductBySlug("blood-pressure")!;
  return <ProductPage product={product} />;
}
