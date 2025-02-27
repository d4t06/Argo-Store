import { createContext, ReactNode, useContext, useMemo, useRef, useState } from "react";

function useInvoice() {
	const [invoices, setInvoices] = useState<Invoice[]>([]);

	const [currentInvoiceId, setCurrentInvoiceId] = useState("");

	const shouldFetchInvoice = useRef(true);

	const currentInvoiceData = useMemo(() => {
		const index = invoices.findIndex((i) => i.id === currentInvoiceId);

		if (index === -1) return;
		else return { invoice: invoices[index], index };
	}, [currentInvoiceId, invoices]);

	return {
		invoices,
		setInvoices,
		setCurrentInvoiceId,
		currentInvoiceId,
		currentInvoiceData,
		shouldFetchInvoice,
	};
}

type ContextType = ReturnType<typeof useInvoice>;

const Context = createContext<ContextType | null>(null);

export default function InvoiceProvider({ children }: { children: ReactNode }) {
	return <Context.Provider value={useInvoice()}>{children}</Context.Provider>;
}

export const useInvoiceContext = () => {
	const ct = useContext(Context);

	if (!ct) throw new Error("InvoiceContext is not provided");

	return ct;
};
