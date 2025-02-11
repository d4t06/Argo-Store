import usePersistAuth from "@/hooks/usePersistAuth";
import { useAuth } from "@/stores/AuthContext";
import { Stack, Tabs, useRouter } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { Bars3Icon, HomeIcon } from "react-native-heroicons/outline";

export default function TabLayout() {
  const { auth, loading } = usePersistAuth();

  if (loading)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
        <Text>Loading...</Text>
      </View>
    );

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "red", headerShown: false }}>
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
