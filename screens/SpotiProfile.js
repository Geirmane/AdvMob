import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function SpotiProfile() {
  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <Image
        source={require("../Pictures/n1.jpg")} // profile picture
        style={styles.profileImage}
      />

      {/* Name & Email */}
      <Text style={styles.name}>German Felisarta IV</Text>
      <Text style={styles.email}>german@example.com</Text>

      {/* Edit Button */}
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
