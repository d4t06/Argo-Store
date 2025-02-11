import MyButton from "@/components/MyButton";
import useAuthAction from "@/hooks/useAuthAction";
import { Switch, Text, View } from "react-native";
import { ArrowRightStartOnRectangleIcon } from "react-native-heroicons/outline";

export default function SettingScreen() {
  const { action } = useAuthAction();

  const handleLogout = async () => {
    await action({ type: "logout" });
  };

  return (
    <View className="flex-1 items-center">
      <View className="flex-row items-center justify-between w-full bg-white p-2 border-b border-black/10">
        <Text className="text-lg">Dark mode</Text>
        <Switch />
      </View>

      <MyButton onPress={handleLogout} backStyle="mt-auto mb-5">
        <ArrowRightStartOnRectangleIcon color={"white"} size={24} />
        <Text className="text-white"> Log out</Text>
      </MyButton>
    </View>
  );
}
