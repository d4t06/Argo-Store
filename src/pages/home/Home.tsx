import BubbleCartBtn from "@/components/BubbleCartBtn";
import ProductListItem from "@/components/ProductListItem";
import ProductSearchBar from "@/components/ProductSearchBar";
import { Frame, Loading } from "@/components/ui";
import NotFound from "@/components/ui/NoResult";
import useGetProducts from "@/hooks/useGetProducts";
import useSearchProduct from "@/hooks/useSearchProduct";
import { useCartContext } from "@/stores/CartContext";
import { useEffect } from "react";

export default function Home() {
  const { select, cartItems } = useCartContext();

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
              {_products.map((p, index) => {
                const selected = cartItems.find((_p) => _p.id === p.id);

                return (
                  <Frame onClick={() => select(p)} key={index}>
                    <ProductListItem product={p} selected={!!selected} />
                  </Frame>
                );
              })}
            </div>
          ) : (
            <NotFound />
          )}
        </>
      )}

        <BubbleCartBtn count={cartItems.length} href="/cart" />
    </>
  );
}
