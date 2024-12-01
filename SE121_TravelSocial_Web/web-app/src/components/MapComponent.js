import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';

const MapComponent = ({ address }) => {
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [mapInstance, setMapInstance] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const API_KEY = 'AIzaSyB5r8wTQT5ymTQ94CN1wxnk37sfC6Ar5sQ';
    const MAP_ID = '1ab6cd1498fac6f9';



    const geocodeAddress = useCallback(() => {
        if (window.google && window.google.maps) {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ address }, (results, status) => {
            if (status === 'OK') {
              setLocation({
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
              });
            } else {
              console.error(`Geocode was not successful: ${status}`);
            }
          });
        }
      }, [address]);

      useEffect(() => {
        geocodeAddress();
      }, [geocodeAddress]);




    return (

        <GoogleMap
                mapContainerStyle={{ width: '100%', height: '400px' }}
                center={location}
                zoom={15}
                // onLoad={(map) => setMapInstance(map)}
                options={{ mapId: MAP_ID }} 
            >
                 {location.lat !== 0 && location.lng !== 0 && (
                    <Marker position={location} />
                )}
        </GoogleMap>
    );
};

export default MapComponent;


