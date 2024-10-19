import React from 'react';
import '../styles/ListBuninessScreen.css'
import { FaAngleRight,FaBell, FaEye, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import Pagination from '../components/Pagination';


const ListBusinessScreen = () => {
  const navigate = useNavigate(); 

  return (
    <div class="container">
      <div class="containerformobile">
        
        <div class="containerlistbusiness widthlistbusiness">
          <div class="listbusinessbody scroll-container mh-900">
            <div class="search">
              <FaSearch class="icon-search"/>
              <input type="text" class="input-text" placeholder="Tìm kiếm nhà kinh doanh"/>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên nhà kinh doanh</th>
                        <th>Mã số</th>
                        <th>CMND/CCCD</th>
                        <th>Số điện thoại</th>
                        <th>Loại</th>
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
                        <td>KH3453212</td>
                        <td>079303041265</td>
                        <td>0987654321</td>
                        <td>Camping</td>
                        <td>
                          <button type="submit" class="icon-container iconview" onClick={() => navigate("/detailbusiness")}>
                            <FaEye />
                          </button>
                          {/* <div class="icon-container">
                              <FaEye />
                              <button type="submit" className="login-button"  onClick={() => navigate("/dashboard")} >Đăng nhập</button>
                          </div> */}
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
                        <td>KH3453212</td>
                        <td>079303041265</td>
                        <td>0987654321</td>
                        <td>Camping</td>
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
                        <td>KH3453212</td>
                        <td>079303041265</td>
                        <td>0987654321</td>
                        <td>Camping</td>
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
                        <td>KH3453212</td>
                        <td>079303041265</td>
                        <td>0987654321</td>
                        <td>Camping</td>
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
                        <td>KH3453212</td>
                        <td>079303041265</td>
                        <td>0987654321</td>
                        <td>Camping</td>
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
                        <td>KH3453212</td>
                        <td>079303041265</td>
                        <td>0987654321</td>
                        <td>Camping</td>
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
                        <td>KH3453212</td>
                        <td>079303041265</td>
                        <td>0987654321</td>
                        <td>Camping</td>
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
                        <td>KH3453212</td>
                        <td>079303041265</td>
                        <td>0987654321</td>
                        <td>Camping</td>
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

export default ListBusinessScreen;