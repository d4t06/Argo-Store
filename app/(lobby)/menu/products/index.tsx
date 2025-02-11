import ProductListItem from "@/components/ProductListItem";
import { Products } from "@/constants/Product";
import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, TextInput, TouchableOpacity, View } from "react-native";
import { MagnifyingGlassIcon, PlusIcon } from "react-native-heroicons/outline";

export default function ProductsScreen() {
  const [] = useState<ProductList[]>([]);

  return (
    <View className="flex-1">
      <View className="px-2">
        <View className="px-2 bg-white flex-row justify-between items-center mt-3 border-black/20 border rounded-md">
          <TextInput placeholder="..." className="flex-grow" />
          <MagnifyingGlassIcon size={24} color={"black"} />
        </View>
      </View>

      <FlatList
        className="px-2 mt-3"
        data={Products}
        renderItem={({ item: p }) => (
          <Link className="w-full" href={`/menu/products/${p.id}`}>
            <ProductListItem product={p} />
          </Link>
        )}
        keyExtractor={(p) => p.id + ""}
        ItemSeparatorComponent={() => <View className="h-4" />}
      />

      <Link
        className="absolute bottom-10 right-5 bg-[#5e9387] p-3 rounded-full"
        href={"/menu/products/add-product"}
      >
        <PlusIcon size={24} color={"white"} />
      </Link>
    </View>
  );
}
