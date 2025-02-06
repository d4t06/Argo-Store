import { useState } from "react";
import {
   Button,
   FlatList,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from "react-native";
import { PlusIcon } from "react-native-heroicons/outline";

export default function ProductsScreen() {

   const [] = useState<Product[]>([])

   return (
      <View className="flex-1">
         <View className="px-2 flex-row justify-between items-center bg-white">
            <TextInput
               placeholder="..."
               className="border-black/20 border rounded-md flex-grow"
            />
            <TouchableOpacity className="ml-10">
               <PlusIcon size={24} color={"black"} />
            </TouchableOpacity>
         </View>

         <FlatList className="bg-white" data={[]} renderItem={({ item }) => <Text>{item}</Text>} />
      </View>
   );
}
