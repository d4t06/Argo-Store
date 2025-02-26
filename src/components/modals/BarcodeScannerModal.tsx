import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import MyButton from "../MyButton";
import {
	CameraView,
	CameraType,
	useCameraPermissions,
	BarcodeScanningResult,
} from "expo-camera";
import { ModalHeader, ModalWrapper } from "../ui/Modal";
import { sleep } from "@/utils/appHelper";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = { closeModal: () => void; onScanned: (code: string) => void };

export default function BarCodeScannerModal({ closeModal, onScanned }: Props) {
	const [facing, _setFacing] = useState<CameraType>("back");
	const [flashOn, setFlashOn] = useState(false);
	const [permission, requestPermission] = useCameraPermissions();

	const [scannedBarcode, setScanedBarcode] = useState("");

	const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
		setScanedBarcode(data);
	};

	const handleAfterScanned = async () => {
		const { sound } = await Audio.Sound.createAsync(
			require("@/assets/sound/scanner-beep.mp3"),
		);

		await sound.playAsync();
		await sleep(500);

		console.log(scannedBarcode);

		onScanned(scannedBarcode);
		closeModal();
	};

	useEffect(() => {
		if (scannedBarcode) handleAfterScanned();
	}, [scannedBarcode]);

	return (
		<ModalWrapper>
			<ModalHeader close={closeModal} title="Barcode Scanner" />

			<View className="items-center justify-center min-h-[40vh]">
				{permission === null && <Text>Requesting for camera permission</Text>}
				{!permission?.granted && (
					<>
						<Text>No access to camera</Text>
						<MyButton backStyle="mt-3" onPress={requestPermission}>
							<Text className="text-white">Grant permission</Text>
						</MyButton>
					</>
				)}

				{permission?.granted && (
					<>
						<CameraView
							onBarcodeScanned={handleBarCodeScanned}
							facing={facing}
							enableTorch={flashOn}
							style={{ width: 300, height: 200, borderRadius: 10 }}
						/>

						<View className="flex-row mt-5">
							<MyButton
								onPress={() => setFlashOn(!flashOn)}
								fontStyle="p-1"
								sizes={"clear"}
								active={flashOn}
							>
								{flashOn ? (
									<Ionicons name="flash-outline" size={24} color={"white"} />
								) : (
									<Ionicons name="flash-off-outline" color={"white"} />
								)}
							</MyButton>
						</View>
					</>
				)}
			</View>
		</ModalWrapper>
	);
}
