import React from 'react';
import '../styles/ListLocationScreen.css';
import { useState,useEffect } from 'react';
import { FaAngleRight,FaBell, FaEye, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { locations } from '../pages/BusinessData';
import Pagination from '../components/Pagination';


const ListLocationBusinessScreen = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredLocations = locations.filter((location) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      location.name.toLowerCase().includes(searchTermLower) ||
      location.type.toLowerCase().includes(searchTermLower) ||
      location.address.toLowerCase().includes(searchTermLower)
    );
  });
  
  const itemsPerPage = 10;
  const currentData = filteredLocations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalItems = filteredLocations.length;

  const handleRowClick = (id) => {
    navigate(`/business/location/detail/${id}`);
  };

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
                placeholder="Tìm kiếm địa điểm" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên nhà kinh doanh</th>
                        <th>Loại</th>
                        <th>Số điện thoại</th>
                        <th></th>
                    </tr> 
                </thead>
            
                <tbody className="row-container">
                {currentData.map((location, index) => (
                  <tr 
                    key={location.id} 
                    className="clickable-row"
                    onClick={() => handleRowClick(location.id)}
                  >
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>
                      <div className="namefield">
                        <img 
                          src={require(`../assets/images/${location.avatar}`)} 
                          alt="User Avatar" 
                          className="user-avatar" 
                        />
                        <p>{location.name}</p>
                      </div>
                    </td>
                    <td>{location.type}</td>
                    <td>{location.address}</td>
                    <td>
                      <button 
                        type="button" 
                        className="icon-container iconview"
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

export default ListLocationBusinessScreen;