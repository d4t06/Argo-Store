import { useAuth } from "@/stores/AuthContext";
import { sleep } from "@/utils/appHelper";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function usePersistAuth() {
	const { setAuth, setLoading, loading, auth } = useAuth();

	const router = useRouter();

	useEffect(() => {
		const auth = async () => {
			await sleep(1000);
			setLoading(false);
		};

		auth();
	}, []);

	useEffect(() => {
		if (loading) return;

		if (!auth) return router.push("/Login");
	}, [loading]);

	return { auth, loading };
}
