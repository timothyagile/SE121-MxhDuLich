import React from 'react';
import Sidebar from '../components/SideBar.js'; 
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header.js';

const Layout = ({ children }) => {

const location =useLocation();

const getTitle = () => {
  switch (location.pathname) {
    case '/dashboard':
        return 'Bảng Điều Khiển';
      case '/listbusiness':
        return 'Danh Sách Doanh Nghiệp';
      case '/listlocation':
        return 'Danh Sách Địa Điểm';
      case '/listbooking':
        return 'Danh Sách Đặt Chỗ';
      case '/statistic':
        return 'Thống Kê';
      case '/detailbusiness':
        return 'Chi Tiết Doanh Nghiệp';
      case '/detaillocation':
        return 'Chi Tiết Địa Điểm';
      case '/detailbooking':
        return 'Chi Tiết Đặt Chỗ';
      default:
        return 'Trang Không Tồn Tại'; 
  }
}

  return (
    <div style={{ display: 'flex' }}>
      <div style = {{ marginLeft: 10, marginTop: 0,}}>
        <Sidebar />
      </div>
      <div class="container">
      <div class="containerformobile" >
      <Header title={getTitle()}/>
      <Outlet/>
      </div>
      </div>
      
      {/* <div style={{ flexGrow: 1 }}>
        {children}
      </div> */}
    </div>
  );
};

export default Layout;