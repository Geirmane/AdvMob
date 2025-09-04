import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function SignUpScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo and Title side by side */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../Pictures/spoti.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Spotify</Text>
      </View>

      {/* Full Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#aaa"
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
      />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Back to Login */}
      <Text style={styles.footerText}>
        Already have an account?{" "}
        <Text
          style={styles.signIn}
          onPress={() => navigation.goBack()}
        >
          Sign In
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logoContainer: {
    flexDirection: "row",  // side by side
    alignItems: "center",  // vertically centered
    marginBottom: 40,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 10, // space between logo and text
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#1e1e1e",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "white",
    marginBottom: 15,
  },
  signUpButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#1DB954",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  signUpText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  footerText: {
    color: "#aaa",
  },
  signIn: {
    color: "#1DB954",
    fontWeight: "bold",
  },
});
