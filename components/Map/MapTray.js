// MapTray.js
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, PanResponder, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library
import { Platform } from 'react-native';

const MapTray = ({ creches, userLocation, onPress, onZoomIn }) => {
  const [expanded, setExpanded] = useState(false);
  const [trayHeight, setTrayHeight] = useState(new Animated.Value(150)); // Default height

  // Calculate distances between user and creches
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Calculate distances and sort creches by distance
  const sortedCreches = creches
    .map((creche) => ({
      ...creche,
      distance: calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        creche.latitude,
        creche.longitude
      ),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, expanded ? creches.length : 2); // Show all if expanded, otherwise show 2

  // Handle drag gesture
  const panResponder = useCallback(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        trayHeight.setValue(Math.max(150, 150 + gestureState.dy)); // Update tray height
      },
      onPanResponderRelease: (_, gestureState) => {
        const newHeight = gestureState.dy > 100 ? 300 : 150; // Toggle height
        setExpanded(newHeight === 300);
        Animated.spring(trayHeight, {
          toValue: newHeight,
          useNativeDriver: false,
        }).start();
      },
    }),
    [trayHeight]
  );

  return (
    <Animated.View
      style={[styles.container, { height: trayHeight }]}
      {...panResponder.panHandlers}
    >
      <View style={styles.handle} />
      {sortedCreches.map((creche) => (
        <View key={creche.id} style={styles.item}>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{creche.title?.rendered || 'No title'}</Text>
            <Text style={styles.price}>{creche.price}</Text>
            <Text style={styles.distance}>{creche.distance.toFixed(2)} km away</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onZoomIn(creche)}
          >
            <Icon name="map-pin" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    elevation: 3,
    borderRadius: 10,
    overflow: 'hidden',
  },
  handle: {
    width: 60,
    height: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 5,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#666',
  },
  distance: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
});

export default MapTray;
