import React, { useState } from 'react';

import SideBar from '../components/SideBar';
import '../styles/DashBoardScreen.css';
import { FaAngleRight,FaBell } from 'react-icons/fa';
import Calendar from 'react-calendar';
import pagination from '../components/Pagination';
import PercentageIndicator from '../components/PercentageIndicator';
import { businesses, users } from './BusinessData';
import { useNavigate } from 'react-router-dom';


const DashBoardScreen = () => {
  const [value, setValue] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const onChange = (newDate) => {
    setValue(newDate);
    setSelectedDate(newDate); // Cập nhật ngày đã chọn
  };

  const filteredUsers = selectedDate 
    ? users.filter(user => {
        // Giả sử mỗi user có một thuộc tính date chứa ngày mà họ có dữ liệu
        const userDate = new Date(user.time); // Thay đổi 'user.date' thành thuộc tính thực tế của bạn
        return userDate.toDateString() === selectedDate.toDateString();
      })
    : [];

  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/location/detail/${id}`);
  };

  const handleBusinessDetailClick = (id) => {
    navigate(`/business/detail/${id}`); // Điều hướng đến DetailLocationScreen với ID
  };

  

  

  return (
    
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
                    {/* <p className={`percentage ${1 < 0 ? 'decrease' : 'increase'}`}>
                        12%
                    </p> */}
                    <PercentageIndicator class="percentage" percentage={-12}/>
                  </div>
                </div>
                <div className="card-body">
                  <p className="number">1245676543223</p>
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
                  <p>Doanh thu trong tháng 7</p>
                  <div className="frame">
                    {/* <p className={`percentage ${1 < 0 ? 'decrease' : 'increase'}`}>
                        12%
                    </p> */}
                    <PercentageIndicator class="percentage" percentage={12}/>
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
                  <p>Nhà kinh doanh mới</p>
                  <div className="frame">
                    {/* <p className={`percentage ${1 < 0 ? 'decrease' : 'increase'}`}>
                        12%
                    </p> */}
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
              <div className="business-card">
                <div className="card-header">
                  <div class ="circle">
                  </div>
                  <p>Số lượt booking trong tháng</p>
                  <div className="frame">
                    {/* <p className={`percentage ${1 < 0 ? 'decrease' : 'increase'}`}>
                        12%
                    </p> */}
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
          </div>
          <div class = "new-booking scroll-container mh-scroll">
            <p class = "new-booking-text">Địa điểm mới</p>
          <table class="custom-table ">
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
              {(businesses || []).map((business) => (
                <tr
                  key={business.id}
                  className="cursor-pointer hover:bg-blue-100"
                  onClick={() => handleRowClick(business.id)}
                >
                  <td>
                    <div className="location-icon">
                      <img src="location-icon.png" alt="Location Icon" />
                    </div>
                  </td>
                  <td>{business.name}</td>
                  <td>{business.owner}</td>
                  <td>{business.type}</td>
                  <td>
                    <span className={business.status === 'đã duyệt' ? 'status-label-2' : 'status-label'}>
                      {business.status}
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
              <p class="new-business mb-3">Nhà kinh doanh mới</p>
              <div>
                {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    className="user-info"
                    key={user.id}
                    onClick={() => handleBusinessDetailClick(user.id)} // Bắt sự kiện click
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

export default DashBoardScreen;