import ConfirmModal from "@/components/modals/ConfirmModal";
import { ThemedText } from "@/components/ThemedText";
import MyModal, { ModalWrapper } from "@/components/ui/Modal";
import MyButton from "@/components/ui/MyButton";
import useGetProductDetail from "@/hooks/useGetProductDetail";
import useTheme from "@/hooks/useTheme";
import { Link, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
	ActivityIndicator,
	Image,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import {
	Bars3Icon,
	PencilIcon,
	TrashIcon,
} from "react-native-heroicons/outline";

type Modal = "delete";

export default function ProductDetailScreen() {
	const { isFetching, product } = useGetProductDetail();

	const [modal, setModal] = useState<Modal | "">("");

	const theme = useTheme();

	if (isFetching)
		return (
			<View className="flex-1 items-center justify-center">
				<ActivityIndicator />
				<Text>Loading...</Text>
			</View>
		);

	if (!product)
		return (
			<View className="flex-1 items-center justify-center">
				<Text>Not found</Text>
			</View>
		);

	return (
		<View className="flex-1">
			<View className="items-center mt-5">
				<Image
					source={{ uri: product.image }}
					className="w-[200px] h-[200px] rounded-lg shadow-lg"
				/>
			</View>

			<View className="px-2 mt-5">
				<ThemedText type="subtitle">{product.title}</ThemedText>
				<ThemedText type="subtitle" className="mt-3">
					Price:
					<Text className="text-red-500">{product.price}</Text>
				</ThemedText>
			</View>

			<View className="flex-row mt-5 justify-center">
				<Link
					className="bg-[#5e9387] p-3 rounded-full"
					href={`/menu/products/edit-product/${product.id}`}
				>
					<PencilIcon size={24} color={"white"} />
				</Link>

				<TouchableOpacity
					onPress={() => setModal("delete")}
					className="bg-[#5e9387] ml-2 p-3 rounded-full"
				>
					<TrashIcon size={24} color={"white"} />
				</TouchableOpacity>
			</View>

			<MyModal isOpen={!!modal}>
				<ModalWrapper>
					<ConfirmModal
						callback={() => {}}
						close={() => setModal("")}
						loading={false}
					/>
				</ModalWrapper>
			</MyModal>
		</View>
	);
}
