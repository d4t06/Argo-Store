import MyButton from "@/components/MyButton";
import useAuthAction from "@/hooks/useAuthAction";
import { Link } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function RegisterScreen() {
	const { isFetching, action } = useAuthAction();

	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleRegister = async () => {
		try {
			await action({ type: "register", phoneNumber, password });
		} catch (error: any) {
			if (!error?.response) {
				setErrorMessage("No server response");
			} else if (error?.response.status === 409) {
				setErrorMessage("This phone number already registed !");
			} else {
				setErrorMessage("Register fail");
			}

			console.log(error);
		}
	};

	const classes = {
		input: "w-1/2 rounded-md border border-black/20 p-3",
	};

	return (
		<View
			className={`flex-1 items-center justify-center gap-2 ${isFetching ? "opacity-[40]" : ""}`}
		>
			<Text className="text-3xl font-bold">Register</Text>
			{errorMessage && (
				<Text className="px-4 py-2 text-white bg-red-500 rounded-xl">
					{errorMessage}
				</Text>
			)}

			<TextInput
				value={phoneNumber}
				onChangeText={setPhoneNumber}
				className={`${classes.input} mt-5`}
				placeholder="Phone number"
				placeholderTextColor={'#ccc'}

			/>
			<TextInput
				value={password}
				onChangeText={setPassword}
				className={classes.input}
				placeholderTextColor={'#ccc'}
				placeholder="Password"
			/>

			<MyButton backStyle="mt-6" onPress={handleRegister}>
				<Text className="text-white font-[500] text-lg">Register</Text>
			</MyButton>

			<Text>or</Text>

			<Link href={"/"} className="mt-3">
				<MyButton>
					<Text className="text-white">Login</Text>
				</MyButton>
			</Link>
		</View>
	);
}
