import { Stack, Tabs } from "expo-router";
import { Bars3Icon, HomeIcon } from "react-native-heroicons/outline";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "red" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <HomeIcon size={18} color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          tabBarIcon: ({ color }) => <Bars3Icon size={18} color={color} />,
        }}
      />

      {/*<Stack.Screen name="(screens)" />*/}
    </Tabs>
  );
}
