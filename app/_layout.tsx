import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
// import { StatusBar } from "expo-status-bar";
import { ReactNode, useEffect } from "react";
import "react-native-reanimated";
import "./global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import ProductsProvider from "@/stores/Products";
import AuthProvider from "@/stores/AuthContext";
import usePersistAuth from "@/hooks/usePersistAuth";
import { ActivityIndicator, Text, View } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutAuth() {
  const { auth, loading } = usePersistAuth();

  if (loading)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
        <Text>Loading...</Text>
      </View>
    );

  return <Slot />;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ProductsProvider>
      <AuthProvider>
        <RootLayoutAuth />
      </AuthProvider>
    </ProductsProvider>
  );
}
