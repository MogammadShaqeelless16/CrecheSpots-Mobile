// MapMobile.js
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';

const MapMobile = ({ creches, onMarkerPress }) => {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {creches.map((creche) => (
        <Marker
          key={creche.id}
          coordinate={{ latitude: creche.latitude, longitude: creche.longitude }}
          title={creche.title?.rendered}
          description={creche.price}
          onPress={() => onMarkerPress(creche)}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapMobile;
