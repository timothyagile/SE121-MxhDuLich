import { useState } from 'react';
import React from 'react';
import '../styles/SideBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaMapMarkerAlt, FaBookOpen, FaServicestack, FaChartBar } from 'react-icons/fa';

const SideBar = () => {

  const navigate = useNavigate(); 

  const iconSources = [
    {
      inactive: <FaHome />,
      active: <FaHome className="text-white" />,
      link: "/dashboard",
    },
    {
      inactive: <FaMapMarkerAlt />,
      active: <FaMapMarkerAlt className="text-white" />,
      link: "/listbusiness",
    },
    {
      inactive: <FaBookOpen />,
      active: <FaBookOpen className="text-white" />,
    },
    {
      inactive: <FaServicestack />,
      active: <FaServicestack className="text-white" />,
    },
    {
      inactive: <FaChartBar />,
      active: <FaChartBar className="text-white" />,
    },
  ];

  const [activeItems, setActiveItems] = useState([
    true,
    false,
    false,
    false,
    false,
  ]);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    const newActiveItems = activeItems.map((_, i) => i === index);
    setActiveItems(newActiveItems);
    setActiveIndex(index);
    navigate(iconSources[index].link);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={require("../assets/images/logo.png")} alt="Travel Social" />
      </div>
      <div className="sidebar-menu">
        <ul>
          {activeItems.map((isActive, index) => (
            // <li
            //   key={index}
            //   className={`menu-item ${activeIndex === index ? 'active' : ''}`}
            //   onClick={() => handleClick(index)}
            // >
            //   <img src={isActive ? iconSources[index].active : iconSources[index].inactive} alt={`Menu Item ${index}`} />
            // </li>

            <li
  key={index}
  className={`menu-item ${activeIndex === index ? 'active' : ''}`}
  onClick={() => handleClick(index)}
>
  {activeItems[index] ? (
    <div className="icon-active">{iconSources[index].active}</div>
  ) : (
    iconSources[index].inactive
  )}
</li>
          ))}
        </ul>
      </div>
      <div className="sidebar-footer">
        <div className="version">Version 1.0</div>
      </div>
    </div>
  );
};

export default SideBar;