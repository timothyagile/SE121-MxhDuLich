import React from 'react';
import { FaBell } from 'react-icons/fa';



const Header = ({ title, avatar = 'avatar.png' }) => {

    return (
      <div className="dashboard-header">
        <div class="header-section1">
          <div className="notification-icon">
            <FaBell />
          </div>
          <div className="admin-info">
            <img src={avatar} alt="Admin Avatar" className="admin-avatar" />
            <div className="admin-details">
              <h2 className="admin-name">Tô Hoàng Huy</h2>
              <p className="admin-role">Quản trị viên</p>
            </div>
          </div>
        </div>
        <h1 className="screen-title">{title}</h1>
      </div>
    );
  };

  export default Header;