import { createContext, ReactNode, useContext, useState } from "react";

function useProducts() {
	const [products, setProducts] = useState<ProductList[]>([]);

	return { products, setProducts };
}

type ContextType = ReturnType<typeof useProducts>;

const Context = createContext<ContextType | null>(null);

export default function ProductsProvider({
	children,
}: {
	children: ReactNode;
}) {
	return <Context.Provider value={useProducts()}>{children}</Context.Provider>;
}

export const useProductsStore = () => {
	const ct = useContext(Context);

	if (!ct) throw new Error("ProductsProvider is not provided");

	return ct;
};
