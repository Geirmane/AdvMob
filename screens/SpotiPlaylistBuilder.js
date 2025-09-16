import React, { useReducer, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Reducer for managing playlist
function playlistReducer(state, action) {
  switch (action.type) {
    case "SET":
      return { ...state, songs: action.payload }; // Load from storage
    case "ADD":
      return { ...state, songs: [...state.songs, action.payload] };
    case "REMOVE":
      return {
        ...state,
        songs: state.songs.filter((_, index) => index !== action.payload),
      };
    case "CLEAR":
      return { ...state, songs: [] };
    default:
      return state;
  }
}

export default function SpotiPlaylistBuilder() {
  const [state, dispatch] = useReducer(playlistReducer, { songs: [] });
  const [song, setSong] = useState("");

  // Load playlist from storage on mount
  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        const storedSongs = await AsyncStorage.getItem("playlist");
        if (storedSongs) {
          dispatch({ type: "SET", payload: JSON.parse(storedSongs) });
        }
      } catch (e) {
        console.error("Failed to load playlist", e);
      }
    };
    loadPlaylist();
  }, []);

  // Save playlist whenever it changes
  useEffect(() => {
    const savePlaylist = async () => {
      try {
        await AsyncStorage.setItem("playlist", JSON.stringify(state.songs));
      } catch (e) {
        console.error("Failed to save playlist", e);
      }
    };
    savePlaylist();
  }, [state.songs]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require("../Pictures/g4.jpg")}
          style={styles.profileImage}
        />
        <Text style={styles.name}>German Felisarta IV</Text>
      </View>

      {/* Input */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter song name..."
          placeholderTextColor="#aaa"
          value={song}
          onChangeText={setSong}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            if (song.trim() !== "") {
              dispatch({ type: "ADD", payload: song });
              setSong("");
            }
          }}
        >
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Song List */}
      <FlatList
        data={state.songs}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.songRow}>
            <Text style={styles.songText}>{item}</Text>
            <TouchableOpacity
              onPress={() => dispatch({ type: "REMOVE", payload: index })}
            >
              <Text style={styles.removeText}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Clear Button */}
      <TouchableOpacity
        style={styles.clearButton}
        onPress={() => dispatch({ type: "CLEAR" })}
      >
        <Text style={styles.clearText}>Clear Playlist</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  name: { color: "white", fontSize: 18, fontWeight: "bold" },
  header: { fontSize: 22, fontWeight: "bold", color: "white", marginBottom: 20 },
  inputRow: { flexDirection: "row", marginBottom: 20 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#333",
    padding: 10,
    borderRadius: 8,
    color: "white",
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#1DB954",
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 8,
  },
  addText: { color: "white", fontWeight: "bold" },
  songRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  songText: { color: "white", fontSize: 16 },
  removeText: { color: "red", fontSize: 16 },
  clearButton: {
    marginTop: 20,
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  clearText: { color: "white", fontWeight: "bold" },
});
