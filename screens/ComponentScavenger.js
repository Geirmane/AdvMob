import React from "react";
import { View, Text, Button, Image, ScrollView, StyleSheet } from "react-native";

export default function ComponentScavenger() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to German's App!</Text>

      <Image
        source={require("../Pictures/n1.jpg")}
        style={styles.image}
      />

      <Text style={styles.text}>
        This screen demonstrates using Text, Button, Image, and ScrollView.
      </Text>

      <Button title="Click Me!" onPress={() => alert("Button Pressed!")} />

      {/* Extra content for scrolling */}
      <Text style={styles.text}>Here is some more sample content...</Text>
      <Button title="Second Button" onPress={() => alert("Second Button Pressed!")} />

      <Text style={styles.text}>Keep scrolling for more!</Text>
      <Button title="Third Button" onPress={() => alert("Third Button Pressed!")} />

      <Text style={styles.text}>Almost there, just a little more scrolling...</Text>
      <Button title="Fourth Button" onPress={() => alert("Fourth Button Pressed!")} />

      <Text style={styles.text}>You made it to the bottom of the scroll!</Text>
      <Button title="Final Button" onPress={() => alert("Final Button Pressed!")} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
  },
});
