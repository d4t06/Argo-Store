import { customerCollectionRef } from "@/firebase/firebaseService";
import { useAuth } from "@/stores/AuthContext";
import { useCustomerContext } from "@/stores/CustomerContext";
import { getDocs, query, where } from "firebase/firestore";
import { useState } from "react";

export default function useGetCustomer() {
	const { customers, setCustomers, shouldFetchCustomer } = useCustomerContext();
	const { user } = useAuth();

	const [isFetching, setIsFetching] = useState(true);

	const api = async () => {
		if (!user) return;

		try {
			const getQuery = query(
				customerCollectionRef,
				where("user_email", "==", user.email),
			);

			const snapShot = await getDocs(getQuery);

			if (snapShot.docs) {
				const items = snapShot.docs.map(
					(doc) => ({ ...doc.data(), id: doc.id }) as Customer,
				);

				setCustomers(items);
			}
		} catch (err) {
			console.log(err);
		} finally {
			setIsFetching(false);
		}
	};

	return { api, isFetching, setIsFetching, customers, shouldFetchCustomer, user };
}
