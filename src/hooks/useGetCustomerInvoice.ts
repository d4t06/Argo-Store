import { invoiceCollectionRef } from "@/firebase/firebaseService";
import { getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { useState } from "react";

export default function useGetCustomerInvoice() {
	const [isFetching, setIsFetching] = useState(true);
	const [invoices, setInvoices] = useState<Invoice[]>([]);

	const getCustomerInvoices = async (id: string) => {
		try {
			const getQuery = query(
				invoiceCollectionRef,
				where("customer_id", "==", id),
				orderBy("created_at", "desc"),
				limit(20),
			);

			const docSnap = await getDocs(getQuery);

			if (docSnap.docs) {
				const invoices = docSnap.docs.map(
					(doc) => ({ ...doc.data(), id: doc.id }) as Invoice,
				);

				setInvoices(invoices);
			}
		} catch (err) {
			console.log(err);
		} finally {
			setIsFetching(false);
		}
	};

	return { getCustomerInvoices, isFetching, setIsFetching, invoices };
}
