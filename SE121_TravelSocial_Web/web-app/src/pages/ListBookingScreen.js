import React from 'react';
import '../styles/ListBookingScreen.css';
import { useNavigate } from 'react-router-dom';
import { FaAngleRight,FaBell, FaEye, FaSearch } from 'react-icons/fa';
import Pagination from '../components/Pagination';
import { useEffect,useState } from 'react';
import { businesses, bookings } from './BusinessData';


const ListBookingScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleRowClick = (id) => {
    navigate(`/booking/detail/${id}`); 
  };
  
  const filteredData = bookings.filter((booking) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      booking.name.toLowerCase().includes(searchTermLower) || 
      booking.code.toLowerCase().includes(searchTermLower) || 
      booking.status.toLowerCase().includes(searchTermLower)
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
    <div class="container">
      <div class="containerformobile">
        
        <div class="containerlistbusiness widthlistbusiness">
          <div class="listbusinessbody scroll-container mh-900">

            <div class="search">
              <FaSearch class="icon-search"/>
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
                        <th>Tên khách hàng</th>
                        <th>Mã phiếu</th>
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
                    
                  >
                    <td>{index + 1 + (currentPage - 1) * 10}</td>
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

export default ListBookingScreen;