/**
 * Updated App.tsx to use ComponentScavenger screen
 */

import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ComponentScavenger from "./screens/ComponentScavenger";

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <ComponentScavenger />
    </SafeAreaProvider>
  );
}

export default App;
