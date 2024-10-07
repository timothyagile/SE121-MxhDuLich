import React, { useState } from 'react';

import SideBar from '../components/SideBar';
import '../styles/DashBoardScreen.css';
import { FaAngleRight,FaBell } from 'react-icons/fa';
import Calendar from 'react-calendar';


const DashBoardScreen = () => {
  const [value, setValue] = useState(new Date());

  const onChange = (date) => {
    setValue(date);
  };


  return (
    <div class="container">
      <div class="containerformobile" >
        <div class="dashboardheader">
          <div className="notification-icon">
            <FaBell></FaBell>
          </div>
          <div className="admin-info">
            <img src="avatar.png" alt="Admin Avatar" className="admin-avatar" />
            <div className="admin-details">
              <h2 className="admin-name">Tô Hoàng Huy</h2>
              <p className="admin-role">Quản trị viên</p>
            </div>
          </div>
        </div>
        <div class="dashboardbody">
          <div class="leftframe">
          <div class="chart">
            <div>
              <div className="business-card">
                <div className="card-header">
                  <div class ="circle">
                  </div>
                  <p>Tổng nhà kinh doanh</p>
                  <div className="frame">
                    <p className={`percentage ${1 < 0 ? 'decrease' : 'increase'}`}>
                        12%
                    </p>
                  </div>
                </div>
                <div className="card-body">
                  <p className="number">12</p>
                </div>
                <div className="separator">
                  <div></div>
                </div>
                <div className="card-footer">
                  <p>Cập nhật lần cuối: 30/7/2024</p>
                </div>
              </div>
            </div>
            <div>
              <div className="business-card">
                <div className="card-header">
                  <div class ="circle">
                  </div>
                  <p>Tổng nhà kinh doanh</p>
                  <div className="frame">
                    <p className={`percentage ${1 < 0 ? 'decrease' : 'increase'}`}>
                        12%
                    </p>
                  </div>
                </div>
                <div className="card-body">
                  <p className="number">12</p>
                </div>
                <div className="separator">
                  <div></div>
                </div>
                <div className="card-footer">
                  <p>Cập nhật lần cuối: 30/7/2024</p>
                </div>
              </div>
            </div>
            <div>
              <div className="business-card">
                <div className="card-header">
                  <div class ="circle">
                  </div>
                  <p>Tổng nhà kinh doanh</p>
                  <div className="frame">
                    <p className={`percentage ${1 < 0 ? 'decrease' : 'increase'}`}>
                        12%
                    </p>
                  </div>
                </div>
                <div className="card-body">
                  <p className="number">12</p>
                </div>
                <div className="separator">
                  <div></div>
                </div>
                <div className="card-footer">
                  <p>Cập nhật lần cuối: 30/7/2024</p>
                </div>
              </div>
            </div>
            <div>
              <div className="business-card">
                <div className="card-header">
                  <div class ="circle">
                  </div>
                  <p>Tổng nhà kinh doanh</p>
                  <div className="frame">
                    <p className={`percentage ${1 < 0 ? 'decrease' : 'increase'}`}>
                        12%
                    </p>
                  </div>
                </div>
                <div className="card-body">
                  <p className="number">12</p>
                </div>
                <div className="separator">
                  <div></div>
                </div>
                <div className="card-footer">
                  <p>Cập nhật lần cuối: 30/7/2024</p>
                </div>
              </div>
            </div>
          </div>
          <div class = "new-booking">
            <p class = "new-booking-text">Địa điểm mới</p>
          <table class="custom-table">
            <thead>
              <tr>
                <th>   </th>
                <th>Tên địa điểm</th>
                <th>Tên nhà kinh doanh</th>
                <th>Loại</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="location-icon">
                    <img src="location-icon.png" alt="Location Icon"></img>
                  </div>
                </td>
                <td>Cắm trại hồ sóc - Vũng Tàu</td>
                <td>Nguyễn PT</td>
                <td>camping</td>
                <td><span class="status-label">đang chờ</span></td>
              </tr>
            </tbody>
          </table>
          </div>
          </div>
          <div class="rightframe">
            <p class ="staticbydate">Thống kê theo ngày </p>
          <Calendar
            className="custom-calendar"
            onChange={onChange}
            value={value}
            locale="vi-VN"
            navigationLabel={({ date, label, locale, view }) => label}
            tileContent={({ date, view }) => view === 'month' && date.getDay() === 0 ? null : null}
          />
            <div>
              <p class="new-business">Nhà kinh doanh mới</p>
              <div class="user-info">
                <img src="avatar.png" alt="User Avatar" class="user-avatar"></img>
                <div class="user-details">
                  <h2 class="user-name">Nguyễn Phúc Thịnh</h2>
                  <p class="user-time">09:30 29/7/2023</p>
                </div>
                <div className="arrow-icon">
                  <FaAngleRight />
                </div>
              </div>
              <div class="user-info">
                <img src="avatar.png" alt="User Avatar" class="user-avatar"></img>
                <div class="user-details">
                  <h2 class="user-name">Nguyễn Phúc Thịnh</h2>
                  <p class="user-time">09:30 29/7/2023</p>
                </div>
                <div className="arrow-icon">
                  <FaAngleRight />
                </div>
              </div>
              <div class="user-info">
                <img src="avatar.png" alt="User Avatar" class="user-avatar"></img>
                <div class="user-details">
                  <h2 class="user-name">Nguyễn Phúc Thịnh</h2>
                  <p class="user-time">09:30 29/7/2023</p>
                </div>
                <div className="arrow-icon">
                  <FaAngleRight />
                </div>
              </div>

            </div>
          
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default DashBoardScreen;