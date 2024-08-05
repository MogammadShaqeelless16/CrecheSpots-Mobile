// components/Map/MyLocationMarker.js
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Custom icon for the marker
const myLocationIcon = new L.Icon({
  iconUrl: 'https://cdn.pixabay.com/animation/2023/04/06/16/10/16-10-43-442_512.gif',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function MyLocationMarker({ location }) {
  return (
    <Marker
      position={[location.latitude, location.longitude]}
      icon={myLocationIcon}
    >
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default MyLocationMarker;
