import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ComponentScavenger from "./screens/ComponentScavenger";
import SpotifyLogin from "./screens/SpotifyLogin";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={ComponentScavenger} />
          <Stack.Screen name="SpotifyLogin" component={SpotifyLogin} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
