import React, { useState } from 'react';

import SideBar from '../components/SideBar';
import '../styles/DashBoardScreen.css';
import { FaAngleRight,FaBell } from 'react-icons/fa';
import Calendar from 'react-calendar';
import pagination from '../components/Pagination';


const DashBoardBusinessScreen = () => {
  const [value, setValue] = useState(new Date());

  const onChange = (date) => {
    setValue(date);
  };


  return (
    
        <div class="dashboardbody">
          <div class="leftframe">
            <div class="welcomebusiness flex justify-between">
                
                <div class="align-center ml-2 mt-8" >
                    <p class=" flex justify-center">Chào mừng trở lại</p>
                    <p class="flex justify-center">Hồ Cốc</p>
                </div>
                <img src={require('../assets/images/welcome.png')}></img>
            </div>
          <div class="chart business-card-2">
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
              <div className="business-card ">
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
          <div class = "new-booking scroll-container mh-scroll">
            <p class = "new-booking-text">Booking đang chờ xác nhận</p>
          <table class="custom-table ">
            <thead>
              <tr>
                <th>   </th>
                <th>Tên địa điểm</th>
                <th>Tên nhà kinh doanh</th>
                <th>Thời gian</th>
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
                <td>3h trước</td>
                <td><span class="status-label">đang chờ</span></td>
              </tr>
              <tr>
                <td>
                  <div class="location-icon">
                    <img src="location-icon.png" alt="Location Icon"></img>
                  </div>
                </td>
                <td>Cắm trại hồ sóc - Vũng Tàu</td>
                <td>Nguyễn PT</td>
                <td>35p trước</td>
                <td><span class="status-label">đang chờ</span></td>
              </tr>
              <tr>
                <td>
                  <div class="location-icon">
                    <img src="location-icon.png" alt="Location Icon"></img>
                  </div>
                </td>
                <td>Cắm trại hồ sóc - Vũng Tàu</td>
                <td>Nguyễn PT</td>
                <td>1h trước</td>
                <td><span class="status-label-2">đã duyệt</span></td>
              </tr>
              <tr>
                <td>
                  <div class="location-icon">
                    <img src="location-icon.png" alt="Location Icon"></img>
                  </div>
                </td>
                <td>Cắm trại hồ sóc - Vũng Tàu</td>
                <td>Nguyễn PT</td>
                <td>3h trước</td>
                <td><span class="status-label">đang chờ</span></td>
              </tr>
              <tr>
                <td>
                  <div class="location-icon">
                    <img src="location-icon.png" alt="Location Icon"></img>
                  </div>
                </td>
                <td>Cắm trại hồ sóc - Vũng Tàu</td>
                <td>Nguyễn PT</td>
                <td>2h trước</td>
                <td><span class="status-label">đang chờ</span></td>
              </tr>
              <tr>
                <td>
                  <div class="location-icon">
                    <img src="location-icon.png" alt="Location Icon"></img>
                  </div>
                </td>
                <td>Cắm trại hồ sóc - Vũng Tàu</td>
                <td>Nguyễn PT</td>
                <td>6h trước</td>
                <td><span class="status-label">đang chờ</span></td>
              </tr>
              <tr>
                <td>
                  <div class="location-icon">
                    <img src="location-icon.png" alt="Location Icon"></img>
                  </div>
                </td>
                <td>Cắm trại hồ sóc - Vũng Tàu</td>
                <td>Nguyễn PT</td>
                <td>1 ngày trước</td>
                <td><span class="status-label">đang chờ</span></td>
              </tr>
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
            <div class="flex items-center justify-center mb-4">
              <Calendar
                className="custom-calendar w-[90%]"
                onChange={onChange}
                value={value}
                locale="vi-VN"
                navigationLabel={({ date, label, locale, view }) => label}
                tileContent={({ date, view }) => view === 'month' && date.getDay() === 0 ? null : null}
              />
              </div>
            <div class="scroll-container">
              <p class="new-business mb-3">Booking trong ngày</p>
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
     
      
      
  
  );
};

export default DashBoardBusinessScreen;