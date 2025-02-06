import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function MenuScreen() {
	return (
		<>
			<Text>This is menu page</Text>

			<Link className="border p-2" href={"/user"}>Go to user screen</Link>
			<Link className="border p-2" href={"/order"}>Go to order screen</Link>
		</>
	);
}
