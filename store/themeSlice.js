// src/store/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark", // light | dark | custom
  accent: "#1DB954", // Spotify green
};

const presetAccents = [
  "#1DB954", // Spotify green
  "#FF3B30", // red
  "#FF9500", // orange
  "#007AFF", // iOS blue
  "#AF52DE", // lavender purple
  "#FF2D55", // pink
  "#34C759", // light green
  "#5AC8FA", // sky blue
];

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeMode: (state, action) => {
      state.mode = action.payload;
    },
    setAccent: (state, action) => {
      state.accent = action.payload;
    },
  },
});

export const { setThemeMode, setAccent } = themeSlice.actions;
export default themeSlice.reducer;
