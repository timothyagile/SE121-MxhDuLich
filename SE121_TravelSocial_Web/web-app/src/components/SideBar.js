import { useState, useEffect } from 'react';
import React from 'react';
import '../styles/SideBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaMapMarkerAlt, FaBookOpen, FaServicestack, FaChartBar } from 'react-icons/fa';
import { RiCustomerServiceFill } from "react-icons/ri";

const SideBar = ({role}) => {

  const navigate = useNavigate(); 

  const adminIconSources = [
    {
      inactive: <FaHome />,
      active: <FaHome className="text-white" />,
      link: "/dashboard/admin",
    },
    {
      inactive: <FaMapMarkerAlt />,
      active: <FaMapMarkerAlt className="text-white" />,
      link: "/business/list",
    },
    {
      inactive: <FaBookOpen />,
      active: <FaBookOpen className="text-white" />,
      link:"/location/list",
    },
    {
      inactive: <FaServicestack />,
      active: <FaServicestack className="text-white" />,
      link:"/booking/list",
    },
    {
      inactive: <FaChartBar />,
      active: <FaChartBar className="text-white" />,
      link:"/statistic"
    },
  ];

  const businessIconSources = [
    { inactive: <FaHome />, active: <FaHome className="text-white" />, link: "/dashboard/business" },
    { inactive: <FaBookOpen />, active: <FaBookOpen className="text-white" />, link: "/business/location/list" },
    { inactive: <FaServicestack />, active: <FaServicestack className="text-white" />, link: "/business/booking/list" },
    { inactive: <RiCustomerServiceFill/>, active: <RiCustomerServiceFill className="text-white" />, link: "/business/chat" },
    { inactive: <FaChartBar />,  active: <FaChartBar className="text-white" />,  link:"business/statistic" },
  ];

  const [iconSources, setIconSources] = useState([]);

  useEffect(() => {
    if (role === 'admin') {
      setIconSources(adminIconSources);
    } else if (role === 'business') {
      setIconSources(businessIconSources);
    }
  }, [role]);

  // const [activeItems, setActiveItems] = useState([
  //   true,
  //   false,
  //   false,
  //   false,
  //   false,
  // ]);

  // const [activeIndex, setActiveIndex] = useState(0);

  const [activeItems, setActiveItems] = useState(Array(iconSources.length).fill(false));
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
          {iconSources.map((icon, index) => (
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
                <div className="icon-active">{icon.active}</div>
              ) : (
                icon.inactive
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