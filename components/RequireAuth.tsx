import { useAuth } from "@/stores/AuthContext";
import { useRouter } from "expo-router";
import { Redirect, Slot } from "expo-router";
import { ReactNode, useEffect } from "react";
import { Text } from "react-native";

type Props = {
	children: ReactNode;
};

export default function RequireAuth({ children }: Props) {
	const { auth } = useAuth();

	const router = useRouter();

	useEffect(() => {
		if (!auth) router.replace("/");
	}, [auth]);

	return children;

	// return <Redirect href={"/"} />;
}
