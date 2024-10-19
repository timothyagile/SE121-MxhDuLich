import React from 'react';
import '../styles/ListBookingScreen.css';
import { useNavigate } from 'react-router-dom';
import { FaAngleRight,FaBell, FaEye, FaSearch } from 'react-icons/fa';
import Pagination from '../components/Pagination';


const ListBookingBusinessScreen = () => {

const navigate = useNavigate();

  return (
    <div class="container">
      <div class="containerformobile">
        
        <div class="containerlistbusiness widthlistbusiness">
          <div class="listbusinessbody scroll-container mh-900">

            <div class="search">
              <FaSearch class="icon-search"/>
              <input type="text" class="input-text" placeholder="Tìm kiếm lượt đặt chỗ"/>
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
              
                <tbody class="row-container">


                  <tr >
                        <td>1</td>
                        <td>
                          <div class="namefield">
                            <img src="avatar.png" alt="User Avatar" class="user-avatar"></img>
                            <p>Du lịch hồ cốc - vùng tàu</p>
                          </div>
                          </td>
                        
                          <td>
                          <div class="namefield">
                            <img src="avatar.png" alt="User Avatar" class="user-avatar"></img>
                            <p>Du lịch hồ cốc - vùng tàu</p>
                          </div>
                          </td>
                        <td>19/05/2024</td>
                        

                        <td>đang chờ</td>
                        <td>50,000,000đ</td>
                        <td>
                          <button type="submit" class="icon-container iconview" onClick={() => navigate("/detailbooking")}>
                            <FaEye />
                          </button>
                        </td>
                  </tr>
                  
                  <tr >
                        <td>1</td>
                        <td>
                          <div class="namefield">
                            <img src="avatar.png" alt="User Avatar" class="user-avatar"></img>
                            <p>Du lịch hồ cốc - vùng tàu</p>
                          </div>
                          </td>
                        
                          <td>
                          <div class="namefield">
                            <img src="avatar.png" alt="User Avatar" class="user-avatar"></img>
                            <p>Du lịch hồ cốc - vùng tàu</p>
                          </div>
                          </td>
                        <td>19/05/2024</td>
                        

                        <td>
                          <span class="status-label">đang chờ</span>
                          </td>
                        <td>50,000,000đ</td>
                        <td>
                          <div class="icon-container">
                              <FaEye />
                          </div>
                        </td>
                  </tr>
                  

                  <tr >
                        <td>1</td>
                        <td>
                          <div class="namefield">
                            <img src="avatar.png" alt="User Avatar" class="user-avatar"></img>
                            <p>Du lịch hồ cốc - vùng tàu</p>
                          </div>
                          </td>
                        
                          <td>
                          <div class="namefield">
                            <img src="avatar.png" alt="User Avatar" class="user-avatar"></img>
                            <p>Du lịch hồ cốc - vùng tàu</p>
                          </div>
                          </td>
                        <td>19/05/2024</td>
                        

                        <td><span class="status-label-2">đã duyệt</span></td>
                        <td>50,000,000đ</td>
                        <td>
                          <div class="icon-container">
                              <FaEye />
                          </div>
                        </td>
                  </tr>
                  

                  <tr >
                        <td>1</td>
                        <td>
                          <div class="namefield">
                            <img src="avatar.png" alt="User Avatar" class="user-avatar"></img>
                            <p>Du lịch hồ cốc - vùng tàu</p>
                          </div>
                          </td>
                        
                          <td>
                          <div class="namefield">
                            <img src="avatar.png" alt="User Avatar" class="user-avatar"></img>
                            <p>Du lịch hồ cốc - vùng tàu</p>
                          </div>
                          </td>
                        <td>19/05/2024</td>
                        

                        <td>đang chờ</td>
                        <td>50,000,000đ</td>
                        <td>
                          <div class="icon-container">
                              <FaEye />
                          </div>
                        </td>
                  </tr>
                  

                  <tr >
                        <td>1</td>
                        <td>
                          <div class="namefield">
                            <img src="avatar.png" alt="User Avatar" class="user-avatar"></img>
                            <p>Du lịch hồ cốc - vùng tàu</p>
                          </div>
                          </td>
                        
                          <td>
                          <div class="namefield">
                            <img src="avatar.png" alt="User Avatar" class="user-avatar"></img>
                            <p>Du lịch hồ cốc - vùng tàu</p>
                          </div>
                          </td>
                        <td>19/05/2024</td>
                        

                        <td>đang chờ</td>
                        <td>50,000,000đ</td>
                        <td>
                          <div class="icon-container">
                              <FaEye />
                          </div>
                        </td>
                  </tr>
                  
                  <tr >
                        <td>1</td>
                        <td>
                          <div class="namefield">
                            <img src="avatar.png" alt="User Avatar" class="user-avatar"></img>
                            <p>Du lịch hồ cốc - vùng tàu</p>
                          </div>
                          </td>
                        
                          <td>
                          <div class="namefield">
                            <img src="avatar.png" alt="User Avatar" class="user-avatar"></img>
                            <p>Du lịch hồ cốc - vùng tàu</p>
                          </div>
                          </td>
                        <td>19/05/2024</td>
                        

                        <td>đang chờ</td>
                        <td>50,000,000đ</td>
                        <td>
                          <div class="icon-container">
                              <FaEye />
                          </div>
                        </td>
                  </tr>
                  

                  <tr >
                        <td>1</td>
                        <td>
                          <div class="namefield">
                            <img src="avatar.png" alt="User Avatar" class="user-avatar"></img>
                            <p>Du lịch hồ cốc - vùng tàu</p>
                          </div>
                          </td>
                        
                          <td>
                          <div class="namefield">
                            <img src="avatar.png" alt="User Avatar" class="user-avatar"></img>
                            <p>Du lịch hồ cốc - vùng tàu</p>
                          </div>
                          </td>
                        <td>19/05/2024</td>
                        

                        <td>đang chờ</td>
                        <td>50,000,000đ</td>
                        <td>
                          <div class="icon-container">
                              <FaEye />
                          </div>
                        </td>
                  </tr>
                  
                  <tr >
                        <td>1</td>
                        <td>
                          <div class="namefield">
                            <img src="avatar.png" alt="User Avatar" class="user-avatar"></img>
                            <p>Du lịch hồ cốc - vùng tàu</p>
                          </div>
                          </td>
                        
                          <td>
                          <div class="namefield">
                            <img src="avatar.png" alt="User Avatar" class="user-avatar"></img>
                            <p>Du lịch hồ cốc - vùng tàu</p>
                          </div>
                          </td>
                        <td>19/05/2024</td>
                        

                        <td>đang chờ</td>
                        <td>50,000,000đ</td>
                        <td>
                          <div class="icon-container">
                              <FaEye />
                          </div>
                        </td>
                  </tr>

                  <tr >
                        <td>1</td>
                        <td>
                          <div class="namefield">
                            <img src="avatar.png" alt="User Avatar" class="user-avatar"></img>
                            <p>Du lịch hồ cốc - vùng tàu</p>
                          </div>
                          </td>
                        
                          <td>
                          <div class="namefield">
                            <img src="avatar.png" alt="User Avatar" class="user-avatar"></img>
                            <p>Du lịch hồ cốc - vùng tàu</p>
                          </div>
                          </td>
                        <td>19/05/2024</td>
                        

                        <td>đang chờ</td>
                        <td>50,000,000đ</td>
                        <td>
                          <div class="icon-container">
                              <FaEye />
                          </div>
                        </td>
                  </tr>

                  <tr >
                        <td>1</td>
                        <td>
                          <div class="namefield">
                            <img src="avatar.png" alt="User Avatar" class="user-avatar"></img>
                            <p>Du lịch hồ cốc - vùng tàu</p>
                          </div>
                          </td>
                        
                          <td>
                          <div class="namefield">
                            <img src="avatar.png" alt="User Avatar" class="user-avatar"></img>
                            <p>Du lịch hồ cốc - vùng tàu</p>
                          </div>
                          </td>
                        <td>19/05/2024</td>
                        

                        <td>đang chờ</td>
                        <td>50,000,000đ</td>
                        <td>
                          <div class="icon-container">
                              <FaEye />
                          </div>
                        </td>
                  </tr>
                  
                </tbody>
                
            </table>
          </div>
          <Pagination totalPages={4}/>
        </div>
      </div>
      
    </div>
  );
};

export default ListBookingBusinessScreen;