import { sleep } from "@/utils/appHelper";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";

type Product = {
	id: number;
	title: string;
	image: string;
	description: string;
	price: number;
};

export default function ProductDetailPage() {
	const { id } = useLocalSearchParams();

	const [product, setProduct] = useState<Product>();
	const [isFetching, setIsFetching] = useState(true);

	useEffect(() => {
		const api = async () => {
			try {
				await sleep(1000);

				const res = await fetch("https://fakestoreapi.com/products/" + id);

				if (res.ok) {
					const payload = await res.json();
					setProduct(payload);
				}
			} catch (err) {
				console.log(err);
			} finally {
				setIsFetching(false);
			}
		};

		if (typeof id !== "string" || isNaN(+id)) return;

		api();
	}, []);

	if (isFetching)
		return (
			<View className="flex-1 items-center justify-center">
				<ActivityIndicator size={'large'} />
				<Text>Loading...</Text>
			</View>
		);

	if (!product)
		return (
			<View className="flex-1 items-center justify-center">
				<Text>Not found</Text>;
			</View>
		);

	return (
		<>
			<View className="items-center mt-5">
				<Image
					source={{ uri: product.image }}
					className="w-[200px] h-[200px] rounded-lg shadow-lg"
				/>
				<Text className="font-semibold">{product.title}</Text>
				<Text className="mt-3">{product.description}</Text>
			</View>
		</>
	);
}
