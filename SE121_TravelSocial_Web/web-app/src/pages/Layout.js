import React from 'react';
import Sidebar from '../components/SideBar.js'; 
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header.js';

const titleMap = [
  { path: /^\/dashboard\/admin$/, main: 'Bảng Điều Khiển', sub: null },
  { path: /^\/business\/list$/, main: 'Danh Sách Doanh Nghiệp', sub: null },
  { path: /^\/detailbusiness\/\d+$/, main: 'Danh Sách Doanh Nghiệp', sub: 'Chi Tiết Doanh Nghiệp' },
  { path: /^\/location\/list$/, main: 'Danh Sách Địa Điểm', sub: null },
  { path: /^\/location\/detail\/\d+$/, main: 'Danh Sách Địa Điểm', sub: 'Chi Tiết Địa Điểm' },
  { path: /^\/booking\/list$/, main: 'Danh Sách Đặt Chỗ', sub: null },
  { path: /^\/detailbooking\/\d+$/, main: 'Danh Sách Đặt Chỗ', sub: 'Chi Tiết Đặt Chỗ' },
  { path: /^\/statistic$/, main: 'Thống Kê', sub: null },
];


const Layout = ({ children }) => {
const userRole = 'admin';

const location =useLocation();
const { pathname } = location;
const { main, sub } = titleMap.find(({ path }) => path.test(pathname)) || { 
  main: 'Trang Không Tồn Tại', 
  sub: null 
};

  return (
    <div style={{ display: 'flex' }}>
      <div style = {{ marginLeft: 10, marginTop: 0,}}>
        <Sidebar role={userRole}/>
      </div>
      <div class="container">
      <div class="containerformobile" >
      <Header mainTitle={main} subTitle={sub}/>
      <Outlet/>
      </div>
      </div>
    </div>
  );
};

export default Layout;