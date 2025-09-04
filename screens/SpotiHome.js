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

const { width } = Dimensions.get("window");

export default function SpotiHome() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
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
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={styles.activeTabText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Music</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Podcasts</Text>
          </TouchableOpacity>
        </View>

        {/* Playlists Section */}
        <View style={styles.playlistGrid}>
          <View style={styles.playlistCard}>
            <Image
              source={require("../Pictures/h1.jpg")}
              style={styles.playlistImage}
            />
            <Text style={styles.playlistText}>Hamilton Soundtrack</Text>
          </View>

          <View style={styles.playlistCard}>
            <Image
              source={require("../Pictures/l1.jpg")}
              style={styles.playlistImage}
            />
            <Text style={styles.playlistText}>Liked Songs</Text>
          </View>

          <View style={styles.playlistCard}>
            <Image
              source={require("../Pictures/m1.jpg")}
              style={styles.playlistImage}
            />
            <Text style={styles.playlistText}>Michael Jackson</Text>
          </View>

          <View style={styles.playlistCard}>
            <Image
              source={require("../Pictures/e1.jpg")}
              style={styles.playlistImage}
            />
            <Text style={styles.playlistText}>This Is Ed Sheeran</Text>
          </View>
        </View>

        {/* New Releases */}
        <Text style={styles.sectionTitle}>New releases for you</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.albumCard}>
            <Image
              source={require("../Pictures/e2.jpg")}
              style={styles.albumImage}
            />
            <Text style={styles.albumTitle}>Essex Honey</Text>
            <Text style={styles.albumArtist}>Blood Orange</Text>
          </View>

          <View style={styles.albumCard}>
            <Image
              source={require("../Pictures/l2.jpg")}
              style={styles.albumImage}
            />
            <Text style={styles.albumTitle}>SHE DON'T NEED TO KNOW</Text>
            <Text style={styles.albumArtist}>The Kid LAROI</Text>
          </View>
        </ScrollView>

        {/* Recommended Stations */}
        <Text style={styles.sectionTitle}>Recommended Stations</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.stationCard}>
            <Image
              source={require("../Pictures/l3.jpg")}
              style={styles.stationImage}
            />
            <Text style={styles.stationTitle}>Lauv Radio</Text>
          </View>

          <View style={styles.stationCard}>
            <Image
              source={require("../Pictures/o1.jpg")}
              style={styles.stationImage}
            />
            <Text style={styles.stationTitle}>One Direction Radio</Text>
          </View>
        </ScrollView>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require("../Pictures/lg1.png")}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require("../Pictures/lg2.png")}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require("../Pictures/lg3.png")}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Library</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require("../Pictures/lg4.png")}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Create</Text>
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
              <Image
                source={require("../Pictures/g4.jpg")}
                style={styles.drawerProfile}
              />
              <Text style={styles.drawerName}>German Felisarta IV</Text>

              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => {
                  setIsDrawerOpen(false);
                  navigation.navigate("SpotiProfile");
                }}
              >
                <Text style={styles.drawerText}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => {
                  setIsDrawerOpen(false);
                  navigation.navigate("SpotiSettings");
                }}
              >
                <Text style={styles.drawerText}>Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => {
                  setIsDrawerOpen(false);
                  navigation.navigate("SpotifyLogin");
                }}
              >
                <Text style={styles.drawerText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", paddingTop: 60 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  headerTitle: { color: "white", fontSize: 22, fontWeight: "bold" },
  profileButton: { width: 40, height: 40, borderRadius: 20, overflow: "hidden" },
  profileImage: { width: "100%", height: "100%", borderRadius: 20 },
  tabs: { flexDirection: "row", paddingHorizontal: 15, marginBottom: 20 },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#1e1e1e",
    marginRight: 10,
  },
  tabText: { color: "white", fontSize: 14 },
  activeTab: { backgroundColor: "#1DB954" },
  activeTabText: { color: "white", fontWeight: "bold" },
  playlistGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  playlistCard: {
    width: "48%",
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
  },
  playlistImage: { width: "100%", height: 100, borderRadius: 6, marginBottom: 6 },
  playlistText: { color: "white", fontSize: 14, fontWeight: "500" },
  sectionTitle: { color: "white", fontSize: 18, fontWeight: "bold", marginVertical: 10, paddingHorizontal: 15 },
  albumCard: { width: 140, marginHorizontal: 10 },
  albumImage: { width: "100%", height: 140, borderRadius: 10, marginBottom: 5 },
  albumTitle: { color: "white", fontWeight: "600" },
  albumArtist: { color: "#aaa", fontSize: 12 },
  stationCard: { width: 160, marginHorizontal: 10 },
  stationImage: { width: "100%", height: 140, borderRadius: 10, marginBottom: 5 },
  stationTitle: { color: "white", fontWeight: "600" },
  bottomNav: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 10, borderTopWidth: 0.5, borderTopColor: "#333", backgroundColor: "#000" },
  navItem: { alignItems: "center" },
  navText: { color: "white", fontSize: 12, marginTop: 3 },
  navIcon: { width: 24, height: 24, resizeMode: "contain" },
  overlayContainer: { ...StyleSheet.absoluteFillObject, zIndex: 10, flexDirection: "row" },
  overlayBackground: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
  drawer: { width: width * 0.7, backgroundColor: "#1e1e1e", paddingTop: 60, paddingHorizontal: 20 },
  drawerContent: { flex: 1 },
  drawerProfile: { width: 80, height: 80, borderRadius: 40, marginBottom: 15 },
  drawerName: { color: "white", fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  drawerItem: { paddingVertical: 12 },
  drawerText: { color: "white", fontSize: 16 },
});
