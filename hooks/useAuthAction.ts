import { useAuth } from "@/stores/AuthContext";
import { sleep } from "@/utils/appHelper";
import axios from "axios";
import { useRouter } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import { Route } from "expo-router/build/Route";
import { useState } from "react";

const BASE_URL =
	process.env.API_ENDPOINT || "https://hd-mobile-backend-ts.vercel.app/api";

const request = axios.create({
	baseURL: BASE_URL,
});

type AuthResponse = {
	store_name: string;
	token: string;
};

export default function useAuthAction() {
	const { setAuth } = useAuth();
	const [isFetching, setIsFetching] = useState(false);

	const router = useRouter();

	type Logout = {
		type: "logout";
	};

	type Login = {
		type: "login";
		phoneNumber: string;
		password: string;
	};

	type Register = {
		type: "register";
		phoneNumber: string;
		password: string;
	};

	const action = async (props: Login | Logout | Register) => {
		try {
			setIsFetching(true);

			if (process.env.NODE_ENV === "development") await sleep(300);

			switch (props.type) {
				case "login": {
					const res = await axios.post("/auth/login", props);
					const data = res.data.data as AuthResponse;

					if (data) {
						setAuth({
							token: data.token,
							storeName: data.store_name,
						});

						router.push("/");
					}
					break;
				}
				case "logout": {
					await request.get("/auth/logout");
					setAuth(null);

					router.push("/Login");
					break;
				}
				case "register": {
					setIsFetching(true);

					await axios.post("/auth/register", props);

					router.push("/Login");

					break;
				}
			}

			setIsFetching(false);
		} catch (error) {
			throw error;
		}
	};
	return { isFetching, action };
}
