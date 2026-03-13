import { getProductBySlug } from "@/lib/products";
import ProductPage from "@/components/ProductPage";

export const metadata = {
  title: "Infection Relief | Cure Chronic STD & Bacterial Infections",
  description: "Permanently cure Staph, Gonorrhea, Chlamydia, UTI and chronic infections. 99.9% kill rate. NAFDAC approved. Pay on delivery.",
};

export default function InfectionPage() {
  const product = getProductBySlug("infection")!;
  return <ProductPage product={product} />;
}
