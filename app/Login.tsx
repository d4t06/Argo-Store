import MyButton from "@/components/MyButton";
import useAuthAction from "@/hooks/useAuthAction";
import { Link } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
	const { isFetching, action } = useAuthAction();

	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const ableToSubmit = password && phoneNumber;

	const handleLogin = async () => {
		try {
			await action({ type: "login", phoneNumber, password });
		} catch (error: any) {
			if (!error?.response) {
				setErrorMessage("No server response");
			} else if (error?.response.status === 401) {
				setErrorMessage("Phone number or password is incorrect !");
			} else {
				setErrorMessage("Sign in fail");
			}

			console.log(error);
		}
	};

	const classes = {
		input: "w-1/2 rounded-md border border-black/20",
	};

	return (
		<View
			className={`flex-1 items-center justify-center gap-2 ${isFetching ? "opacity-[40]" : ""}`}
		>
			<Text className="text-3xl font-bold">Best App Ever</Text>
			{errorMessage && (
				<Text className="px-4 py-2 text-white bg-red-500 rounded-xl">
					{errorMessage}
				</Text>
			)}
			<TextInput
				value={phoneNumber}
				onChangeText={setPhoneNumber}
				className={classes.input}
				placeholder="Phone number"
			/>
			<TextInput
				value={password}
				onChangeText={setPassword}
				className={classes.input}
				placeholder="Password"
			/>
			<MyButton disabled={!ableToSubmit} onPress={handleLogin} backStyle="mt-3">
				<Text className="text-white text-lg">Login</Text>
			</MyButton>
			<Text>or</Text>
			<Link href={"/Register"} className="mt-3">
				<MyButton colors={"second"}>
					<Text className="text-white">Register</Text>
				</MyButton>
			</Link>
		</View>
	);
}
