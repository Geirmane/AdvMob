import React, { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");

const presetThemes = [
  { mode: "light", bg: "#f5f5f5", text: "black", card: "#e0e0e0" },
  { mode: "dark", bg: "#121212", text: "white", card: "#1e1e1e" },
  { mode: "blue", bg: "#001F3F", text: "#7FDBFF", card: "#003366" },
  { mode: "purple", bg: "#3D0C5E", text: "#DDA0FF", card: "#5A287D" },
];

export default function SpotiHome() {
  const navigation = useNavigation();
  const { mode } = useSelector((state) => state.theme);

  const currentTheme =
    presetThemes.find((t) => t.mode === mode) || presetThemes[0];

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsDrawerOpen(false));
    } else {
      setIsDrawerOpen(true);
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.bg }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: currentTheme.text }]}>
          Home
        </Text>
        <TouchableOpacity style={styles.profileButton} onPress={toggleDrawer}>
          <Image
            source={require("../Pictures/g4.jpg")}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Main content */}
      <ScrollView>
        {/* Filter Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[
              styles.tab,
              { backgroundColor: currentTheme.card },
              styles.activeTab,
            ]}
          >
            <Text style={[styles.activeTabText, { color: currentTheme.text }]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, { backgroundColor: currentTheme.card }]}>
            <Text style={[styles.tabText, { color: currentTheme.text }]}>
              Music
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, { backgroundColor: currentTheme.card }]}>
            <Text style={[styles.tabText, { color: currentTheme.text }]}>
              Podcasts
            </Text>
          </TouchableOpacity>
        </View>

        {/* Playlists Section */}
        <View style={styles.playlistGrid}>
          {[
            { img: require("../Pictures/h1.jpg"), title: "Hamilton Soundtrack" },
            { img: require("../Pictures/l1.jpg"), title: "Liked Songs" },
            { img: require("../Pictures/m1.jpg"), title: "Michael Jackson" },
            { img: require("../Pictures/e1.jpg"), title: "This Is Ed Sheeran" },
          ].map((playlist, i) => (
            <View
              key={i}
              style={[styles.playlistCard, { backgroundColor: currentTheme.card }]}
            >
              <Image source={playlist.img} style={styles.playlistImage} />
              <Text style={[styles.playlistText, { color: currentTheme.text }]}>
                {playlist.title}
              </Text>
            </View>
          ))}
        </View>

        {/* New Releases */}
        <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>
          New releases for you
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            {
              img: require("../Pictures/e2.jpg"),
              title: "Essex Honey",
              artist: "Blood Orange",
            },
            {
              img: require("../Pictures/l2.jpg"),
              title: "SHE DON'T NEED TO KNOW",
              artist: "The Kid LAROI",
            },
          ].map((album, i) => (
            <View key={i} style={styles.albumCard}>
              <Image source={album.img} style={styles.albumImage} />
              <Text style={[styles.albumTitle, { color: currentTheme.text }]}>
                {album.title}
              </Text>
              <Text
                style={[
                  styles.albumArtist,
                  {
                    color:
                      currentTheme.mode === "dark"
                        ? "#bbb"
                        : currentTheme.mode === "light"
                        ? "#444"
                        : currentTheme.text,
                  },
                ]}
              >
                {album.artist}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Recommended Stations */}
        <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>
          Recommended Stations
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { img: require("../Pictures/l3.jpg"), title: "Lauv Radio" },
            { img: require("../Pictures/o1.jpg"), title: "One Direction Radio" },
          ].map((station, i) => (
            <View key={i} style={styles.stationCard}>
              <Image source={station.img} style={styles.stationImage} />
              <Text style={[styles.stationTitle, { color: currentTheme.text }]}>
                {station.title}
              </Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>

      {/* Bottom Navigation */}
      <View
        style={[
          styles.bottomNav,
          { backgroundColor: currentTheme.card, borderTopColor: currentTheme.text },
        ]}
      >
        <TouchableOpacity style={styles.navItem}>
          <Image source={require("../Pictures/lg1.png")} style={styles.navIcon} />
          <Text style={[styles.navText, { color: currentTheme.text }]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Image source={require("../Pictures/lg2.png")} style={styles.navIcon} />
          <Text style={[styles.navText, { color: currentTheme.text }]}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Image source={require("../Pictures/lg3.png")} style={styles.navIcon} />
          <Text style={[styles.navText, { color: currentTheme.text }]}>Library</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("SpotiPlaylistBuilder")}
        >
          <Image source={require("../Pictures/lg4.png")} style={styles.navIcon} />
          <Text style={[styles.navText, { color: currentTheme.text }]}>Create</Text>
        </TouchableOpacity>
      </View>

      {/* Drawer */}
      {isDrawerOpen && (
        <View style={styles.overlayContainer}>
          <TouchableOpacity
            style={styles.overlayBackground}
            onPress={toggleDrawer}
          />
          <Animated.View
            style={[
              styles.drawer,
              {
                backgroundColor: currentTheme.card,
                transform: [
                  {
                    translateX: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [width, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.drawerContent}>
              <Image source={require("../Pictures/g4.jpg")} style={styles.drawerProfile} />
              <Text style={[styles.drawerName, { color: currentTheme.text }]}>
                German Felisarta IV
              </Text>

              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => {
                  setIsDrawerOpen(false);
                  navigation.navigate("SpotiProfile");
                }}
              >
                <Text style={[styles.drawerText, { color: currentTheme.text }]}>
                  Profile
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => {
                  setIsDrawerOpen(false);
                  navigation.navigate("SpotiSettings");
                }}
              >
                <Text style={[styles.drawerText, { color: currentTheme.text }]}>
                  Settings
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => {
                  setIsDrawerOpen(false);
                  navigation.navigate("SpotifyLogin");
                }}
              >
                <Text style={[styles.drawerText, { color: currentTheme.text }]}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  headerTitle: { fontSize: 22, fontWeight: "bold" },
  profileButton: { width: 40, height: 40, borderRadius: 20, overflow: "hidden" },
  profileImage: { width: "100%", height: "100%", borderRadius: 20 },
  tabs: { flexDirection: "row", paddingHorizontal: 15, marginBottom: 20 },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 10,
  },
  tabText: { fontSize: 14 },
  activeTab: { borderWidth: 1 },
  activeTabText: { fontWeight: "bold" },
  playlistGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  playlistCard: {
    width: "48%",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
  },
  playlistImage: {
    width: "100%",
    height: 100,
    borderRadius: 6,
    marginBottom: 6,
  },
  playlistText: { fontSize: 14, fontWeight: "500" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  albumCard: { width: 140, marginHorizontal: 10 },
  albumImage: {
    width: "100%",
    height: 140,
    borderRadius: 10,
    marginBottom: 5,
  },
  albumTitle: { fontWeight: "600" },
  albumArtist: { fontSize: 12, marginTop: 2 },
  stationCard: { width: 160, marginHorizontal: 10 },
  stationImage: {
    width: "100%",
    height: 140,
    borderRadius: 10,
    marginBottom: 5,
  },
  stationTitle: { fontWeight: "600" },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 0.5,
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12, marginTop: 3 },
  navIcon: { width: 24, height: 24, resizeMode: "contain" },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    flexDirection: "row",
  },
  overlayBackground: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
  drawer: {
    width: width * 0.7,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  drawerContent: { flex: 1 },
  drawerProfile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  drawerName: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  drawerItem: { paddingVertical: 12 },
  drawerText: { fontSize: 16 },
});
