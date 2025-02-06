import { sleep } from "@/utils/appHelper";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

type ProductList = {
	id: number;
	title: string;
	image: string;
};

export default function HomeScreen() {
	const [products, setProducts] = useState<ProductList[]>([]);
	const [isFetching, setIsFetching] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	const api = async () => {
		try {
			setIsFetching(true);

			await sleep(1000);

			const res = await fetch("https://fakestoreapi.com/products");

			if (res.ok) {
				const payload = await res.json();
				setProducts(payload);
			}
		} catch (err) {
			console.log(err);
		} finally {
			setIsFetching(false);
		}
	};

	const handleRefresh = () => {
		setIsFetching(true);

		api();

		setRefreshing(false);
	};

	useEffect(() => {
		api();
	}, []);

	if (isFetching)
		return (
			<View className="flex-1 items-center justify-center">
				<ActivityIndicator />
				<Text>Loading...</Text>
			</View>
		);

	return (
		<>
			<Text>This is home page</Text>
			<FlatList
				data={products}
				renderItem={({ item }) => (
					<Link href={`/product/${item.id}`}>
						<View className="p-4 flex-row">
							<Image
								source={{ uri: item.image }}
								className="w-[70px] h-[70px] rounded-lg shadow-lg"
							/>
							<Text className="font-semibold ml-1">{item.title}</Text>
						</View>
					</Link>
				)}
				keyExtractor={(item) => item.id + ""}
				refreshing={refreshing}
				onRefresh={handleRefresh}
			/>
		</>
	);
}
