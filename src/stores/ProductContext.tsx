import { createContext, ReactNode, useContext, useRef, useState } from "react";

function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProductData, setCurrentProductData] = useState<
    { product: Product; index: number } | undefined
  >();

  const shouldFetchData = useRef(true);

  const [result, serResult] = useState<Product[]>([]);

  // const currentProductData = useMemo(() => {
  // 	const index = products.findIndex((p) => p.id === currentProductId);

  // 	if (index === -1) return;
  // 	else return { product: products[index], index };
  // }, [products, currentProductId]);

  type EditProduct = {
    type: "edit";
    index: number;
    product: Partial<Product>;
  };

  const action = (props: EditProduct) => {
    switch (props.type) {
      case "edit":
        const newProducts = [...products];

        Object.assign(newProducts[props.index], props.product);

        setProducts(newProducts);

        break;
    }
  };

  return {
    products,
    setProducts,
    currentProductData,
    setCurrentProductData,
    shouldFetchData,
    result,
    serResult,
    action,
  };
}

type ContextType = ReturnType<typeof useProducts>;

const Context = createContext<ContextType | null>(null);

export default function ProductsProvider({ children }: { children: ReactNode }) {
  return <Context.Provider value={useProducts()}>{children}</Context.Provider>;
}

export const useProductContext = () => {
  const ct = useContext(Context);

  if (!ct) throw new Error("ProductsProvider is not provided");

  return ct;
};
