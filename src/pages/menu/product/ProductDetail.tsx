import Header from "@/components/Header";
import MenuBtn from "@/components/MenuBtn";
import ProductInfo from "@/components/ProductIInfo";
import ProductUnits from "@/components/ProductUnits";
import NotFoundPage from "@/pages/NotFound";
import { useProductContext } from "@/stores/ProductContext";

export default function ProductDetailPage() {
  const { currentProductData } = useProductContext();

  if (!currentProductData) return <NotFoundPage />;

  return (
    <>
      <Header title="Product detail" />
      <MenuBtn />

      <div className="space-y-4 overflow-auto pb-20">
        <ProductInfo />
        <ProductUnits />
      </div>
    </>
  );
}
