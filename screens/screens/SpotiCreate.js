import React, { useReducer, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const initialState = {
  playlist: [],
  history: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_SONG":
      if (!action.song.trim()) return state;
      return {
        ...state,
        playlist: [...state.playlist, action.song],
        history: [...state.history, `Added: ${action.song}`],
      };
    case "REMOVE_SONG":
      return {
        ...state,
        playlist: state.playlist.filter((_, i) => i !== action.index),
        history: [...state.history, `Removed: ${state.playlist[action.index]}`],
      };
    case "CLEAR":
      return {
        ...state,
        playlist: [],
        history: [...state.history, "Cleared Playlist"],
      };
    default:
      return state;
  }
}

export default function SpotiCreate() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [song, setSong] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎵 Create Your Playlist</Text>

      {/* Input + Add Button */}
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
            dispatch({ type: "ADD_SONG", song });
            setSong("");
          }}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Playlist */}
      <Text style={styles.sectionTitle}>Playlist</Text>
      {state.playlist.length === 0 ? (
        <Text style={styles.empty}>No songs yet.</Text>
      ) : (
        <FlatList
          data={state.playlist}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.songRow}>
              <Text style={styles.song}>{item}</Text>
              <TouchableOpacity
                onPress={() => dispatch({ type: "REMOVE_SONG", index })}
              >
                <Text style={styles.remove}>❌</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Clear Button */}
      <TouchableOpacity
        style={styles.clearButton}
        onPress={() => dispatch({ type: "CLEAR" })}
      >
        <Text style={styles.buttonText}>Clear Playlist</Text>
      </TouchableOpacity>

      {/* History */}
      <Text style={styles.sectionTitle}>History</Text>
      <FlatList
        data={state.history}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.history}>{item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "white", marginBottom: 20 },
  inputRow: { flexDirection: "row", marginBottom: 15 },
  input: {
    flex: 1,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "white",
  },
  addButton: {
    backgroundColor: "#1DB954",
    marginLeft: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonText: { color: "white", fontWeight: "bold" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "white", marginTop: 20 },
  empty: { color: "#aaa", marginTop: 10 },
  songRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1e1e1e",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  song: { color: "white", fontSize: 16 },
  remove: { color: "red", fontSize: 16 },
  clearButton: {
    backgroundColor: "#b00020",
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  history: { color: "#aaa", fontSize: 12, marginTop: 3 },
});
