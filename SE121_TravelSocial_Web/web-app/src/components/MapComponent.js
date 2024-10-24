import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapComponent = ({ address }) => {
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [mapInstance, setMapInstance] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const API_KEY = 'AIzaSyB5r8wTQT5ymTQ94CN1wxnk37sfC6Ar5sQ';

    // Hàm để chuyển đổi địa chỉ thành tọa độ
    const geocodeAddress = useCallback((address) => {
        if (window.google && window.google.maps) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address }, (results, status) => {
                if (status === 'OK') {
                    const { lat, lng } = results[0].geometry.location;
                    setLocation({ lat: lat(), lng: lng() });
                } else {
                    console.error(`Geocode was not successful for the following reason: ${status}`);
                }
            });
        }
    }, []);

    useEffect(() => {
        if (mapLoaded && address) {
            geocodeAddress(address);
        }
    }, [mapLoaded, address, geocodeAddress]);

    // Thêm AdvancedMarkerElement vào bản đồ sau khi tọa độ đã được cập nhật
    useEffect(() => {
        if (mapInstance && location.lat !== 0 && location.lng !== 0) {
            const customContent = document.createElement('div');
            customContent.innerHTML = '<strong>Custom Marker</strong>';

            // Tạo marker mới với AdvancedMarkerElement
            new window.google.maps.marker.AdvancedMarkerElement({
                map: mapInstance,
                position: location,
                content: customContent // có thể bỏ nếu không cần nội dung tùy chỉnh
            });
        }
    }, [mapInstance, location]);

    return (
        <LoadScript googleMapsApiKey={API_KEY} onLoad={() => setMapLoaded(true)}>
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '400px' }}
                center={location}
                zoom={15}
                onLoad={(map) => setMapInstance(map)}
            >
                {/* AdvancedMarkerElement sẽ được xử lý trực tiếp thông qua Google Maps API, không dùng <Marker /> */}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;
