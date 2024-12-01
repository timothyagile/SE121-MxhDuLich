import React from 'react';
import { FaBell, FaArrowDown } from 'react-icons/fa';
import { IoIosArrowDown } from "react-icons/io";



const Header = ({ mainTitle,subTitle, avatar = 'avatar.png' }) => {

    return (
      <div className="dashboard-header">
        <div class="header-section1">
        <div className="header-container">
          <h1 className="main-title">{mainTitle}</h1>
          {subTitle && <h2 className="sub-title">{subTitle}</h2>}
        </div>
          <div className="notification-icon bg-gray-100 p-3 rounded-lg">
            <FaBell />
          </div>
          <div className="admin-info items-center space-x-2 border rounded-lg p-2">
            <img src={avatar} alt="Admin Avatar" className="admin-avatar" />
            <div className="admin-details">
              <div class="font-semibold flex">
                Tô Hoàng Huy
                  <IoIosArrowDown/>
              </div>
              <div class="text-gray-500 text-sm">
              Quản trị viên
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
    );
  };

  export default Header;