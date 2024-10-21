import React from 'react';
import '../styles/ListBuninessScreen.css'
import { FaAngleRight,FaBell, FaEye, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import Pagination from '../components/Pagination';
import { businesses } from './BusinessData';
import { useState, useEffect } from 'react';


const ITEMS_PER_PAGE = 10;

const ListBusinessScreen = () => {

  const [currentPage, setCurrentPage] = useState(1);

  // Tính tổng số trang
  // const totalItems = businesses.length;

  // Lấy dữ liệu của trang hiện tại
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const navigate = useNavigate(); 

  const handleRowClick = (id) => {
    navigate(`/business/detail/${id}`); 
  };

  const [searchTerm, setSearchTerm] = useState('');
  const filteredData = businesses.filter((business) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      business.name.toLowerCase().includes(searchTermLower) || 
      business.code.toLowerCase().includes(searchTermLower) || 
      business.contact.toLowerCase().includes(searchTermLower) || 
      business.phone.toLowerCase().includes(searchTermLower)
    );
  });

  const currentData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
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
                placeholder="Tìm kiếm nhà kinh doanh"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <table className="business-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên</th>
                  <th>Mã</th>
                  <th>CCCD/CMND</th>
                  <th>Điện Thoại</th>
                  <th>Loại</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="row-container">
                {currentData.map((business) => (
                  <tr 
                    key={business.id} 
                   
                    className="clickable-row"
                  >
                    <td>{business.id}</td>
                    <td>
                      <div className="namefield">
                        <img 
                          src={require(`../assets/images/${business.avatar}`)} 
                          alt="User Avatar" 
                          className="user-avatar" 
                        />
                        <p>{business.name}</p>
                      </div>
                    </td>
                    <td>{business.code}</td>
                    <td>{business.contact}</td>
                    <td>{business.phone}</td>
                    <td>{business.type}</td>
                    <td>
                      <button 
                        type="button" 
                        className="icon-container iconview"
                        onClick={() => handleRowClick(business.id)} 
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
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      
    </div>
  );
};

export default ListBusinessScreen;