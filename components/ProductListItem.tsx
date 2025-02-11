import { Image, Text, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

type Props = {
	product: ProductList;
};

export default function ProductListItem({ product }: Props) {
	return (
		<View className="flex-row p-2 border border-black rounded-lg w-full bg-white">
			<Image
				source={{ uri: product.image }}
				className="w-[70px] h-[70px] rounded-lg shadow-lg"
			/>

			<View className="ml-2 max-w-[60%]">
				<ThemedText className="font-semibold ">{product.title}</ThemedText>
			</View>
			<View className="ml-auto flex-shrink-0">
				<ThemedText lightColor="red" className="font-[500] text-right">
					{product.price}
				</ThemedText>
				<ThemedText className="text-right">1pcs</ThemedText>
				<ThemedText lightColor="red" type="subtitle" className="mt-3 text-right">SL: 10</ThemedText>
			</View>
		</View>
	);
}
