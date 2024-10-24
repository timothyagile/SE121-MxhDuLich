



import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginScreen from './pages/LoginScreen';
import DashBoardScreen from './pages/DashBoardScreen';
import SideBar from './components/SideBar';
import Layout from './pages/Layout';
import ListBusinessScreen from './pages/ListBusinessScreen';
import ListLocationScreen from './pages/ListLocationScreen';
import ListBookingScreen from './pages/ListBookingScreen';
import StatisticScreen from './pages/StatisticScreen';
import DetailBusinessScreen from './pages/DetailbusinessScreen';
import DetailLocationScreen from './pages/DetailLocationScreen';
import DetailBookingScreen from './pages/DetailBookingScreen';
import RegistryScreen from './pagesofbusiness/RegistryScreen';
import RegistryScreen2 from './pagesofbusiness/RegistryScreen2';
import DashBoardBusinessScreen from './pagesofbusiness/DashBoardBusinessScreen';
import ListBookingBusinessScreen from './pagesofbusiness/ListBookingBusinessScreen';
import StatisticBusinessScreen from './pagesofbusiness/StatisticBusinessScreen';
import ListLocationBusinessScreen from './pagesofbusiness/ListLocationBusinessScreen';
import DetailLocationBusinessScreen from './pagesofbusiness/DetailLocationBusinessScreen';
import AddLocationScreen from './pagesofbusiness/AddLocationScreen';
import ChatBusinessScreen from './pagesofbusiness/ChatBusinessScreen';
import BusinessDetailBookingScreen from './pagesofbusiness/BusinessDetailBookingScreen';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const link = document.createElement('link');
link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css';
link.rel = 'stylesheet';
document.head.appendChild(link);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Router>
      <Routes>
        {/* Xác thực và Đăng ký */}
        <Route path="/" element={<LoginScreen />} />
        <Route path="/auth/register" element={<RegistryScreen />} />
        <Route path="/auth/register/step2" element={<RegistryScreen2 />} />

        {/* Layout chính cho các trang có sidebar */}
        <Route element={<Layout />}>
          {/* Dashboard */}
          <Route path="/dashboard/admin" element={<DashBoardScreen />} />
          <Route path="/dashboard/business" element={<DashBoardBusinessScreen />} />

          {/* Doanh nghiệp */}
          <Route path="/business/list" element={<ListBusinessScreen />} />
          <Route path="/business/detail/:id" element={<DetailBusinessScreen />} />
          <Route path="/business/statistic" element={<StatisticBusinessScreen />} />
          <Route path="/business/chat" element={<ChatBusinessScreen />} />

          {/* Booking */}
          <Route path="/booking/list" element={<ListBookingScreen />} />
          <Route path="/business/booking/list" element={<ListBookingBusinessScreen />} />
          <Route path="/business/booking/detail/:id" element={<BusinessDetailBookingScreen />} />
          <Route path="/booking/detail/:id" element={<DetailBookingScreen />} />

          {/* Địa điểm */}
          <Route path="/location/list" element={<ListLocationScreen />} />
          <Route path="/business/location/list" element={<ListLocationBusinessScreen />} />
          <Route path="/location/detail/:id" element={<DetailLocationScreen />} />
          <Route path="/business/location/detail/:id" element={<DetailLocationBusinessScreen />} />
          <Route path="/location/add" element={<AddLocationScreen />} />

          {/* Thống kê */}
          <Route path="/statistic" element={<StatisticScreen />} />
        </Route>
      </Routes>
    </Router>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
