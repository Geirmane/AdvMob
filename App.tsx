import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ComponentScavenger from "./screens/ComponentScavenger";
import SpotifyLogin from "./screens/SpotifyLogin";
import SignUpScreen from "./screens/SignUpScreen";
import SpotiHome from "./screens/SpotiHome";
import SpotiProfile from "./screens/SpotiProfile";     // ✅ Profile screen
import SpotiSettings from "./screens/SpotiSettings";   // ✅ Settings screen
import SpotiPlaylistBuilder from "./screens/SpotiPlaylistBuilder"; // ✅ Playlist builder

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={ComponentScavenger} />
      <Stack.Screen name="SpotifyLogin" component={SpotifyLogin} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="SpotiHome" component={SpotiHome} />
      <Stack.Screen name="SpotiProfile" component={SpotiProfile} />
      <Stack.Screen name="SpotiSettings" component={SpotiSettings} />
      <Stack.Screen name="SpotiPlaylistBuilder" component={SpotiPlaylistBuilder} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
