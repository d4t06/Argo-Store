import { ReactNode } from "react";
import { Touchable, TouchableOpacity, View } from "react-native";
import { PlusIcon } from "react-native-heroicons/outline";

type Props = {
	children?: ReactNode;
	onPress?: () => void;
	className?: string;
};

export default function Empty({ children, className = "", onPress }: Props) {
	return (
		<View className={`w-full rounded-md overflow-hidden border  ${className}`}>
			<TouchableOpacity
				onPress={() => (onPress ? onPress() : () => {})}
				className={`pt-[100%] relateive ${!children ? "items-center justify-center" : ""}`}
			>
				{children || (
					<View className="absolute">
						<PlusIcon size={36} color={"black"} />
					</View>
				)}
			</TouchableOpacity>
		</View>
	);
}
