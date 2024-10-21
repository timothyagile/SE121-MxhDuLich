import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaAngleRight,FaBell, FaEye,FaSearchLocation, FaEdit, FaStar, FaStarHalfAlt, FaBed, FaTimesCircle, FaHotTub, FaWifi, FaVolumeOff, FaSnowflake} from 'react-icons/fa';
import { FaRankingStar, FaX, FaPlus } from "react-icons/fa6";
import { MdEventNote } from "react-icons/md";
import '../styles/DetailLocationScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope, faUser, faMapMarkerAlt, faMemo } from '@fortawesome/free-solid-svg-icons';

const ChatBusinessScreen =() => {

    const [currentTab, setCurrentTab] = useState('baseinfo'); 
    const [currentTab2, setCurrentTab2] = useState('viewratingservice'); 

    const handleBaseInfoClick = () => {
        setCurrentTab('baseinfo'); 
    };

    const handleSpecificInfoClick = () => {
        setCurrentTab('specificinfo'); 
    };

    const handleRatingServiceClick =() => {
        setCurrentTab('ratingservice');
        setCurrentTab2('viewratingservice');
    };

    const handleViewDetails = () => {
        setCurrentTab2('roomDetails'); 
    };

    const navigate = useNavigate ();


    return (
        <div class="container">
           <div class="containerformobile">
                <div class="containerlistbusiness widthlistbusiness">  
                <div class="flex h-100">
   <div class="w-1/4 bg-white p-4">
    <h1 class="text-2xl font-bold mb-4">
     Chat
    </h1>
    <div class="relative mb-4">
     <input class="w-full p-2 pl-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tìm kiếm" type="text"/>
     <i class="fas fa-search absolute left-3 top-3 text-gray-400">
     </i>
    </div>
    <div class="flex items-center p-2 bg-gray-100 rounded-lg mb-2">
     <img alt="User avatar" class="w-10 h-10 rounded-full mr-2" height="40" src="https://storage.googleapis.com/a1aa/image/JpjvKYyvHrbHO5vhDU7Snddgv8aH8mWZ6TRjkvsMXvWcdE6E.jpg" width="40"/>
     <div>
      <p class="font-medium">
       Nguyen Phuc Thinh
      </p>
      <p class="text-sm text-gray-500">
       The location was perfect. The staff was...
      </p>
     </div>
     <span class="ml-auto text-xs text-gray-400">
      24/3
     </span>
    </div>
   </div>
   
   <div class="w-3/4 bg-white p-4 flex flex-col justify-between">
    <div>
     <div class="flex items-center mb-4">
      <img alt="User avatar" class="w-10 h-10 rounded-full mr-2" height="40" src="https://storage.googleapis.com/a1aa/image/JpjvKYyvHrbHO5vhDU7Snddgv8aH8mWZ6TRjkvsMXvWcdE6E.jpg" width="40"/>
      <p class="font-medium">
       Nguyen Phuc Thinh
      </p>
     </div>
     <div class="mb-4">
      <div class="flex items-start mb-2">
       <img alt="User avatar" class="w-8 h-8 rounded-full mr-2" height="40" src="https://storage.googleapis.com/a1aa/image/JpjvKYyvHrbHO5vhDU7Snddgv8aH8mWZ6TRjkvsMXvWcdE6E.jpg" width="40"/>
       <div class="bg-gray-100 p-2 rounded-lg">
        <p>
         xin chào admin, tôi cần hỗ trợ
        </p>
       </div>
       <span class="ml-2 text-xs text-gray-400">
        4:00 PM
       </span>
      </div>
      <div class="flex items-start justify-end mb-2">
       <div class="bg-blue-500 text-white p-2 rounded-lg">
        <p>
         Ok
        </p>
       </div>
       <span class="ml-2 text-xs text-gray-400">
        3:23 PM
       </span>
      </div>
     </div>
    </div>
    <div class="flex items-center">
     <input class="w-full p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Type your message..." type="text"/>
     <button class="ml-2 text-blue-500">
      <i class="fas fa-paper-plane text-2xl">
      </i>
     </button>
    </div>
   </div>
  </div>
                </div>

            </div>
        </div>
    );
};

export default ChatBusinessScreen;