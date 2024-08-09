// components/Map/CrecheMarkerWeb.js
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { View, Text, StyleSheet } from 'react-native';

// Custom icon for the marker
const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/4506/4506230.png',
  iconSize: [64, 64],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function CrecheMarkerWeb({ creche, handleInfoPress, handleApplyPress }) {
  const lat = parseFloat(creche.latitude) || 0;
  const lon = parseFloat(creche.longitude) || 0;
  const name = creche.title?.rendered || 'No name';
  const price = creche.price || 'Price not available';

  return (
    <Marker position={[lat, lon]} icon={customIcon}>
      <Popup>
        <View style={styles.popupContent}>
          <Text style={styles.boldText}>{name}</Text>
          <Text>{price}</Text>
          <View style={styles.buttonContainer}>
            <button
              style={styles.infoButton}
              onClick={() => handleInfoPress(creche)}
            >
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/4/43/Minimalist_info_Icon.png'
                alt='Info'
                style={styles.icon}
              />
            </button>
            <button
              style={styles.applyButton}
              onClick={() => handleApplyPress(creche)}
            >
              <img
                src='https://static.thenounproject.com/png/2714905-200.png'
                alt='Apply'
                style={styles.icon}
              />
            </button>
          </View>
        </View>
      </Popup>
    </Marker>
  );
}

const styles = StyleSheet.create({
  popupContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: '16px',
    marginBottom: '5px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '10px',
  },
  infoButton: {
    marginRight: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  applyButton: {
    backgroundColor: '#007bff',
    borderRadius: '5px',
    padding: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  icon: {
    width: '24px',
    height: '24px',
  },
});

export default CrecheMarkerWeb;
