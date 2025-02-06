import { Stack, Tabs } from "expo-router";
import { Bars3Icon, HomeIcon } from "react-native-heroicons/outline";

export default function TabLayout() {
   return (
      <Tabs
         screenOptions={{ tabBarActiveTintColor: "red", headerShown: false }}
      >
         <Tabs.Screen
            name="index"
            options={{
               title: "Home",
               tabBarIcon: ({ color }) => <HomeIcon size={24} color={color} />,
            }}
         />
         <Tabs.Screen
            name="menu"
            options={{
               title: "Menu",
               tabBarIcon: ({ color }) => <Bars3Icon size={24} color={color} />,
            }}
         />
      </Tabs>
   );
}
