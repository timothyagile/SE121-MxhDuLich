import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaAngleRight,FaBell, FaEye,FaSearchLocation, FaEdit, FaStar, FaStarHalfAlt, FaBed, FaTimesCircle, FaHotTub, FaWifi, FaVolumeOff, FaSnowflake} from 'react-icons/fa';
import { FaRankingStar, FaX, FaPlus } from "react-icons/fa6";
import { MdEventNote } from "react-icons/md";
import '../styles/DetailLocationScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope, faUser, faMapMarkerAlt, faMemo } from '@fortawesome/free-solid-svg-icons';

const AddLocationScreen =() => {

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
               

                <div class="containerlistbusiness widthlistbusiness none-h">
                <div class="bg-white shadow-md rounded-lg max-w-4xl mx-auto mt-10 p-8">
                    <div class="flex justify-between items-center mb-6">
                        <div class="flex items-center">
                        <img alt="User avatar" class="rounded-full w-10 h-10" height="40" src="https://storage.googleapis.com/a1aa/image/jNianiZn6P5QKJtiaB9as2gmjrpEdyoVjnaQCxNkqnIGOE6E.jpg" width="40"/>
                        <span class="ml-2 text-gray-700">
                        Hồ Cá
                        </span>
                        </div>
                        <button class="text-gray-500">
                        <i class="fas fa-bell">
                        </i>
                        </button>
                    </div>
                    <div class="space-y-4">
                        <div class="flex items-center space-x-4">
                        <button class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <i class="fas fa-camera text-gray-500">
                        </i>
                        </button>
                        <input class="flex-1 p-3 border border-gray-300 rounded-lg" placeholder="Tên địa điểm" type="text"/>
                        </div>
                        <input class="w-full p-3 border border-gray-300 rounded-lg" placeholder="Địa chỉ" type="text"/>
                        <select class="w-full p-3 border border-gray-300 rounded-lg">
                        <option>
                        Loại
                        </option>
                        </select>
                        <textarea class="w-full p-3 border border-gray-300 rounded-lg h-32" placeholder="Mô tả"></textarea>
                        <input class="w-full p-3 border border-gray-300 rounded-lg" placeholder="Minh chứng đăng ký kinh doanh" type="text"/>
                        <div class="flex items-center space-x-4">
                        <button class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <i class="fas fa-camera text-gray-500">
                        </i>
                        </button>
                        <textarea class="flex-1 p-3 border border-gray-300 rounded-lg h-32"></textarea>
                        </div>
                    </div>
                    <div class="flex justify-end space-x-4 mt-6">
                        <button class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg">
                        Hủy
                        </button>
                        <button class="px-6 py-2 bg-blue-500 text-white rounded-lg">
                        Lưu
                        </button>
                    </div>
                    </div>  
  
                </div>

            </div>
        </div>
    );
};

export default AddLocationScreen;