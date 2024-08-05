// components/Map/MapView.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import CrecheMarker from './CrecheMarker';
import MyLocationMarker from './MyLocationMarker';

const ZoomControl = ({ mapCenter, zoomLevel }) => {
  const map = useMap();

  React.useEffect(() => {
    if (map && mapCenter) {
      map.setView(mapCenter, 2, { animate: true });
      const zoomStep = 0.5;
      let currentZoom = map.getZoom();
      const targetZoom = zoomLevel + 4;
      const interval = setInterval(() => {
        currentZoom += (currentZoom < targetZoom ? zoomStep : -zoomStep);
        if ((zoomStep > 0 && currentZoom >= targetZoom) || (zoomStep < 0 && currentZoom <= targetZoom)) {
          currentZoom = targetZoom;
          clearInterval(interval);
        }
        map.setZoom(currentZoom);
      }, 100);
    }
  }, [map, mapCenter, zoomLevel]);

  return null;
};

function MapView({ mapCenter, zoomLevel = 15, creches, location, searchLocation, handleInfoPress, handleApplyPress }) {
  return (
    <View style={styles.container}>
      <MapContainer
        center={mapCenter}
        zoom={10} // Initial zoom level
        style={styles.map}
        whenCreated={mapInstance => {
          mapInstance.setView(mapCenter, 10, { animate: true, duration: 1 });
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {location && <MyLocationMarker location={location} />}
        {searchLocation && (
          <Marker position={[searchLocation.latitude, searchLocation.longitude]}>
            <Popup>Search Result</Popup>
          </Marker>
        )}
        {creches.map(creche => (
          <CrecheMarker
            key={creche.id}
            creche={creche}
            handleInfoPress={handleInfoPress}
            handleApplyPress={handleApplyPress}
          />
        ))}
        <ZoomControl mapCenter={mapCenter} zoomLevel={zoomLevel} />
      </MapContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapView;
