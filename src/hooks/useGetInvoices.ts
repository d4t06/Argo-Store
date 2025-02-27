import { invoiceCollectionRef } from "@/firebase/firebaseService";
import { getDocs, orderBy, query, where } from "firebase/firestore";
import { useState } from "react";
import { useAuth } from "@/stores/AuthContext";
import { useInvoiceContext } from "@/stores/local/InvoicesContext";

export default function useGetInvoice() {
	const { user } = useAuth();
	const [isFetching, setIsFetching] = useState(true);

	const { setInvoices, invoices, ...rest } = useInvoiceContext();

	const getInvoices = async () => {
		try {
			if (!user) return;

			const getQuery = query(
				invoiceCollectionRef,
				where("user_email", "==", user.email),
				orderBy("created_at", "desc"),
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

	return {
		getInvoices,
		isFetching,
		setIsFetching,
		invoices,
		...rest,
	};
}
