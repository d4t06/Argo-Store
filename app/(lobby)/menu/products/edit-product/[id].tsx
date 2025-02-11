import AddProductForm from "@/components/AddProductForm";
import useGetProductDetail from "@/hooks/useGetProductDetail";
import { ActivityIndicator, Text, View } from "react-native";

export default function EditProductScreen() {
  const { isFetching, product } = useGetProductDetail();

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

  return <AddProductForm variant="edit" product={product} />;
}
