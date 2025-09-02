import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function SpotifyLogin() {
  const [isSignUp, setIsSignUp] = useState(false); // toggle between login/signup

  return (
    <View style={styles.container}>
      {/* Logo and Title */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../Pictures/spoti.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Spotify</Text>
      </View>

      {/* If user is in SignUp mode */}
      {isSignUp ? (
        <>
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
          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Switch back to Login */}
          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Text style={styles.signUp} onPress={() => setIsSignUp(false)}>
              Sign In
            </Text>
          </Text>
        </>
      ) : (
        <>
          {/* Username Input */}
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#aaa"
          />

          {/* Password Input */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
          />

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotContainer}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>

          {/* Divider */}
          <Text style={styles.orText}>Be Correct With</Text>

          {/* Social Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialText}>f</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialText}>G</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <Text style={styles.footerText}>
            Don’t have an account?{" "}
            <Text style={styles.signUp} onPress={() => setIsSignUp(true)}>
              Sign Up
            </Text>
          </Text>
        </>
      )}
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
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
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
  forgotContainer: {
    alignSelf: "flex-end",
    marginBottom: 30,
  },
  forgotText: {
    color: "#aaa",
    fontSize: 14,
  },
  signInButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#1DB954",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  signInText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  orText: {
    color: "#aaa",
    marginVertical: 10,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
    marginBottom: 30,
  },
  socialButton: {
    backgroundColor: "#1e1e1e",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  socialText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  footerText: {
    color: "#aaa",
  },
  signUp: {
    color: "#1DB954",
    fontWeight: "bold",
  },
});
