import React from 'react';
import { FaBell, FaArrowDown } from 'react-icons/fa';
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from 'react';



const Header = ({ mainTitle,subTitle }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Lấy ID từ localStorage
        const userId = localStorage.getItem('userId');

        if (!userId) {
          console.error('User ID is missing');
          return;
        }

        // Gọi API để lấy chi tiết người dùng
        const response = await fetch(`http://localhost:3000/user/getbyid/${userId}`);
        const data = await response.json();

        setUserData(data.data);
        console.log(userData)
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

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
          <img
            src={userData?.avatar || 'avatar.png'}
            alt="Admin Avatar"
            className="admin-avatar"
          />            
          <div className="admin-details">
              <div class="font-semibold flex">
              {userData?.userName || 'Loading...'}
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