import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as Location from 'expo-location';
import L from 'leaflet';
import axios from 'axios';

// Custom icon for the marker
const customIcon = new L.Icon({
  iconUrl: 'https://static.vecteezy.com/system/resources/thumbnails/019/897/155/small/location-pin-icon-map-pin-place-marker-png.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function MapScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [creches, setCreches] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);

      try {
        // Replace with your Pods API endpoint
        const response = await axios.get('https://shaqeel.wordifysites.com/wp-json/wp/v2/creche');
        setCreches(response.data);
      } catch (error) {
        setErrorMsg('Failed to fetch creches');
      }
    })();
  }, []);

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  if (!location || creches.length === 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapContainer
        center={[location.latitude, location.longitude]}
        zoom={13}
        style={styles.map}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={[location.latitude, location.longitude]}
          icon={customIcon} // Use the custom icon
        >
          <Popup>You are here</Popup>
        </Marker>
        {creches.map((creche) => {
          const lat = parseFloat(creche.latitude) || 0;
          const lon = parseFloat(creche.longitude) || 0;
          const name = creche.title?.rendered || 'No name';
          const price = creche.price || 'Price not available';

          return (
            <Marker
              key={creche.id}
              position={[lat, lon]}
              icon={customIcon}
            >
              <Popup>
                <Text>Name: {name}</Text>
                <Text>Price: {price}</Text>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;
