import { createContext, ReactNode, useContext, useMemo, useRef, useState } from "react";

function useCustomer() {
	const [customers, setCustomers] = useState<Customer[]>([]);

	const [currentCustomerId, setCurrentCustomerId] = useState("");

	const shouldFetchCustomer = useRef(true);

	const currentCustomerData = useMemo(() => {
		const index = customers.findIndex((p) => p.id === currentCustomerId);

		if (index === -1) return;
		else return { customer: customers[index], index };
	}, [customers, currentCustomerId]);

	return {
		customers,
		setCustomers,
		currentCustomerData,
		shouldFetchCustomer,
		setCurrentCustomerId,
	};
}

type ContextType = ReturnType<typeof useCustomer>;

const Context = createContext<ContextType | null>(null);

export default function CustomerProvider({ children }: { children: ReactNode }) {
	return <Context.Provider value={useCustomer()}>{children}</Context.Provider>;
}

export const useCustomerContext = () => {
	const ct = useContext(Context);

	if (!ct) throw new Error("Customer context is not provided");

	return ct;
};
