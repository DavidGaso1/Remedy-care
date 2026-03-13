import { getProductBySlug } from "@/lib/products";
import ProductPage from "@/components/ProductPage";

export const metadata = {
  title: "Diabetes Treatment | Reverse Blood Sugar Naturally",
  description: "Natural treatment for Type 1 & 2 diabetes. Normalize blood sugar without lifelong medication. NAFDAC approved. Pay on delivery.",
};

export default function DiabetesPage() {
  const product = getProductBySlug("diabetes")!;
  return <ProductPage product={product} />;
}
