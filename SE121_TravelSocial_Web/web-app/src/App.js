import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen';
import DashBoardScreen from './pages/DashBoardScreen';
import Layout from './pages/Layout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <DashBoardScreen />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
