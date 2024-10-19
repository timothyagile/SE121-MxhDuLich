import React from 'react';
import '../styles/ListLocationScreen.css'
import { FaAngleRight,FaBell, FaEye, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';


const ListLocationBusinessScreen = () => {
  const navigate = useNavigate();

  return (
    <div class="container">
      <div class="containerformobile">
        
        <div class="containerlistbusiness widthlistbusiness">
          <div class="listbusinessbody scroll-container mh-900">
          <div class="search">
              <FaSearch class="icon-search"/>
              <input type="text" class="input-text" placeholder="Tìm kiếm địa điểm"/>
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
              
                <tbody class="row-container">
                  
                  <tr >
                        <td>1</td>
                        <td>
                          <div class="namefield">
                            <img src="avatar.png" alt="User Avatar" class="user-avatar"></img>
                            <p>Du lịch hồ cốc - vùng tàu</p>
                          </div>
                        
                          
                          </td>
                        
                        <td>Camping</td>
                        <td>FFXQ+X94, Bưng Riềng, Xuyên Mộc, Bà Rịa - Vũng Tàu, Vietnam</td>
                        <td>
                          <button type="submit" class="icon-container iconview" onClick={() => navigate("/detaillocation")}>
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
                        
                        <td>Camping</td>
                        <td>FFXQ+X94, Bưng Riềng, Xuyên Mộc, Bà Rịa - Vũng Tàu, Vietnam</td>
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
                        
                        <td>Camping</td>
                        <td>FFXQ+X94, Bưng Riềng, Xuyên Mộc, Bà Rịa - Vũng Tàu, Vietnam</td>
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
                        
                        <td>Camping</td>
                        <td>FFXQ+X94, Bưng Riềng, Xuyên Mộc, Bà Rịa - Vũng Tàu, Vietnam</td>
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
                        
                        <td>Camping</td>
                        <td>FFXQ+X94, Bưng Riềng, Xuyên Mộc, Bà Rịa - Vũng Tàu, Vietnam</td>
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
                        
                        <td>Camping</td>
                        <td>FFXQ+X94, Bưng Riềng, Xuyên Mộc, Bà Rịa - Vũng Tàu, Vietnam</td>
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
                        
                        <td>Camping</td>
                        <td>FFXQ+X94, Bưng Riềng, Xuyên Mộc, Bà Rịa - Vũng Tàu, Vietnam</td>
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
                        
                        <td>Camping</td>
                        <td>FFXQ+X94, Bưng Riềng, Xuyên Mộc, Bà Rịa - Vũng Tàu, Vietnam</td>
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

export default ListLocationBusinessScreen;