import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as Location from 'expo-location';
import L from 'leaflet';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

// Custom icon for the marker
const customIcon = new L.Icon({
  iconUrl: 'https://static.vecteezy.com/system/resources/thumbnails/019/897/155/small/location-pin-icon-map-pin-place-marker-png.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function MapScreen() {
  const [location, setLocation] = useState(null);
  const [creches, setCreches] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const [searchLocation, setSearchLocation] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(13);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
      setMapCenter([coords.latitude, coords.longitude]);

      try {
        const response = await axios.get('https://shaqeel.wordifysites.com/wp-json/wp/v2/creche');
        setCreches(response.data);
      } catch (error) {
        console.error('Failed to fetch creches');
      }
    })();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const boundingBox = '-35.0,16.0,-22.0,33.0'; // Bounding box for South Africa
      const encodedQuery = encodeURIComponent(searchQuery);
      axios.get(`https://nominatim.openstreetmap.org/search?q=${encodedQuery}&format=json&addressdetails=1&limit=5&bounded=1&viewbox=${boundingBox}&countrycodes=ZA`)
        .then(response => {
          console.log('API Response:', response.data); // Debugging line
          if (response.data && response.data.length > 0) {
            setSuggestions(response.data);
            const { lat, lon } = response.data[0];
            setMapCenter([parseFloat(lat), parseFloat(lon)]);
            setSearchLocation({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
            setZoomLevel(15); // Zoom in on the location
          } else {
            setSuggestions([]);
          }
        })
        .catch(error => {
          console.error('Failed to search location:', error); // Improved error handling
        });
    } else {
      setSuggestions([]);
      setZoomLevel(13); // Default zoom level
    }
  }, [searchQuery]);

  if (!location || creches.length === 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleApplyPress = (creche) => {
    navigation.navigate('ApplicationFormScreen', { creche });
  };

  const handleInfoPress = (creche) => {
    navigation.navigate('CrecheDetails', { creche });
  };

  const handleSuggestionPress = (item) => {
    const { lat, lon } = item;
    setMapCenter([parseFloat(lat), parseFloat(lon)]);
    setSearchLocation({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
    setSearchQuery('');
    setSuggestions([]);
    setZoomLevel(15); // Zoom in on the selected suggestion
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search location in South Africa"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.place_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestion}
              onPress={() => handleSuggestionPress(item)}
            >
              <Text>{item.display_name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <MapContainer
        center={mapCenter}
        zoom={zoomLevel}
        style={styles.map}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={mapCenter}
          icon={customIcon}
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
        })}
        {searchLocation && (
          <Marker
            position={[searchLocation.latitude, searchLocation.longitude]}
            icon={customIcon}
          >
            <Popup>
              <Text>Search Result</Text>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  searchButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  map: {
    flex: 1,
  },
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
  suggestion: {
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
});

export default MapScreen;
