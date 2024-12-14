import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import '../styles/DashBoardScreen.css';
import { FaAngleRight,FaBell } from 'react-icons/fa';
import Calendar from 'react-calendar';
import pagination from '../components/Pagination';
import PercentageIndicator from '../components/PercentageIndicator';
import { bookings,users } from '../pages/BusinessData';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import moment from 'moment';


const DashBoardBusinessScreen = () => {
  const userId = localStorage.getItem('userId'); 
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [value, setValue] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [allBookings, setAllBookings] = useState([]);

  const onChange = (newdate) => {
    setValue(newdate);
    setSelectedDate(newdate);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`http://localhost:3000/booking/getbybusinessid/${userId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const allBookingsWithDetails = await Promise.all(data.data.map(async (booking) => {
          const userResponse = await fetch(`http://localhost:3000/user/getbyid/${booking.userId}`);
          const userData = await userResponse.json();
          const userName = userData.data.userName;
  
          const roomResponse = await fetch(`http://localhost:3000/room/getbyid/${booking.roomId}`);
          const roomData = await roomResponse.json();
          const locationId = roomData.data.locationId;
  
          const locationResponse = await fetch(`http://localhost:3000/locationbyid/${locationId}`);
          const locationData = await locationResponse.json();
          const locationName = locationData.data.name;
  
          return {
            ...booking,
            userName,
            locationName,
          };
        }));
  
        setBookings(allBookingsWithDetails); 
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
  
    fetchBookings();
  }, [userId]);

  const pendingBookings = bookings.filter(booking => booking.status === 'pending');

  // const filteredUsers = selectedDate 
  //   ? users.filter(user => {
  //       const userDate = new Date(user.time);
  //       return userDate.toDateString() === selectedDate.toDateString();
  //     })
  //   : [];

const [monthlyBookings, setMonthlyBookings] = useState(0); // Số booking trong tháng
const [monthlyRevenue, setMonthlyRevenue] = useState(0);   // Doanh thu trong tháng

useEffect(() => {
  const fetchMonthlyStats = async () => {
    try {
      // Lấy tháng và năm hiện tại
      const currentMonth = new Date().getMonth() + 1; // JavaScript getMonth() trả từ 0-11
      const currentYear = new Date().getFullYear();

      // Gọi API với query params
      const response = await fetch(`http://localhost:3000/booking/revenuebymonth/${userId}?month=${currentMonth}&year=${currentYear}`);
      if (!response.ok) {
        throw new Error("Failed to fetch monthly stats");
      }
      const data = await response.json();

      setMonthlyBookings(data.totalBookings); 
      setMonthlyRevenue(data.totalRevenue);  
    } catch (error) {
      console.error("Error fetching monthly stats:", error);
    }
  };

  fetchMonthlyStats();
}, [userId]); // Chạy lại khi `userId` thay đổi

  const filteredBookingsByDate = selectedDate
    ? bookings.filter((booking) =>
        moment(booking.dateBooking).isSame(selectedDate, 'day')
      )
  : bookings;  

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
                  <p className="number">{monthlyBookings}</p>
                </div>
                <div className="separator">
                  <div></div>
                </div>
                <div className="card-footer">
                  <p>Cập nhật lần cuối: {moment().format('DD/MM/YYYY')}</p>
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
                  <p className="number">{monthlyRevenue.toLocaleString()} VND</p>
                </div>
                <div className="separator">
                  <div></div>
                </div>
                <div className="card-footer">
                  <p>Cập nhật lần cuối: {moment().format('DD/MM/YYYY')}</p>
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
              {(pendingBookings || []).map((booking) => (
                <tr
                  key={booking.id}
                  className="cursor-pointer hover:bg-blue-100"
                  onClick={() => handleRowClick(booking.id)}>
                    <td>
                    <div className="location-icon">
                      <img src="location-icon.png" alt="Location Icon" />
                    </div>
                    </td>
                    <td>{booking.locationName}</td>
                    <td>{booking.userName}</td>
                    <td>{moment(booking.dateBooking).format('DD-MM-YYYY')}</td>
                    <td>
                      <span className={booking.status === 'đã duyệt' ? 'status-label-2' : 'status-label'}>
                      {booking.status === 'pending' ? 'Chờ duyệt' : booking.status}
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
                {filteredBookingsByDate.length > 0 ? (
                filteredBookingsByDate.map((booking) => (
                  <div
                    className="user-info"
                    key={booking.id}
                    onClick={() => handleBusinessDetailClick(booking.id)} 
                    style={{ cursor: 'pointer' }}
                  >
                    <img src="avatar.png" alt="User Avatar" className="user-avatar" />
                    <div className="user-details">
                      <h2 className="user-name">{booking.userName}</h2>
                      <p className="user-time">{moment(booking.dateBooking).format('DD-MM-YYYY hh:mm:ss')}</p>
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