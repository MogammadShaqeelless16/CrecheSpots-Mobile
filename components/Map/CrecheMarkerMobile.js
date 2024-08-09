// components/Map/CrecheMarkerMobile.js
import React from 'react';
import { Marker } from 'react-native-maps';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

function CrecheMarkerMobile({ creche, handleInfoPress, handleApplyPress }) {
  const lat = parseFloat(creche.latitude) || 0;
  const lon = parseFloat(creche.longitude) || 0;
  const name = creche.title?.rendered || 'No name';
  const price = creche.price || 'Price not available';

  return (
    <Marker coordinate={{ latitude: lat, longitude: lon }}>
      <View style={styles.popupContent}>
        <Text style={styles.boldText}>{name}</Text>
        <Text>{price}</Text>
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
    </Marker>
  );
}

const styles = StyleSheet.create({
  popupContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
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

export default CrecheMarkerMobile;
