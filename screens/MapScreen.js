import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import MapView, { Marker, UrlTile, PROVIDER_DEFAULT } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";

export default function MapScreen() {
  const [location, setLocation] = useState(null);

  const requestLocationPermission = async () => {
    const permission =
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const result = await request(permission);
    if (result === RESULTS.GRANTED) {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000 }
    );
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📍 Maps</Text>

      {location ? (
        <MapView
          style={styles.map}
          provider={PROVIDER_DEFAULT}
          region={location}
        >
          {/* OSM Tile Layer */}
          <UrlTile
            urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            maximumZ={19}
            flipY={false}
          />

          {/* User marker */}
          <Marker coordinate={location} title="You are here" />
        </MapView>
      ) : (
        <Text style={styles.loadingText}>Getting your location...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, alignItems: "center" },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  map: { width: "100%", height: "85%" },
  loadingText: { marginTop: 20, fontSize: 16, color: "#555" },
});
