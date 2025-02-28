import AddProductBtn from "@/components/AddProductBtn";
import ProductSearchBar from "@/components/ProductSearchBar";
import { Loading } from "@/components/ui";
import NotFound from "@/components/ui/NoResult";
import useGetProducts from "@/hooks/useGetProducts";
import useSearchProduct from "@/hooks/useSearchProduct";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import simon from "@/assets/images/simon_empty.png";
import Header from "@/components/Header";
import MenuBtn from "@/components/MenuBtn";

export default function MenuProductPage() {
  const { _products, ...rest } = useSearchProduct();
  const {
    api,
    isFetching,
    setIsFetching,
    shouldFetchData,
    setCurrentProductData,
  } = useGetProducts();

  const navigate = useNavigate();

  const handleNavigate = (product: Product, index: number) => {
    setCurrentProductData({ product, index });
    navigate(`/menu/product/${product.id}`);
  };

  useEffect(() => {
    if (shouldFetchData.current) {
      shouldFetchData.current = false;

      api();
    } else setIsFetching(false);
  }, []);

  return (
    <>
      <Header title="Product" />
      <MenuBtn />

      <ProductSearchBar {...rest} />

      {isFetching ? (
        <Loading />
      ) : (
        <>
          {_products.length ? (
            <div className="mt-5 overflow-auto space-y-2">
              {_products.map((p, index) => (
                <div
                  key={index}
                  className="w-full flex cursor-pointer"
                  onClick={() => handleNavigate(p, index)}
                >
                  <img
                    className="w-[70px] h-[70px]"
                    src={p.image_url ? p.image_url : simon}
                  />

                  <p className="text-lg ml-2 font-[500]">{p.product_name}</p>
                </div>
              ))}
            </div>
          ) : (
            <NotFound />
          )}
        </>
      )}

      <AddProductBtn />
    </>
  );
}
