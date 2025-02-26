import { auth } from "@/firebase/firebase";
import { useAuth } from "@/stores/AuthContext";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { useState } from "react";

export default function useAuthAction() {
	const { user, justRegistered } = useAuth();
	const [isFetching, setIsFetching] = useState(false);

	type Logout = {
		type: "logout";
	};

	type Login = {
		type: "login";
		email: string;
		password: string;
	};

	type Register = {
		type: "register";
		email: string;
		password: string;
	};

	const action = async (props: Login | Logout | Register) => {
		try {
			setIsFetching(true);

			switch (props.type) {
				case "login": {
					await signInWithEmailAndPassword(auth, props.email, props.password);

					break;
				}
				case "logout": {
					await signOut(auth);

					break;
				}
				case "register": {
					setIsFetching(true);

					justRegistered.current = true;
					await createUserWithEmailAndPassword(auth, props.email, props.password);

					break;
				}
			}

			setIsFetching(false);
		} catch (error) {
			throw error;
		} finally {
			setIsFetching(false);
		}
	};
	return { isFetching, action, user };
}
