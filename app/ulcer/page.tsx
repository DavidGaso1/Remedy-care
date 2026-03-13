import { getProductBySlug } from "@/lib/products";
import ProductPage from "@/components/ProductPage";

export const metadata = {
    title: "Ulcer Relief Treatment | Natural Gastric Healing Solution",
    description: "Natural treatment for stomach ulcers, H. pylori, and gastritis. 100% herbal and effective. Pay on delivery.",
};

export default function UlcerPage() {
    const product = getProductBySlug("ulcer")!;
    return <ProductPage product={product} />;
}
