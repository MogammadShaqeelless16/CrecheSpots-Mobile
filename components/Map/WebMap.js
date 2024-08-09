import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css'; // Import Leaflet styles
import CrecheMarkerWeb from './CrecheMarkerWeb'; // Import your CrecheMarker for web
import MyLocationMarkerWeb from './MyLocationMarkerWeb'; // Import your MyLocationMarker for web

const WebMap = ({ creches, onMarkerClick, userLocation }) => {
  // Default coordinates in case userLocation is not provided
  const defaultCenter = [0, 0];
  const center = userLocation ? [userLocation.latitude, userLocation.longitude] : defaultCenter;

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {creches.map(creche => (
        <CrecheMarkerWeb key={creche.id} creche={creche} onMarkerClick={onMarkerClick} />
      ))}
      {userLocation && userLocation.latitude && userLocation.longitude && (
        <MyLocationMarkerWeb
          latitude={userLocation.latitude}
          longitude={userLocation.longitude}
        />
      )}
    </MapContainer>
  );
};

// Define prop types for better type checking
WebMap.propTypes = {
  creches: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    // Add more properties here based on CrecheMarkerWeb requirements
  })).isRequired,
  onMarkerClick: PropTypes.func.isRequired,
  userLocation: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
};

export default WebMap;
