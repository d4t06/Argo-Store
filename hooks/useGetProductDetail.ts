import { useProductsStore } from "@/stores/Products";
import { sleep } from "@/utils/appHelper";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function useGetProductDetail() {
	const [product, setProduct] = useState<ProductList>();
	const [isFetching, setIsFetching] = useState(true);

	const { products } = useProductsStore();

	const { id } = useLocalSearchParams();

	const api = async () => {
		try {
			setIsFetching(true);

			await sleep(1000);

			// const res = await fetch("https://fakestoreapi.com/products");

			// if (res.ok) {
			// 	const payload = await res.json();
			// 	setProducts(payload);
			// }

			const foundedProduct = products.find((p) => p.id === +id);

			setProduct(foundedProduct);
		} catch (err) {
			console.log(err);
		} finally {
			setIsFetching(false);
		}
	};

	useEffect(() => {
		if (typeof id !== "string" || isNaN(+id)) return;

		api();
	}, []);

	return { api, isFetching, product };
}
