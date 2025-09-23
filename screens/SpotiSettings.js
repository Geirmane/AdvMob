import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setThemeMode } from "../store/themeSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

// 🌈 Expanded themes (dark + light + fun)
const presetThemes = [
  { mode: "light", bg: "#f5f5f5", text: "black" },
  { mode: "dark", bg: "#121212", text: "white" },
  { mode: "blue", bg: "#001F3F", text: "#7FDBFF" },
  { mode: "purple", bg: "#3D0C5E", text: "#DDA0FF" },
  { mode: "pink", bg: "#FFE4E1", text: "#C71585" },   // 🌸 Soft pink
  { mode: "mint", bg: "#E6FFFA", text: "#00796B" },   // 🌿 Fresh mint
  { mode: "sunny", bg: "#FFFACD", text: "#FF8C00" },  // ☀️ Sunny yellow
];

export default function SpotiSettings() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);

  const [fadeAnim] = React.useState(new Animated.Value(0));

  // Animate background when theme changes
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: presetThemes.findIndex((t) => t.mode === mode),
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [mode]);

  // Persist theme in storage
  useEffect(() => {
    AsyncStorage.setItem("theme", JSON.stringify({ mode }));
  }, [mode]);

  // Get current theme
  const currentTheme =
    presetThemes.find((t) => t.mode === mode) || presetThemes[0];

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: fadeAnim.interpolate({
            inputRange: presetThemes.map((_, i) => i),
            outputRange: presetThemes.map((t) => t.bg),
          }),
        },
      ]}
    >
      {/* 🔙 Header with Back Button */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backText, { color: currentTheme.text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.header, { color: currentTheme.text }]}>
          Settings
        </Text>
      </View>

      {/* 🌗 Dark Mode Switch */}
      <View style={styles.settingRow}>
        <Text style={[styles.settingText, { color: currentTheme.text }]}>
          Dark Mode
        </Text>
        <Switch
          value={mode === "dark"}
          onValueChange={(val) =>
            dispatch(setThemeMode(val ? "dark" : "light"))
          }
          thumbColor={mode === "dark" ? "#1DB954" : "#ccc"}
          trackColor={{ false: "#767577", true: "#1DB954" }}
        />
      </View>

      {/* 🎨 Theme Options */}
      <Text
        style={[
          styles.settingText,
          { marginTop: 20, color: currentTheme.text },
        ]}
      >
        Choose Theme:
      </Text>
      <View style={styles.accentRow}>
        {presetThemes.map((t) => (
          <TouchableOpacity
            key={t.mode}
            style={[
              styles.accentCircle,
              {
                backgroundColor: t.bg,
                borderWidth: t.mode === mode ? 3 : 0,
                borderColor: currentTheme.text,
              },
            ]}
            onPress={() => dispatch(setThemeMode(t.mode))}
          />
        ))}
      </View>

      {/* 📦 Preview Section */}
      <View
        style={[
          styles.previewBox,
          { backgroundColor: currentTheme.bg, borderColor: currentTheme.text },
        ]}
      >
        <Text style={{ color: currentTheme.text }}>Theme Preview</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  backText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
  },
  settingText: {
    fontSize: 16,
  },
  accentRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 15,
  },
  accentCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 15,
  },
  previewBox: {
    marginTop: 30,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
  },
});
