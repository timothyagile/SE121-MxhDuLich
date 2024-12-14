import React, { useState, useEffect } from 'react';
import '../styles/ListBookingScreen.css';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaEye } from 'react-icons/fa';
import Pagination from '../components/Pagination';
import { bookings } from '../pages/BusinessData';  
import axios from 'axios';
import moment from 'moment';

const ListBookingBusinessScreen = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookings, setBookings] = useState([]);

  const userId = localStorage.getItem('userId'); 
  console.log('businessid ', userId);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`http://localhost:3000/booking/getbybusinessid/${userId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const bookingsWithDetails = await Promise.all(data.data.map(async (booking) => {

          const userResponse = await fetch(`http://localhost:3000/user/getbyid/${booking.userId}`);
          const userData = await userResponse.json();
          const userName = userData.data.userName; 

          const roomResponse = await fetch(`http://localhost:3000/room/getbyid/${booking.roomId}`);
          const roomData = await roomResponse.json();
          const locationId = roomData.data.locationId;
          console.log('location: ',locationId) 
          
          const locationResponse = await fetch(`http://localhost:3000/locationbyid/${locationId}`);
          const locationData = await locationResponse.json();
          const locationName = locationData.data.name; 
          return {
            ...booking,
            userName, 
            locationName, 
          };
        }));
  
        setBookings(bookingsWithDetails); 
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
  
    fetchBookings();
  }, [userId]);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (id) => {
    navigate(`/business/booking/detail/${id}`);
  };

  const filteredData = bookings.filter((booking) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      booking._id.toLowerCase().includes(searchTermLower) ||
      booking.roomId.toLowerCase().includes(searchTermLower) ||
      booking.dateBooking.toLowerCase().includes(searchTermLower)
    );
  });

  const currentData = filteredData.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalItems = filteredData.length;

  return (
    <div className="container">
      <div className="containerformobile">
        <div className="containerlistbusiness widthlistbusiness">
          <div className="listbusinessbody scroll-container mh-900">
            <div className="search">
              <FaSearch className="icon-search" />
              <input 
                type="text" 
                className="input-text" 
                placeholder="Tìm kiếm lượt đặt chỗ" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên địa điểm</th>
                  <th>Tên khách hàng</th>
                  <th>Ngày đặt</th>
                  <th>Trạng thái</th>
                  <th>Tổng tiền</th>
                  <th></th>
                </tr>
              </thead>

              <tbody className="row-container">
                {currentData.map((booking, index) => (
                  <tr 
                    key={booking.id} 
                    className="clickable-row"
                    onClick={() => handleRowClick(booking.id)}
                  >
                    <td>{index + 1}</td>
                    <td>
                      <div className="namefield">
                        <img 
                          src={booking.avatar ? require(`../assets/images/${booking.avatar}`) : require('../assets/images/avt.png')} 
                          alt="User Avatar" 
                          className="user-avatar" 
                        />
                        <p>{booking.locationName}</p>
                      </div>
                    </td>
                    <td>{booking.userName}</td>
                    <td>{moment(booking.dateBooking).format('DD-MM-YYYY')}</td>
                    <td>
                      <span className={`status-label${booking.status === 'đã duyệt' ? '-2' : ''}`}>
                      {booking.status === 'pending' ? 'Chờ duyệt' : booking.status}
                      </span>
                    </td>
                    <td>{booking.amount}</td>
                    <td>
                      <button 
                        type="button" 
                        className="icon-container iconview"
                        onClick={() => handleRowClick(booking.id)} 
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            totalItems={totalItems}
            itemsPerPage={10}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ListBookingBusinessScreen;
