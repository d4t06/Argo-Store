import ProductInfo from "@/components/ProductIInfo";
import ProductUnits from "@/components/ProductUnits";
import { NoResult } from "@/components/ui";
import { useProductContext } from "@/stores/ProductContext";

export default function ProductDetailPage() {
  const { currentProductData } = useProductContext();

  if (!currentProductData) return <NoResult />;

  return (
    <div className="space-y-4 overflow-auto pb-20">
      <ProductInfo />
      <ProductUnits />
    </div>
  );
}
