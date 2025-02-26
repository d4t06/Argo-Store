import { createContext, ReactNode, useContext, useRef, useState } from "react";

const useAuthContext = () => {
	const [user, setUser] = useState<User | null>(null);

	const [loading, setLoading] = useState(true);

	const justRegistered = useRef(false);

	return { user, setUser, loading, setLoading, justRegistered };
};

type ContextType = ReturnType<typeof useAuthContext>;

const Context = createContext<ContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
	return <Context.Provider value={useAuthContext()}>{children}</Context.Provider>;
}

export function useAuth() {
	const ct = useContext(Context);
	if (!ct) throw new Error("auth context not Provided");

	return ct;
}
