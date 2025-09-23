import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";

const allGenres = ["Pop", "Rock", "Jazz", "Classical", "Hip-Hop"];

// 🎨 Profile Preview with fade-in animation
const ProfilePreview = ({ username, email, genres, fadeAnim, profileImage }) => {
  return (
    <Animated.View style={[styles.previewCard, { opacity: fadeAnim }]}>
      <Image
        source={profileImage ? { uri: profileImage } : require("../Pictures/g4.jpg")}
        style={styles.previewImage}
      />
      <Text style={styles.previewText}>{username || "Username"}</Text>
      <Text style={styles.previewText}>{email || "Email"}</Text>
      <Text style={styles.previewText}>
        {genres.length > 0 ? genres.join(", ") : "Genres"}
      </Text>
    </Animated.View>
  );
};

export default function SpotiProfile() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [genres, setGenres] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const usernameShake = useRef(new Animated.Value(0)).current;
  const emailShake = useRef(new Animated.Value(0)).current;
  const genresShake = useRef(new Animated.Value(0)).current;
  const errorOpacity = useRef(new Animated.Value(0)).current;

  // Load cached data
  useEffect(() => {
    (async () => {
      try {
        const cached = await AsyncStorage.getItem("profileForm");
        if (cached) {
          const { username, email, genres, profileImage } = JSON.parse(cached);
          setUsername(username || "");
          setEmail(email || "");
          setGenres(genres || []);
          setProfileImage(profileImage || null);
        }
      } catch (e) {
        console.log("Error loading cache:", e);
      }
    })();
  }, []);

  // Save data + fade in preview
  useEffect(() => {
    AsyncStorage.setItem(
      "profileForm",
      JSON.stringify({ username, email, genres, profileImage })
    );
    if (username || email || genres.length > 0 || profileImage) {
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    }
  }, [username, email, genres, profileImage]);

  // Shake animation
  const triggerShake = (anim) => {
    Animated.sequence([
      Animated.timing(anim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(anim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(anim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(anim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(anim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      newErrors.username = "3-20 chars, letters/numbers/underscores only.";
      triggerShake(usernameShake);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format.";
      triggerShake(emailShake);
    }
    if (genres.length === 0) {
      newErrors.genres = "Select at least one genre.";
      triggerShake(genresShake);
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      Animated.timing(errorOpacity, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    }

    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async () => {
    if (validate()) {
      alert("Profile updated successfully!");
      await AsyncStorage.removeItem("profileForm");
      setUsername("");
      setEmail("");
      setGenres([]);
      setProfileImage(null);
      setErrors({});
      Animated.timing(errorOpacity, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    }
  };

  // Toggle genre
  const toggleGenre = (g) => {
    setGenres((prev) => (prev.includes(g) ? prev.filter((item) => item !== g) : [...prev, g]));
  };

  // Pick image
  const pickImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Preview */}
      <ProfilePreview
        username={username}
        email={email}
        genres={genres}
        fadeAnim={fadeAnim}
        profileImage={profileImage}
      />

      {/* Change Picture Button */}
      <TouchableOpacity style={styles.changePicButton} onPress={pickImage}>
        <Text style={styles.changePicText}>Change Profile Picture</Text>
      </TouchableOpacity>

      {/* Form */}
      <Animated.View style={{ transform: [{ translateX: usernameShake }] }}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
      </Animated.View>
      {errors.username && (
        <Animated.Text style={[styles.error, { opacity: errorOpacity }]}>
          {errors.username}
        </Animated.Text>
      )}

      <Animated.View style={{ transform: [{ translateX: emailShake }] }}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </Animated.View>
      {errors.email && (
        <Animated.Text style={[styles.error, { opacity: errorOpacity }]}>
          {errors.email}
        </Animated.Text>
      )}

      <Text style={styles.genreLabel}>Select Genres:</Text>
      <Animated.View
        style={[styles.genreContainer, { transform: [{ translateX: genresShake }] }]}
      >
        {allGenres.map((g) => (
          <TouchableOpacity
            key={g}
            style={[styles.genreButton, genres.includes(g) && styles.genreButtonSelected]}
            onPress={() => toggleGenre(g)}
          >
            <Text
              style={[styles.genreText, genres.includes(g) && styles.genreTextSelected]}
            >
              {g}
            </Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
      {errors.genres && (
        <Animated.Text style={[styles.error, { opacity: errorOpacity }]}>
          {errors.genres}
        </Animated.Text>
      )}

      <TouchableOpacity style={styles.editButton} onPress={handleSubmit}>
        <Text style={styles.editButtonText}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20, paddingTop: 40 },
  backButton: { marginRight: 15 },
  backText: { color: "white", fontSize: 22, fontWeight: "bold" },
  headerTitle: { color: "white", fontSize: 20, fontWeight: "bold" },

  input: {
    backgroundColor: "#1e1e1e",
    color: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  error: { color: "red", marginBottom: 10, fontSize: 12 },

  genreLabel: { color: "white", marginBottom: 8, fontSize: 16, fontWeight: "bold" },
  genreContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 15 },
  genreButton: {
    backgroundColor: "#1e1e1e",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    margin: 5,
  },
  genreButtonSelected: { backgroundColor: "#1DB954" },
  genreText: { color: "white" },
  genreTextSelected: { color: "#000", fontWeight: "bold" },

  editButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  editButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },

  changePicButton: {
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  changePicText: { color: "white", fontSize: 14 },

  previewCard: {
    backgroundColor: "#1e1e1e",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  previewImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  previewText: { color: "white", fontSize: 16, marginBottom: 5 },
});
