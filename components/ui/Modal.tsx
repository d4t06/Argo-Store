import { Children, ReactNode } from "react";
import { Modal, View } from "react-native";

type Props = {
	children: ReactNode;
	isOpen: boolean;
	withInput?: boolean;
};

export default function MyModal({ children, isOpen, withInput }: Props) {
	return (
		<Modal
			visible={isOpen}
			transparent
			className="bg-red-500"
			animationType="fade"
			statusBarTranslucent
		>
			<View className="items-center justify-center flex-1 bg-black/40">
				{children}
			</View>
		</Modal>
	);
}

export function ModalWrapper({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<View className={`p-4 rounded-lg bg-white ${className}`}>{children}</View>
	);
}
