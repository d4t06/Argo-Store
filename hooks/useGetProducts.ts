import { Products } from "@/constants/Product";
import { useProductsStore } from "@/stores/Products";
import { sleep } from "@/utils/appHelper";
import { useEffect, useState } from "react";

export default function useGetProducts() {
	const { products, setProducts } = useProductsStore();
	const [isFetching, setIsFetching] = useState(true);

	const api = async () => {
		try {
			setIsFetching(true);

			await sleep(1000);

			// const res = await fetch("https://fakestoreapi.com/products");

			// if (res.ok) {
			// 	const payload = await res.json();
			// 	setProducts(payload);
			// }

			setProducts(Products);
		} catch (err) {
			console.log(err);
		} finally {
			setIsFetching(false);
		}
	};

	useEffect(() => {
		api();
	}, []);

	return { api, isFetching, setIsFetching, products };
}
