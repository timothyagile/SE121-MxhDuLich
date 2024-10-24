// components/MapComponent.js
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import '../styles/MapBoxComponent.css'; // Tạo file css để định dạng cho bản đồ
import { useState } from 'react';

mapboxgl.accessToken = 'pk.eyJ1IjoiaHV5dG8iLCJhIjoiY20ybHJwMXdhMGJuaDJqcWNubmVlZHZldyJ9.2zGpBblncRoQLbEQu-WMdA'; // Thay YOUR_MAPBOX_ACCESS_TOKEN bằng token của bạn

const MapBoxComponent = ({ latitude, longitude }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [mapStatus, setMapStatus] = useState('loading'); // Trạng thái bản đồ: loading, loaded, error
  
    useEffect(() => {
      if (map.current) return; // Chỉ khởi tạo bản đồ một lần
      
      // Khởi tạo bản đồ
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 12,
      });
  
      // Bắt sự kiện khi bản đồ tải xong
      map.current.on('load', () => {
        setMapStatus('loaded');
      });
  
      // Bắt sự kiện khi không còn yêu cầu cần xử lý
      map.current.on('idle', () => {
        setMapStatus('idle');
      });
  
      // Bắt sự kiện lỗi nếu có
      map.current.on('error', (e) => {
        setMapStatus('error');
        console.error('Mapbox error:', e);
      });
  
      // Thêm một marker cho vị trí
      new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map.current);
  
      // Cleanup khi component unmount
      return () => {
        if (map.current) {
          map.current.remove();
        }
      };
    }, [latitude, longitude]);
  
    return (
      <div>
        <div ref={mapContainer} className="map-container" />
        <div className="map-status">
          {/* Hiển thị trạng thái bản đồ */}
          {mapStatus === 'loading' && <p>Bản đồ đang tải...</p>}
          {mapStatus === 'loaded' && <p>Bản đồ đã tải xong!</p>}
          {mapStatus === 'idle' && <p>Bản đồ đã sẵn sàng.</p>}
          {mapStatus === 'error' && <p>Có lỗi xảy ra khi tải bản đồ.</p>}
        </div>
      </div>
    );
  };
  
  export default MapBoxComponent;
