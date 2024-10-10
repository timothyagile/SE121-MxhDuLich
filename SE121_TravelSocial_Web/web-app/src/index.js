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
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    

    {/* <DashBoardScreen/>
    <SideBar/> */}
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route element={<Layout />}>

          <Route path="/dashboard" element={<DashBoardScreen />} />
          <Route path="/listbusiness" element={<ListBusinessScreen />} />
          <Route path="/listlocation" element={<ListLocationScreen />} />
          <Route path="/listbooking" element={<ListBookingScreen />} />
          <Route path="/statistic" element={<StatisticScreen />} />
          <Route path="/detailbusiness" element={<DetailBusinessScreen />} />
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
