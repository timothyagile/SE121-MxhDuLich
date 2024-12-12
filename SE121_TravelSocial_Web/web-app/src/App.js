import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen';
import DashBoardScreen from './pages/DashBoardScreen';
import Layout from './pages/Layout';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route
          path="/dashboard/business"
          element={
            <ProtectedRoute>
              <Layout>
                 <DashBoardScreen />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
