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

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    

    {/* <DashBoardScreen/>
    <SideBar/> */}
    <Router>
      <Routes>
        <Route path="/" element={<RegistryScreen />} />
        <Route path="/addinfo" element={<RegistryScreen2 />} />
        <Route path="/loginscreen" element={<LoginScreen />} />
        <Route element={<Layout />}>

          <Route path="/dashboardbusiness" element={<DashBoardBusinessScreen />} />
          <Route path="/dashboard" element={<DashBoardScreen />} />
          <Route path="/listbusiness" element={<ListBusinessScreen />} />
          <Route path="/listlocation" element={<ListLocationScreen />} />
          <Route path="/listlocationbusiness" element={<ListLocationBusinessScreen />} />
          <Route path="/listbooking" element={<ListBookingScreen />} />
          <Route path="/listbookingbusiness" element={<ListBookingBusinessScreen />} />
          <Route path="/statistic" element={<StatisticScreen />} />
          <Route path="/detailbusiness" element={<DetailBusinessScreen />} />
          <Route path="/detaillocation" element={<DetailLocationScreen />} />
          <Route path="/detaillocationbusiness" element={<DetailLocationBusinessScreen />} />
          <Route path="/detailbooking" element={<DetailBookingScreen />} />
          <Route path="/addlocation" element={<AddLocationScreen />} />
          <Route path="/chatbusiness" element={<ChatBusinessScreen />} />

          
          {/* <Route path="/listlocation" element={<ListLocation />} />
          <Route path="/chat" element={<Chat />} /> */}
        </Route>
      </Routes>
    </Router>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
