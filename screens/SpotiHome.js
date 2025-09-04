import 'react-native-gesture-handler';
import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";

export default function SpotiHome() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header with Drawer Button */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("SpotiProfile")}
        >
          <Image
            source={require("../Pictures/g4.jpg")} // replace with your profile pic
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

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

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <Text style={styles.navItem}>Home</Text>
        <Text style={styles.navItem}>Search</Text>
        <Text style={styles.navItem}>Your Library</Text>
        <Text style={styles.navItem}>Create</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  headerTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  tabs: {
    flexDirection: "row",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#1e1e1e",
    marginRight: 10,
  },
  tabText: {
    color: "white",
    fontSize: 14,
  },
  activeTab: {
    backgroundColor: "#1DB954",
  },
  activeTabText: {
    color: "white",
    fontWeight: "bold",
  },
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
  playlistImage: {
    width: "100%",
    height: 100,
    borderRadius: 6,
    marginBottom: 6,
  },
  playlistText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  albumCard: {
    width: 140,
    marginHorizontal: 10,
  },
  albumImage: {
    width: "100%",
    height: 140,
    borderRadius: 10,
    marginBottom: 5,
  },
  albumTitle: {
    color: "white",
    fontWeight: "600",
  },
  albumArtist: {
    color: "#aaa",
    fontSize: 12,
  },
  stationCard: {
    width: 160,
    marginHorizontal: 10,
  },
  stationImage: {
    width: "100%",
    height: 140,
    borderRadius: 10,
    marginBottom: 5,
  },
  stationTitle: {
    color: "white",
    fontWeight: "600",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: "#333",
    backgroundColor: "#000",
  },
  navItem: {
    color: "white",
    fontSize: 14,
  },
});
