import { useState } from 'react';
import React from 'react';
import '../styles/SideBar.css';
import { FaHome, FaMapMarkerAlt, FaBookOpen, FaServicestack, FaChartBar } from 'react-icons/fa';

const SideBar = () => {
  // const iconSources = [
  //   {
  //     inactive: require("../assets/icons/home.png"),
  //     active: require("../assets/icons/active-home.png"),
  //   },
  //   {
  //     inactive: require("../assets/icons/location.png"),
  //     active: require("../assets/icons/active-location.png"),
  //   },
  //   {
  //     inactive: require("../assets/icons/booking.png"),
  //     active: require("../assets/icons/active-booking.png"),
  //   },
  //   {
  //     inactive: require("../assets/icons/service.png"),
  //     active: require("../assets/icons/active-service.png"),
  //   },
  //   {
  //     inactive: require("../assets/icons/histogram.png"),
  //     active: require("../assets/icons/active-histogram.png"),
  //   },
  // ];

  const iconSources = [
    {
      inactive: <FaHome />,
      active: <FaHome className="text-white" />,
    },
    {
      inactive: <FaMapMarkerAlt />,
      active: <FaMapMarkerAlt className="text-white" />,
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