// components/Map/MyLocationMarkerWeb.js
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { View, Text, StyleSheet } from 'react-native';

// Custom icon for the marker
const locationIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2922/2922510.png',
  iconSize: [64, 64],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MyLocationMarkerWeb = ({ latitude, longitude }) => {
  return (
    <Marker position={[latitude, longitude]} icon={locationIcon}>
      <Popup>
        <View style={styles.popupContent}>
          <Text style={styles.text}>You are here</Text>
        </View>
      </Popup>
    </Marker>
  );
};

const styles = StyleSheet.create({
  popupContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});

export default MyLocationMarkerWeb;
