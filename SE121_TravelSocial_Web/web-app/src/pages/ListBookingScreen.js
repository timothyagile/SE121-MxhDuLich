import React from 'react';
import '../styles/ListBookingScreen.css';
import { useNavigate } from 'react-router-dom';
import { FaAngleRight,FaBell, FaEye } from 'react-icons/fa';
import Pagination from '../components/Pagination';


const ListBookingScreen = () => {

const navigate = useNavigate();

  return (
    <div class="container">
      <div class="containerformobile">
        
        <div class="containerlistbusiness widthlistbusiness">
          <div class="listbusinessbody scroll-container mh-900">
            <input type="text" class="search" placeholder="Tìm kiếm nhà kinh doanh"/>
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
              
                <tbody class="row-container">


                  <tr >
                        <td>1</td>
                        <td>
                          <div class="namefield">
                            <img src="avatar.png" alt="User Avatar" class="user-avatar"></img>
                            <p>Du lịch hồ cốc - vùng tàu</p>
                          </div>
                          </td>
                        
                        <td>P3453212</td>
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
                        
                        <td>P3453212</td>
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
                        
                        <td>P3453212</td>
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
                        
                        <td>P3453212</td>
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
                        
                        <td>P3453212</td>
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
                        
                        <td>P3453212</td>
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
                        
                        <td>P3453212</td>
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
                        
                        <td>P3453212</td>
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
                        
                        <td>P3453212</td>
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
                        
                        <td>P3453212</td>
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

export default ListBookingScreen;