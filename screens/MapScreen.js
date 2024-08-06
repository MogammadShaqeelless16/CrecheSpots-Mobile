// screens/MapScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet  } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../components/Map/SearchBar';
import SuggestionsList from '../components/Map/SuggestionsList';
import MapView from '../components/Map/MapView';
import LoadingIndicator from '../components/CrecheHome/LoadingIndicator';

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
      setZoomLevel(13); // Initial zoom level

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
      <View style={styles.loadingContainer}>
          <LoadingIndicator />
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
      <View style={styles.searchBarContainer}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </View>
      {searchQuery.length > 2 && suggestions.length > 0 && (
        <SuggestionsList
          suggestions={suggestions}
          handleSuggestionPress={handleSuggestionPress}
        />
      )}
      <MapView
        mapCenter={mapCenter}
        zoomLevel={zoomLevel}
        creches={creches}
        location={location}
        searchLocation={searchLocation}
        handleInfoPress={handleInfoPress}
        handleApplyPress={handleApplyPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapScreen;
