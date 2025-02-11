import ProductListItem from "@/components/ProductListItem";
import { Products } from "@/constants/Product";
import useGetProducts from "@/hooks/useGetProducts";
import ProductSelectProvider, {
	useProductSelectContext,
} from "@/stores/SelectProductContext";
import { sleep } from "@/utils/appHelper";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

function Content() {
	const [refreshing, setRefreshing] = useState(false);

	const { select } = useProductSelectContext();
	const { api, isFetching, setIsFetching, products } = useGetProducts();

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
			<FlatList
				className="px-2"
				data={products}
				renderItem={({ item }) => (
					<TouchableOpacity onPress={() => select(item)}>
						<ProductListItem product={item} />
					</TouchableOpacity>
				)}
				keyExtractor={(item) => item.id + ""}
				refreshing={refreshing}
				onRefresh={handleRefresh}
				ItemSeparatorComponent={() => <View className="h-2" />}
			/>
		</>
	);
}

export default function HomeScreen() {
	return (
		<ProductSelectProvider>
			<Content />
		</ProductSelectProvider>
	);
}
