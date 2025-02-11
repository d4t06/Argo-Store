import { useAuth } from "@/stores/AuthContext";
import { sleep } from "@/utils/appHelper";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function usePersistAuth() {
	const { setAuth, setLoading, loading, auth } = useAuth();

	const router = useRouter();

	useEffect(() => {
		const handleGetAuth = async () => {
			await sleep(1000);
			setLoading(false);
		};

		handleGetAuth();
	}, []);

	return { auth, loading };
}
