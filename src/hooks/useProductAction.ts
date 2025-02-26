import { myAddDoc, mySetDoc, productCollectionRef } from "@/firebase/firebaseService";
import { useProductContext } from "@/stores/ProductContext";
import { sleep } from "@/utils/appHelper";
import { useState } from "react";

export default function useProductAction() {
	const [isFetching, setIsFetching] = useState(false);

	const { setProducts, products, shouldFetchData } = useProductContext();

	type Add = {
		type: "add";
		product: ProductSchema;
		andAddNew?: boolean;
	};

	type Edit = {
		type: "edit";
		product: ProductSchema;
		id: string;
		index: number;
	};

	const action = async (props: Add | Edit) => {
		try {
			setIsFetching(true);

			if (process.env.NODE_ENV === "development") await sleep(300);

			switch (props.type) {
				case "add": {
					const id = await myAddDoc({
						collection: productCollectionRef,
						data: props.product,
					});

					setProducts((prev) => [{ id, ...props.product } as Product, ...prev]);

					break;
				}

				case "edit": {
					// await publicRequest.post(`products/${props.id}`, props.product);
					await mySetDoc({
						collection: "Products",
						data: props.product,
						id: props.id,
					});

					const newProducts = [...products];
					Object.assign(newProducts[props.index], props.product);

					setProducts(newProducts);

					shouldFetchData.current = true;

					break;
				}
			}

			setIsFetching(false);
		} catch (error) {
			throw error;
		} finally {
			setIsFetching(false);
		}
	};
	return { isFetching, action };
}
