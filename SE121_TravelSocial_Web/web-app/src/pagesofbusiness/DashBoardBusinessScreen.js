import React, { useState } from 'react';

import SideBar from '../components/SideBar';
import '../styles/DashBoardScreen.css';
import { FaAngleRight,FaBell } from 'react-icons/fa';
import Calendar from 'react-calendar';
import pagination from '../components/Pagination';
import PercentageIndicator from '../components/PercentageIndicator';
import { bookings,users } from '../pages/BusinessData';
import { useNavigate } from 'react-router-dom';


const DashBoardBusinessScreen = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [value, setValue] = useState(new Date());

  const onChange = (newdate) => {
    setValue(newdate);
    setSelectedDate(newdate);
  };

  const filteredUsers = selectedDate 
    ? users.filter(user => {
        
        const userDate = new Date(user.time);
        return userDate.toDateString() === selectedDate.toDateString();
      })
    : [];

  const handleRowClick =(id) => {
    navigate(`/booking/detail/${id}`);
  }

  const handleBusinessDetailClick = (id) => {
    navigate(`/booking/detail/${id}`);
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
                  <p>Booking trong tháng</p>
                  <div className="frame">
                    <PercentageIndicator class="percentage" percentage={-12}/>
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
                  <p>Doanh thu trong tháng</p>
                  <div className="frame">
                    <PercentageIndicator class="percentage" percentage={18}/>
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
              {(bookings || []).map((booking) => (
                <tr
                  key={booking.id}
                  className="cursor-pointer hover:bg-blue-100"
                  onClick={() => handleRowClick(booking.id)}>
                    <td>
                    <div className="location-icon">
                      <img src="location-icon.png" alt="Location Icon" />
                    </div>
                    </td>
                    <td>{booking.name}</td>
                    <td>{booking.code}</td>
                    <td>{booking.date}</td>
                    <td>
                      <span className={booking.status === 'đã duyệt' ? 'status-label-2' : 'status-label'}>
                        {booking.status}
                      </span>
                    </td>
                </tr>
                

              ))}

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
              <div>
                {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    className="user-info"
                    key={user.id}
                    onClick={() => handleBusinessDetailClick(user.id)} 
                    style={{ cursor: 'pointer' }}
                  >
                    <img src="avatar.png" alt="User Avatar" className="user-avatar" />
                    <div className="user-details">
                      <h2 className="user-name">{user.name}</h2>
                      <p className="user-time">{user.time}</p>
                    </div>
                    <div className="arrow-icon">
                      <FaAngleRight />
                    </div>
                  </div>
                ))
              ) : (
                <p>Không có nhà kinh doanh nào cho ngày đã chọn.</p> 
              )}
              </div>
            </div>
          </div>
        </div>
     
      
      
  
  );
};

export default DashBoardBusinessScreen;