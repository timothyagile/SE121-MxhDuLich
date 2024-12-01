import React, { useState, useEffect } from 'react';
import '../styles/ListBookingScreen.css';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaEye } from 'react-icons/fa';
import Pagination from '../components/Pagination';
import { bookings } from '../pages/BusinessData';  

const ListBookingBusinessScreen = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (id) => {
    navigate(`/business/booking/detail/${id}`);
  };

  const filteredData = bookings.filter((booking) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      booking.name.toLowerCase().includes(searchTermLower) ||
      booking.code.toLowerCase().includes(searchTermLower) ||
      booking.date.toLowerCase().includes(searchTermLower)
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
                          src={require(`../assets/images/${booking.avatar}`)} 
                          alt="User Avatar" 
                          className="user-avatar" 
                        />
                        <p>{booking.name}</p>
                      </div>
                    </td>
                    <td>{booking.code}</td>
                    <td>{booking.date}</td>
                    <td>
                      <span className={`status-label${booking.status === 'đã duyệt' ? '-2' : ''}`}>
                        {booking.status}
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
