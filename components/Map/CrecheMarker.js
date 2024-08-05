// components/Map/CrecheMarker.js
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import L from 'leaflet';

// Custom icon for the marker
const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/4506/4506230.png',
  iconSize: [64, 64],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function CrecheMarker({ creche, handleInfoPress, handleApplyPress }) {
  const lat = parseFloat(creche.latitude) || 0;
  const lon = parseFloat(creche.longitude) || 0;
  const name = creche.title?.rendered || 'No name';
  const price = creche.price || 'Price not available';

  return (
    <Marker
      position={[lat, lon]}
      icon={customIcon}
    >
      <Popup>
        <View style={styles.popupContent}>
          <Text>Name: {name}</Text>
          <Text>Price: {price}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.infoButton}
              onPress={() => handleInfoPress(creche)}
            >
              <Image
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Minimalist_info_Icon.png' }}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => handleApplyPress(creche)}
            >
              <Image
                source={{ uri: 'https://static.thenounproject.com/png/2714905-200.png' }}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Popup>
    </Marker>
  );
}

const styles = StyleSheet.create({
  popupContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  infoButton: {
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default CrecheMarker;
