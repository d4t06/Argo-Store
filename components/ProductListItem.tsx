import { Image, Text, View } from "react-native";

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
				<Text className="font-semibold ">{product.title}</Text>
			</View>
			<View className="ml-auto flex-shrink-0">
				<Text  className="font-[500] text-right">
					{product.price}
				</Text>
				<Text className="text-right">1pcs</Text>
				<Text  className="mt-3 text-right">SL: 10</Text>
			</View>
		</View>
	);
}
