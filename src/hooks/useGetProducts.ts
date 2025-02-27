import { productCollectionRef } from "@/firebase/firebaseService";
import { useAuth } from "@/stores/AuthContext";
import { useProductContext } from "@/stores/ProductContext";
import { getDocs, query, where } from "firebase/firestore";
import { useState } from "react";

export default function useGetProducts() {
	const { products, setProducts, shouldFetchData, setCurrentProductData } = useProductContext();
	const { user } = useAuth();

	const [isFetching, setIsFetching] = useState(true);

	const api = async () => {
		if (!user) return;

		try {
			const getProductQuery = query(
				productCollectionRef,
				where("user_email", "==", user.email),
			);

			const productSnap = await getDocs(getProductQuery);

			if (productSnap.docs) {
				const products = productSnap.docs.map(
					(doc) => ({ ...doc.data(), id: doc.id }) as Product,
				);

				setProducts(products);
			}
		} catch (err) {
			console.log(err);
		} finally {
			setIsFetching(false);
		}
	};

	return { api, isFetching, setIsFetching,setCurrentProductData, products, shouldFetchData };
}
