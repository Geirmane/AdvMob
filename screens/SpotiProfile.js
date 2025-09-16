import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SpotiProfile() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Profile Image */}
      <Image
        source={require("../Pictures/g4.jpg")} // profile picture
        style={styles.profileImage}
      />

      {/* Name & Email */}
      <Text style={styles.name}>German Felisarta IV</Text>
      <Text style={styles.email}>gfelisarta44@gmail.com</Text>

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
    justifyContent: "flex-start",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingTop: 40,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  backText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    marginTop: 40,
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
