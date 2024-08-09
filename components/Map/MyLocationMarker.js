// components/Map/MyLocationMarker.js
import React from 'react';
import { Platform, StyleSheet, View, Text, Image } from 'react-native';
import { Marker as WebMarker, Popup } from 'react-leaflet';
import { Marker as MobileMarker } from 'expo-maps';

// Custom icon for the marker (web)
const myLocationIcon = new L.Icon({
  iconUrl: 'https://cdn.pixabay.com/animation/2023/04/06/16/10/16-10-43-442_512.gif',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MyLocationMarker = ({ location }) => {
  const lat = parseFloat(location.latitude) || 0;
  const lon = parseFloat(location.longitude) || 0;

  if (Platform.OS === 'web') {
    return (
      <WebMarker
        position={[lat, lon]}
        icon={myLocationIcon}
      >
        <Popup>You are here</Popup>
      </WebMarker>
    );
  } else {
    return (
      <MobileMarker coordinate={{ latitude: lat, longitude: lon }}>
        <View style={styles.marker}>
          <Image
            source={{ uri: 'https://cdn.pixabay.com/animation/2023/04/06/16/10/16-10-43-442_512.gif' }}
            style={styles.icon}
          />
          <Text>You are here</Text>
        </View>
      </MobileMarker>
    );
  }
};

const styles = StyleSheet.create({
  marker: {
    alignItems: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
});

export default MyLocationMarker;
