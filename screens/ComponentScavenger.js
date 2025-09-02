import React from "react";
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function ComponentScavenger({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <Text style={styles.title}>👋 Welcome to German's App!</Text>
      <Text style={styles.subtitle}>Explore React Native components in action</Text>

      {/* Card Section */}
      <View style={styles.card}>
        <Image source={require("../Pictures/n1.jpg")} style={styles.image} />
        <Text style={styles.cardText}>
          This screen demonstrates using <Text style={styles.highlight}>Text</Text>,{" "}
          <Text style={styles.highlight}>Button</Text>,{" "}
          <Text style={styles.highlight}>Image</Text>, and{" "}
          <Text style={styles.highlight}>ScrollView</Text>.
        </Text>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.appButton} onPress={() => alert("Button Pressed!")}>
          <Text style={styles.appButtonText}>Click Me!</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.appButton} onPress={() => alert("Second Button Pressed!")}>
          <Text style={styles.appButtonText}>Second Button</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.appButton} onPress={() => alert("Third Button Pressed!")}>
          <Text style={styles.appButtonText}>Third Button</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.appButton} onPress={() => alert("Fourth Button Pressed!")}>
          <Text style={styles.appButtonText}>Fourth Button</Text>
        </TouchableOpacity>
      </View>

      {/* Final Button */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Wazzup Sir</Text>
        <TouchableOpacity
          style={styles.finalButton}
          onPress={() => navigation.navigate("SpotifyLogin")}
        >
          <Text style={styles.finalButtonText}>Go to Spotify Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f0f4f8",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 15,
    marginBottom: 15,
  },
  cardText: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
  },
  highlight: {
    fontWeight: "bold",
    color: "#1DB954",
  },
  buttonGroup: {
    width: "100%",
    marginVertical: 20,
  },
  appButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 14,
    borderRadius: 30,
    marginVertical: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  appButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 30,
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    marginBottom: 15,
    color: "#333",
  },
  finalButton: {
    backgroundColor: "#000",
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 35,
  },
  finalButtonText: {
    color: "#1DB954",
    fontSize: 16,
    fontWeight: "bold",
  },
});
