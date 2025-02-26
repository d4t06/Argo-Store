import { Text, View } from "react-native";
import MyButton from "../MyButton";
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
    <ModalWrapper>
      <View className="text-xl mb-3">
        <Text className="text-xl font-semibold">{title || "Wait a minute"}</Text>
      </View>
      {!!desc && <Text className="font-semibold text-lg text-red-500">{desc}</Text>}

      <View className="flex-row gap-4 mt-5">
        <MyButton onPress={close} colors={"second"}>
          <Text className="text-[#1f1f1f]">Close</Text>
        </MyButton>
        <MyButton loading={loading} onPress={callback}>
          <Text className="text-white">Yes, Please</Text>
        </MyButton>
      </View>
    </ModalWrapper>
  );
}
