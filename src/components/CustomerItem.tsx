import { Text, View } from "react-native";

type Props = {
  customer: Customer;
  className?: string;
};

export default function CustomerItem({
  customer,
  className = "p-2 border border-black/10 rounded-lg bg-white",
}: Props) {
  return (
    <View className={`flex-row w-full ${className}`}>
      <View className="ml-2">
        <Text className={`text-lg`}>{customer.customer_name}</Text>

        <View className="mt-1">
          {!!customer.phone_number && (
            <Text className="text-[#3f3f3f]">{customer.phone_number}</Text>
          )}
        </View>
      </View>
    </View>
  );
}
