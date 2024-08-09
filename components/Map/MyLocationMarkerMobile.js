// components/Map/MyLocationMarkerMobile.js
import React from 'react';
import { Marker } from 'react-native-maps';
import { View, Text, StyleSheet } from 'react-native';

function MyLocationMarkerMobile({ location }) {
  const lat = location.latitude || 0;
  const lon = location.longitude || 0;

  return (
    <Marker coordinate={{ latitude: lat, longitude: lon }} title="Your Location">
      <View style={styles.marker}>
        <Text style={styles.text}>You are here</Text>
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  marker: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MyLocationMarkerMobile;
