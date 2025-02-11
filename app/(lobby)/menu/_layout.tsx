import { useAuth } from "@/stores/AuthContext";
import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="setting" options={{ title: "Settings" }} />
      <Stack.Screen name="products/index" options={{ title: "Products" }} />
      <Stack.Screen name="customers/index" options={{ title: "Cusomters" }} />
      <Stack.Screen name="bills/index" options={{ title: "Bills" }} />
    </Stack>
  );
}
