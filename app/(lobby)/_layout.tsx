import RequireAuth from "@/components/RequireAuth";
import usePersistAuth from "@/hooks/usePersistAuth";
import { useAuth } from "@/stores/AuthContext";
import { Stack, Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Bars3Icon, HomeIcon } from "react-native-heroicons/outline";

export default function TabLayout() {
  return (
    <RequireAuth>
      <Tabs
        screenOptions={{ tabBarActiveTintColor: "red", headerShown: false }}
      >
        <Tabs.Screen
          name="Home"
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
    </RequireAuth>
  );
}
