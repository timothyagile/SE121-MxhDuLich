import React from 'react';
import '../styles/ListBuninessScreen.css'
import { FaAngleRight,FaBell, FaEye } from 'react-icons/fa';

const ListBusinessScreen = () => {
  return (
    <div class="container">
      <div class = "containerformobile">
        <div class="dashboardheader">
            <div className="notification-icon">
              <FaBell></FaBell>
            </div>
            <div className="admin-info">
              <img src="avatar.png" alt="Admin Avatar" className="admin-avatar" />
              <div className="admin-details">
                <h2 className="admin-name">Tô Hoàng Huy</h2>
                <p className="admin-role">Quản trị viên</p>
              </div>
            </div>
        </div>
        <div class="containerlistbusiness widthlistbusiness">
          <div class="listbusinessbody">
            <input type="text" class="search" placeholder="Tìm kiếm nhà kinh doanh"/>
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
          
          <div class="pagination">
              <span class="page">1</span>
              <span class="page">2</span>
              <span class="page">3</span>
              <span class="page">4</span>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ListBusinessScreen;