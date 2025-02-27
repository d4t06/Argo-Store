import { createContext, ReactNode, useContext, useMemo, useRef, useState } from "react";

function useReceives() {
	const [receives, setReceives] = useState<Receiving[]>([]);
	const [currentReceivingId, setCurrentReceivingId] = useState("");

	const shouldFetchWarehouseEntries = useRef(true);

	const currentReceivingData = useMemo(() => {
		const index = receives.findIndex((i) => i.id === currentReceivingId);

		if (index === -1) return;
		else return { receiving: receives[index], index };
	}, [currentReceivingId, receives]);

	return {
		receives,
		setReceives,
		shouldFetchWarehouseEntries,
		setCurrentReceivingId,
		currentReceivingData,
	};
}

type ContextType = ReturnType<typeof useReceives>;

const Context = createContext<ContextType | null>(null);

export default function ReceivesProvider({ children }: { children: ReactNode }) {
	return <Context.Provider value={useReceives()}>{children}</Context.Provider>;
}

export const useReceivesContext = () => {
	const ct = useContext(Context);

	if (!ct) throw new Error("ReceivesProvider is not provided");

	return ct;
};
