import { useAuth } from "@/stores/AuthContext";
import { useEffect } from "react";
import { auth } from "@/firebase/firebase";
import { myGetDoc, mySetDoc } from "@/firebase/firebaseService";

export default function usePersistAuth() {
	const { setUser, setLoading, loading, justRegistered } = useAuth();

	useEffect(() => {
		const handleGetAuth = async () => {
			auth.onAuthStateChanged(async (u) => {
				if (u && u.email) {
					if (justRegistered.current) {
						justRegistered.current = false;

						const user: User = {
							email: u.email,
							address: "",
							phone_number: "",
							store_name: `${u.email}'s Store`,
						};

						await mySetDoc({
							collection: "Users",
							data: user,
							id: u.email,
						});

						setUser(user);
					} else {
						const docRef = await myGetDoc({ collection: "Users", id: u.email });
						setUser(docRef.data() as User);
					}
				} else setUser(null);

				setLoading(false);
			});
		};

		handleGetAuth();
	}, []);

	return { auth, loading };
}
