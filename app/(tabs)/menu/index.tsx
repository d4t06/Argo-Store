import { Href, useRouter } from "expo-router";
import { ReactNode } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import {
   ArchiveBoxIcon,
   ClipboardDocumentListIcon,
   Cog6ToothIcon,
   UserIcon,
} from "react-native-heroicons/outline";

type LinkItemProps = {
   href: Href;
   icon: ReactNode;
   title: string;
};

function LinkItem({ icon, href, title }: LinkItemProps) {
   const router = useRouter();

   const classes = {
      col: "px-1 w-1/2 mt-2 h-[100px]",
      menuItem: "border h-full rounded-lg items-center justify-center",
   };

   return (
      <View className={classes.col}>
         <TouchableOpacity
            onPress={() => router.push(href)}
            className={classes.menuItem}
         >
            {icon}
            <Text className="text-lg font-[500]">{title}</Text>
         </TouchableOpacity>
      </View>
   );
}

export default function MenuScreen() {
   type Link = {
      href: Href;
      icon: ReactNode;
      title: string;
   };

   const routes: Link[] = [
      {
         href: "/menu/products",
         icon: <ArchiveBoxIcon size={24} color={"black"} />,
         title: "Products",
      },
      {
         href: "/menu/customers",
         icon: <UserIcon size={24} color={"black"} />,
         title: "Customer",
      },
      {
         href: "/menu/bills",
         icon: <ClipboardDocumentListIcon size={24} color={"black"} />,
         title: "Bills",
      },
      {
         href: "/menu/setting",
         icon: <Cog6ToothIcon size={24} color={"black"} />,
         title: "Setting",
      },
   ];

   return (
      <View className="flex-1">
         <View className="h-[100px] bg-white flex-row items-center px-2">
            <View className="w-[66px] h-[66px] bg-[#f1f1f1] items-end justify-center rounded-full">
               {/* <Text className="text-2xl">D</Text> */}
            </View>
            <Text className="text-2xl font-[500] ml-2">Nguyen Huu Dat</Text>
         </View>

         <ScrollView className="bg-white">
            <View className="px-2">
               <View className="flex-row flex-wrap -mx-1">
                  {routes.map((item, i) => (
                     <LinkItem key={i} {...item} />
                  ))}
               </View>
            </View>
         </ScrollView>
      </View>
   );
}
