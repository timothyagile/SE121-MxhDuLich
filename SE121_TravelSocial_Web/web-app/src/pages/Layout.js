import React from 'react';
import Sidebar from '../components/SideBar.js'; 
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header.js';

const titleMap = {
  '/dashboard': { main: 'Bảng Điều Khiển', sub: null },
  '/listbusiness': { main: 'Danh Sách Doanh Nghiệp', sub: null },
  '/detailbusiness': { main: 'Danh Sách Doanh Nghiệp', sub: 'Chi Tiết Doanh Nghiệp' },
  '/listlocation': { main: 'Danh Sách Địa Điểm', sub: null },
  '/detaillocation': { main: 'Danh Sách Địa Điểm', sub: 'Chi Tiết Địa Điểm' },
  '/listbooking': { main: 'Danh Sách Đặt Chỗ', sub: null },
  '/detailbooking': { main: 'Danh Sách Đặt Chỗ', sub: 'Chi Tiết Đặt Chỗ' },
  '/statistic': { main: 'Thống Kê', sub: null },
};


const Layout = ({ children }) => {

const location =useLocation();
const { pathname } = location;
const { main, sub } = titleMap[pathname] || { main: 'Trang Không Tồn Tại', sub: null };


// const getTitle = () => {
//   const { pathname } = location;
//   const titleInfo = titleMap[pathname];
//   return titleInfo
//     ? titleInfo.sub
//       ? `${titleInfo.main} - ${titleInfo.sub}` 
//       : titleInfo.main 
//     : 'Trang Không Tồn Tại'; 
// };


  return (
    <div style={{ display: 'flex' }}>
      <div style = {{ marginLeft: 10, marginTop: 0,}}>
        <Sidebar />
      </div>
      <div class="container">
      <div class="containerformobile" >
      <Header mainTitle={main} subTitle={sub}/>
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