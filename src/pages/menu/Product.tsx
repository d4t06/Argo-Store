import AddProductBtn from "@/components/AddProductBtn";
import ProductSearchBar from "@/components/ProductSearchBar";
import { Loading } from "@/components/ui";
import NotFound from "@/components/ui/NoResult";
import useGetProducts from "@/hooks/useGetProducts";
import useSearchProduct from "@/hooks/useSearchProduct";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import simon from "@/assets/images/simon_empty.png";

export default function MenuProductPage() {
  const { _products, ...rest } = useSearchProduct();
  const { api, isFetching, setIsFetching, shouldFetchData } = useGetProducts();

  useEffect(() => {
    if (shouldFetchData.current) {
      shouldFetchData.current = false;

      api();
    } else setIsFetching(false);
  }, []);

  return (
    <>
      <ProductSearchBar {...rest} />

      {isFetching ? (
        <Loading />
      ) : (
        <>
          {_products.length ? (
            <div className="mt-5 overflow-auto space-y-2">
              {_products.map((p, index) => (
                <Link key={index} className="w-full flex" to={"/"}>
                  <img
                    className="w-[70px] h-[70px]"
                    src={p.image_url ? p.image_url : simon}
                  />

                  <p className="text-lg ml-2 font-[500]">{p.product_name}</p>
                </Link>
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
