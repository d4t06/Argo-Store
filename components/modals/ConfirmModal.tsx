import { View } from "react-native";
import { Button } from "react-native";
import { ThemedText } from "../ThemedText";
import { ModalWrapper } from "../ui/Modal";

type Props = {
	callback: () => void;
	title?: string;
	desc?: string;
	loading: boolean;
	className?: string;
	close: () => void;
};

export default function ConfirmModal({
	loading,
	callback,
	title,
	close,
	desc = "This action cannot be undone",
	className = "",
}: Props) {
	return (
		<View className={`w-[70%] ${className} ${loading ? "disable" : ""}`}>
			<View className="text-xl mb-3">
				<ThemedText type="subtitle">{title || "Wait a minute"}</ThemedText>
			</View>
			{desc && (
				<ThemedText className="font-semibold text-lg text-red-500">
					{desc}
				</ThemedText>
			)}

			<View className="flex-row gap-4 mt-5">
				<Button
					onPress={close}
					// className={`bg-white/10 border border-white/10 rounded-full px-3 py-0.5`}
					title="Close"
				/>
				<Button
					// className={`rounded-full px-3`}
					onPress={callback}
					title="Yes, please"
				/>
			</View>
		</View>
	);
}
