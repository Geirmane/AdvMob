import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import store from "./store/store";
import { setThemeMode, setAccent } from "./store/themeSlice";

import ComponentScavenger from "./screens/ComponentScavenger";
import SpotifyLogin from "./screens/SpotifyLogin";
import SignUpScreen from "./screens/SignUpScreen";
import SpotiHome from "./screens/SpotiHome";
import SpotiProfile from "./screens/SpotiProfile";
import SpotiSettings from "./screens/SpotiSettings";
import SpotiPlaylistBuilder from "./screens/SpotiPlaylistBuilder";
import MapScreen from "./screens/MapScreen";


const Stack = createStackNavigator();

// Load theme from storage before showing screens
const ThemeLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");
        if (savedTheme) {
          const { mode, accent } = JSON.parse(savedTheme);
          if (mode) dispatch(setThemeMode(mode));
          if (accent) dispatch(setAccent(accent));
        }
      } catch (e) {
        console.log("Error loading theme:", e);
      }
    })();
  }, [dispatch]);

  return <>{children}</>;
};

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
      <Stack.Screen name="MapScreen" component={MapScreen} />

    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        <NavigationContainer>
          <ThemeLoader>
            <MainStack />
          </ThemeLoader>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
