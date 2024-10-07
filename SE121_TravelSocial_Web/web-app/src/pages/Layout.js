import React from 'react';
import Sidebar from '../components/SideBar.js'; 
import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <div style = {{ marginLeft: 10, marginTop: 0,}}>
        <Sidebar />
      </div>
      <Outlet/>
      
      {/* <div style={{ flexGrow: 1 }}>
        {children}
      </div> */}
    </div>
  );
};

export default Layout;