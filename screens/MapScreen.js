import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../components/Map/SearchBar';
import SuggestionsList from '../components/Map/SuggestionsList';
import MapView from '../components/Map/MapView';
import LoadingIndicator from '../components/CrecheHome/LoadingIndicator';
import MapTray from '../components/Map/MapTray';

function MapScreen() {
  const [location, setLocation] = useState(null);
  const [creches, setCreches] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const [searchLocation, setSearchLocation] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [zoomInCreche, setZoomInCreche] = useState(null);
  const [transitioning, setTransitioning] = useState(false); // New state for managing transition
  const [zoomLevel, setZoomLevel] = useState(13); // Ensure zoomLevel is defined
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
          if (response.data && response.data.length > 0) {
            setSuggestions(response.data);
            const { lat, lon } = response.data[0];
            setMapCenter([parseFloat(lat), parseFloat(lon)]);
            setSearchLocation({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
          } else {
            setSuggestions([]);
          }
        })
        .catch(error => {
          console.error('Failed to search location:', error);
        });
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (transitioning && zoomInCreche) {
      // Move map to creche location after a delay
      setTimeout(() => {
        setMapCenter([zoomInCreche.latitude, zoomInCreche.longitude]);
        setZoomLevel(15); // Adjust zoom level if needed
        setTransitioning(false);
        setZoomInCreche(null);
      }, 1000); // Adjust delay as needed
    }
  }, [transitioning, zoomInCreche]);

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
  };

  const handleTrayItemPress = (creche) => {
    navigation.navigate('CrecheDetails', { creche });
  };

  const handleZoomIn = (creche) => {
    setTransitioning(true); // Trigger the transition
    setZoomInCreche(creche);
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
      <MapTray
        creches={creches}
        userLocation={location}
        onPress={handleTrayItemPress}
        onZoomIn={handleZoomIn}
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
