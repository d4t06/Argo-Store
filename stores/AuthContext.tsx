import { createContext, ReactNode, useContext, useState } from "react";
import { FlagIcon } from "react-native-heroicons/outline";

type Auth = {
	token: string;
	storeName: string;
};

const useAuthContext = () => {
	const [auth, setAuth] = useState<Auth | null>(null);

	const [loading, setLoading] = useState(true);

	return { auth, setAuth, loading, setLoading };
};

type ContextType = ReturnType<typeof useAuthContext>;

const Context = createContext<ContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
	return (
		<Context.Provider value={useAuthContext()}>{children}</Context.Provider>
	);
}

export function useAuth() {
	const ct = useContext(Context);
	if (!ct) throw new Error("auth context not Provided");

	return ct;
}
