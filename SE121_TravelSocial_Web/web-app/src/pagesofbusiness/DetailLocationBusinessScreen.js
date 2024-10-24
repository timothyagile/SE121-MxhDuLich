import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { FaAngleRight,FaBell, FaEye,FaSearchLocation, FaEdit, FaStar, FaStarHalfAlt, FaBed, FaTimesCircle, FaHotTub, FaWifi, FaVolumeOff, FaSnowflake} from 'react-icons/fa';
import { FaRankingStar, FaX, FaPlus } from "react-icons/fa6";
import { MdEventNote } from "react-icons/md";
import '../styles/DetailLocationScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope, faUser, faMapMarkerAlt, faMemo } from '@fortawesome/free-solid-svg-icons';
import { locations } from '../pages/BusinessData';
import MapComponent from "../components/MapComponent";
import MapBoxComponent from "../components/MapBoxComponent";

const DetailLocationBusinessScreen =() => {

    const [currentTab, setCurrentTab] = useState('baseinfo'); 
    const [currentTab2, setCurrentTab2] = useState('viewratingservice'); 

    const [latitude] = useState(10.8231);  // Thay bằng tọa độ mong muốn
    const [longitude] = useState(106.6297); // Thay bằng tọa độ mong muốn

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

    //Nơi này để chỉnh sửa dữ liệu của base-ìno//
    const [locationInfo, setLocationInfo] = useState(locations);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocationInfo({
          ...locationInfo,
          [name]: value
        });
      };

      const handleSaveClick = () => {
        console.log('Dữ liệu sau khi chỉnh sửa:', locationInfo);
        setIsEditing(false);
    
        // tại đây gọi api để cập nhật dữ liệu lên dtb
      };
    ///////////////////////////////

    //Nơi này để thay đổi dữ liệu của specificinfo
    const [editMode, setEditMode] = useState(false);
    const [images, setImages] = useState([
        "https://storage.googleapis.com/a1aa/image/ouHZc2gP3LKELBzF9b9WhRW9eF7SEgifV3ddt1F1gtse8nKnA.jpg",
        "https://storage.googleapis.com/a1aa/image/sCsVlOJSeD3UTaLoIIrOT6PxhfRdIWZr15lz5azFe8KJ9nKnA.jpg",
        "https://storage.googleapis.com/a1aa/image/2DNYdCQdMDJbBZyhIyouoG7XtT5NuAbJKXjf12XkQuoPfTlTA.jpg",
        "https://storage.googleapis.com/a1aa/image/tSYsfyPeJjhDVki0Vsk8DDATWf9vRxue66bCDKYAEBhL6PVOB.jpg",
        "https://storage.googleapis.com/a1aa/image/gwx1kHK9DQYSPN7stTexFkCK510ikafYbvOKxeRQn12K9nKnA.jpg",
        "https://storage.googleapis.com/a1aa/image/j9gNxOarjEr4DZ4gDrQF2iVtefocfFCRhseXPCdbmIoF6PVOB.jpg",
    ]);
    
      const handleDeleteImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
      };
    
      const handleAddImage = (e) => {
        const file = e.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setImages([...images, imageUrl]);
        }
      };

    const navigate = useNavigate ();


    return (
        <div class="container">
           <div class="containerformobile">
               

                <div class="containerlistbusiness widthlistbusiness">
                    <div class="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow-md p-6">
                        <div class="flex items-center">
                            <img alt="Profile picture of a person" class="w-20 h-20 rounded-full mr-4" height="80" src="https://storage.googleapis.com/a1aa/image/0FPVWfLJ1m0nJS9YfULFrbvezZsDHus5bXhqxVDA6tO9UMKnA.jpg" width="80"/>
                            <div>
                                <h1 class="text-xl font-bold">
                                    Du lịch Hồ Cốc - Vũng Tàu
                                </h1>
                                <div class="flex items-center text-gray-600 mt-2">
                                    <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />
                                    <span>
                                        0987654321
                                    </span>
                                </div>
                                <div class="flex items-center text-gray-600 mt-1">
                                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                                    <span>
                                        hc.vt@example.com
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-6">
                            <div class="flex">
                                <button onClick={handleBaseInfoClick} className={`flex items-center px-4 py-2 ${currentTab === 'baseinfo' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} rounded-t-lg`}>
                                    {/* <FontAwesomeIcon icon={faUser} className="mr-2" /> */}
                                    <FaSearchLocation className="mr-2 text-2xl" />
                                    <span>
                                        Thông tin tổng quan
                                    </span>
                                </button>
                                <button  onClick={handleSpecificInfoClick} class={`flex items-center px-4 py-2 ${currentTab === 'specificinfo' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} rounded-t-lg ml-2`}>
                                    {/* <FontAwesomeIcon icon={faUser} className="mr-2" /> */}
                                    <MdEventNote className="mr-2 text-2xl" />
                                    <span>
                                        Thông tin địa điểm
                                    </span>
                                </button>
                                <button  onClick={handleRatingServiceClick} class={`flex items-center px-4 py-2 ${currentTab === 'ratingservice' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} rounded-t-lg ml-2`}>
                                    <FaRankingStar className="mr-2 text-2xl"/>
                                    <span>
                                        Dịch vụ và đánh giá
                                    </span>
                                </button>
                            </div>
                        </div>
                        {currentTab === 'baseinfo' && (
                            <div class="relative border border-gray-200 rounded-b-lg p-4">
                                <div class="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p class="text-gray-600">Mã địa điểm</p>
                                        {isEditing ? (
                                            <input
                                            type="text"
                                            name="maDiaDiem"
                                            value={'Mã địa điểm'}
                                            onChange={handleInputChange}
                                            className="border p-2 rounded"
                                            />
                                        ) : (
                                        <p class="font-semibold">124335111</p>
                                        )}
                                    </div>
                                    <div>
                                        <p class="text-gray-600">Tên địa điểm</p>
                                        {isEditing ? (
                                            <input
                                            type="text"
                                            name="tenDiaDiem"
                                            value={locationInfo.tenDiaDiem}
                                            onChange={handleInputChange}
                                            className="border p-2 rounded"
                                            />
                                        ) : (
                                        <p class="font-semibold">Du lịch Hồ Cốc - Vũng Tàu</p>
                                        )}
                                    </div>
                                    <div>
                                        <p class="text-gray-600">Tên nhà kinh doanh</p>
                                        {isEditing ? (
                                            <input
                                            type="text"
                                            name="tenDiaDiem"
                                            value={locationInfo.tenDiaDiem}
                                            onChange={handleInputChange}
                                            className="border p-2 rounded"
                                            />
                                        ) : (
                                        <p class="font-semibold">Du lịch Hồ Cốc - Vũng Tàu</p>
                                        )}
                                    </div>
                                    <div>
                                        <p class="text-gray-600">Địa chỉ</p>
                                        {isEditing ? (
                                            <input
                                            type="text"
                                            name="tenDiaDiem"
                                            value={locationInfo.tenDiaDiem}
                                            onChange={handleInputChange}
                                            className="border p-2 rounded"
                                            />
                                        ) : (
                                        <p class="font-semibold">FFXQ+X94, Bung Riềng, Xuyên Mộc, Bà Rịa - Vũng Tàu, Vietnam</p>
                                        )}
                                    </div>
                                    <div>
                                        <p class="text-gray-600">Loại</p>
                                        {isEditing ? (
                                            <input
                                            type="text"
                                            name="tenDiaDiem"
                                            value={locationInfo.tenDiaDiem}
                                            onChange={handleInputChange}
                                            className="border p-2 rounded"
                                            />
                                        ) : (
                                        <p class="font-semibold">camping</p>
                                        )}
                                    </div>
                                    <div>
                                        <p class="text-gray-600">Ngày đăng ký kinh doanh</p>
                                        {isEditing ? (
                                            <input
                                            type="text"
                                            name="tenDiaDiem"
                                            value={locationInfo.tenDiaDiem}
                                            onChange={handleInputChange}
                                            className="border p-2 rounded"
                                            />
                                        ) : (
                                        <p class="font-semibold"> 12/10/2023 </p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    {/* <MapBoxComponent latitude={10.8231} longitude={106.6297}></MapBoxComponent> */}
                                    <MapComponent address="FFXQ+X94, Bung Riềng, Xuyên Mộc, Bà Rịa - Vũng Tàu, Vietnam" />
                                    {/* <img alt="Satellite view of Du lịch Hồ Cốc - Vũng Tàu" class="w-full max-w-xs mx-auto h-of-map" src="https://storage.googleapis.com/a1aa/image/oPZffFlAjIu7skZYoX8hS47d3ioVwXoWu6YnGKv7e0Wl2jKnA.jpg"/> */}
                                </div>
                                <button
                                    className="absolute bottom-2 right-3 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
                                    onClick={isEditing ? handleSaveClick : handleEditClick}
                                >
                                    <FaEdit className="mr-2" />
                                    {isEditing ? 'Lưu' : 'Chỉnh sửa'}
                                </button>
                            </div>  
                        )}

                        {currentTab === 'specificinfo' && (
                            <div class="border border-gray-200 rounded-b-lg p-4">
                               
                                {/* <div class="flex space-x-4 overflow-x-auto pb-4">
                                        <div class="relative">
                                            <img alt="Image of a castle" class="w-24 h-24 object-cover rounded-lg" height="100" src="https://storage.googleapis.com/a1aa/image/ouHZc2gP3LKELBzF9b9WhRW9eF7SEgifV3ddt1F1gtse8nKnA.jpg" width="100"/>
                                            <button class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                                                <FaX className="text-xs"/>
                                            </button>
                                        </div>
                                        <div class="relative">
                                            <img alt="Image of a ferris wheel" class="w-24 h-24 object-cover rounded-lg" height="100" src="https://storage.googleapis.com/a1aa/image/sCsVlOJSeD3UTaLoIIrOT6PxhfRdIWZr15lz5azFe8KJ9nKnA.jpg" width="100"/>
                                            <button class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                                                <FaX className="text-xs"/>
                                            </button>
                                        </div>
                                        <div class="relative">
                                            <img alt="Image of a ticket" class="w-24 h-24 object-cover rounded-lg" height="100" src="https://storage.googleapis.com/a1aa/image/2DNYdCQdMDJbBZyhIyouoG7XtT5NuAbJKXjf12XkQuoPfTlTA.jpg" width="100"/>
                                            <button class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                                                <FaX className="text-xs"/>
                                            </button>
                                        </div>
                                        <div class="relative">
                                            <img alt="Image of a castle with flowers" class="w-24 h-24 object-cover rounded-lg" height="100" src="https://storage.googleapis.com/a1aa/image/tSYsfyPeJjhDVki0Vsk8DDATWf9vRxue66bCDKYAEBhL6PVOB.jpg" width="100"/>
                                            <button class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                                                <FaX className="text-xs"/>
                                            </button>
                                        </div>
                                        <div class="relative">
                                            <img alt="Image of a street" class="w-24 h-24 object-cover rounded-lg" height="100" src="https://storage.googleapis.com/a1aa/image/gwx1kHK9DQYSPN7stTexFkCK510ikafYbvOKxeRQn12K9nKnA.jpg" width="100"/>
                                            <button class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                                                <FaX className="text-xs"/>
                                            </button>
                                        </div>
                                        <div class="relative">
                                            <img alt="Image of a statue" class="w-24 h-24 object-cover rounded-lg" height="100" src="https://storage.googleapis.com/a1aa/image/j9gNxOarjEr4DZ4gDrQF2iVtefocfFCRhseXPCdbmIoF6PVOB.jpg" width="100"/>
                                            <button class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                                                <FaX className="text-xs"/>
                                            </button>
                                        </div>
                                        <div class="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-lg">
                                            <FaPlus class="text-gray-500 text-2xl"/>
                                        </div>
                                </div> */}
                                <div className="flex space-x-4 scroll-container-x overflow-x-auto pb-4 whitespace-nowrap">
                                    {images.map((image, index) => (
                                    <div key={index} className="relative w-24 h-24 inline-block">
                                        <img alt="Location" className="w-full h-full object-cover rounded-lg" src={image} />
                                        {editMode && (
                                        <button
                                            onClick={() => handleDeleteImage(index)}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                        >
                                            <FaX className="text-xs" />
                                        </button>
                                        )}
                                    </div>
                                    ))}
                                    {editMode && (
                                    <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-lg inline-block">
                                        <input type="file" accept="image/*" className="hidden" id="image-upload" onChange={handleAddImage} />
                                        <label htmlFor="image-upload">
                                        <FaPlus className="text-gray-500 text-2xl cursor-pointer" />
                                        </label>
                                    </div>
                                    )}
                                </div>
                                {/* <div class="mt-6">
                                        <div class="mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2">Tên địa điểm </label>
                                            <p class="text-gray-900">Du lịch Hồ Cốc - Vũng Tàu</p>
                                        </div>
                                        <div class="mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2">Địa chỉ</label>
                                            <p class="text-gray-900">FFXQ+X94, Bưng Riềng, Xuyên Mộc, Bà Rịa - Vũng Tàu, Vietnam </p>
                                        </div>
                                        <div class="mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2">Mô tả</label>
                                            <p class="text-gray-900">Khu cắm trại Hồ Cốc là khu cắm trại gần biển, dịch vụ giá rẻ phù hợp với mọi người muốn trải nghiệm các hoạt động ngoài trời cùng gia đình, người thân.</p>
                                        </div>
                                </div> */}
                                <div className="mt-6">
                                    <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Tên địa điểm</label>
                                    {editMode ? (
                                        <input
                                        type="text"
                                        name="name"
                                        value={locationInfo.name}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                        />
                                    ) : (
                                        <p className="text-gray-900">Du lịch Hồ Cốc - Vũng Tàu</p>
                                    )}
                                    </div>

                                    <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Địa chỉ</label>
                                    {editMode ? (
                                        <input
                                        type="text"
                                        name="address"
                                        value={locationInfo.address}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                        />
                                    ) : (
                                        <p className="text-gray-900">FFXQ+X94, Bưng Riềng, Xuyên Mộc, Bà Rịa - Vũng Tàu, Vietnam</p>
                                    )}
                                    </div>

                                    <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Mô tả</label>
                                    {editMode ? (
                                        <textarea
                                        name="description"
                                        value={locationInfo.description}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                        />
                                    ) : (
                                        <p className="text-gray-900">Khu cắm trại Hồ Cốc là khu cắm trại gần biển, dịch vụ giá rẻ phù hợp với mọi người muốn trải nghiệm các hoạt động ngoài trời cùng gia đình, người thân.</p>
                                    )}
                                    </div>
                                </div>
                                
                                <div className="flex justify-end">
                                <button
                                onClick={() => setEditMode(!editMode)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
                                >
                                <FaEdit className="mr-2" />
                                {editMode ? 'Lưu' : 'Chỉnh sửa'}
                                </button>
                            </div>
                                
                            </div>
                        )}

                        {currentTab === 'ratingservice' && (
                            <div>
                                {currentTab2 === 'viewratingservice' && (
                                <div class="border border-gray-200 rounded-b-lg p-4">
                                        <h2 class="text-xl font-bold mb-4">Phòng</h2>
                                        <div class="scroll-container-x">
                                            <div class="flex gap-4 mb-8 min-w-[800px]">
                                                <div class="bg-white w-420 rounded-lg shadow-md p-2 flex flex-col space-y-4 bg-room" >
                                                    <div class="border-l-4 border-blue-500 pl-4 w-full">
                                                        <p class="text-lg font-semibold text-gray-800">Phòng 2 người</p>
                                                        <p class="text-gray-600">Số lượng: 12</p>
                                                    </div>
                                                    <div class="flex justify-between items-center w-full">
                                                        <button onClick={handleViewDetails} class="bg-blue-500 text-white px-4 py-2 rounded-md">Xem chi tiết</button>
                                                        <div class="flex flex-col items-center">
                                                            <p class="text-gray-600">Giá</p>
                                                            <p class="text-red-600 font-bold text-lg">500.000 VND</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="bg-white w-420 rounded-lg shadow-md p-2 flex flex-col space-y-4 bg-room" >
                                                    <div class="border-l-4 border-blue-500 pl-4 w-full">
                                                        <p class="text-lg font-semibold text-gray-800">Phòng 2 người</p>
                                                        <p class="text-gray-600">Số lượng: 12</p>
                                                    </div>
                                                    <div class="flex justify-between items-center w-full">
                                                        <button onClick={handleViewDetails} class="bg-blue-500 text-white px-4 py-2 rounded-md">Xem chi tiết</button>
                                                        <div class="flex flex-col items-center">
                                                            <p class="text-gray-600">Giá</p>
                                                            <p class="text-red-600 font-bold text-lg">500.000 VND</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="bg-white w-420 rounded-lg shadow-md p-2 flex flex-col space-y-4 bg-room" >
                                                    <div class="border-l-4 border-blue-500 pl-4 w-full">
                                                        <p class="text-lg font-semibold text-gray-800">Phòng 2 người</p>
                                                        <p class="text-gray-600">Số lượng: 12</p>
                                                    </div>
                                                    <div class="flex justify-between items-center w-full">
                                                        <button onClick={handleViewDetails} class="bg-blue-500 text-white px-4 py-2 rounded-md">Xem chi tiết</button>
                                                        <div class="flex flex-col items-center">
                                                            <p class="text-gray-600">Giá</p>
                                                            <p class="text-red-600 font-bold text-lg">500.000 VND</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="bg-gray-200 w-420 p-4 rounded-lg shadow-md flex items-center justify-center">
                                                    <button class="text-2xl text-gray-600">+</button>
                                                    <p class="ml-2">Thêm phòng mới</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="scroll-container mh-200">
                                            <div>
                                                <h2 class="text-xl font-bold mb-4">Đánh giá từ khách hàng</h2>
                                                <div class="flex items-center mb-4">
                                                    <img alt="Profile picture of Hoang Huy" class="w-12 h-12 rounded-full mr-4" height="50" src="https://storage.googleapis.com/a1aa/image/O5bug1WBccZwJ527TONg0tRsK6lOKxgmwdTsBcoffjoNNVlTA.jpg" width="50"/>
                                                    <div>
                                                        <p class="font-semibold">To Hoang Huy</p>
                                                        <div class="flex items-center">  
                                                            <FaStar class="text-yellow-500"/> 
                                                            <FaStar class="text-yellow-500"/> 
                                                            <FaStar class="text-yellow-500"/> 
                                                            <FaStar class="text-yellow-500"/>                                                 
                                                            <FaStarHalfAlt class="text-yellow-500"/>       
                                                            <span class="ml-2 text-gray-600">4.6</span>  
                                                        </div>
                                                    </div>
                                                </div>
                                                <p class="text-gray-700">“The location was perfect. The staff was friendly. Our bed was comfy. The pool was fresh with a great view. The breakfast was delicious! We had a hot tub on our balcony which was awesome.”</p>
                                            </div>
                                            <div>
                                                <h2 class="text-xl font-bold mb-4">Đánh giá từ khách hàng</h2>
                                                <div class="flex items-center mb-4">
                                                    <img alt="Profile picture of Hoang Huy" class="w-12 h-12 rounded-full mr-4" height="50" src="https://storage.googleapis.com/a1aa/image/O5bug1WBccZwJ527TONg0tRsK6lOKxgmwdTsBcoffjoNNVlTA.jpg" width="50"/>
                                                    <div>
                                                        <p class="font-semibold">To Hoang Huy</p>
                                                        <div class="flex items-center">
                                                            <FaStar class="text-yellow-500"/> 
                                                            <FaStar class="text-yellow-500"/> 
                                                            <FaStar class="text-yellow-500"/> 
                                                            <FaStar class="text-yellow-500"/>                                                 
                                                            <FaStarHalfAlt class="text-yellow-500"/>       
                                                            <span class="ml-2 text-gray-600">4.6</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p class="text-gray-700">“The location was perfect. The staff was friendly. Our bed was comfy. The pool was fresh with a great view. The breakfast was delicious! We had a hot tub on our balcony which was awesome.”</p>
                                            </div>
                                            
                                        </div>
                                        
                                </div>
                                )}

                                {currentTab2 === 'roomDetails' && (
                                    <div class="border border-gray-200 rounded-b-lg p-4">
                                        <div class="text-gray-500 text-sm mb-4">
                                            <a class="text-xl font-bold mb-4 text-black">Phòng</a>&gt;<span>Chi tiết phòng</span>
                                             {/* <a href="#" class="hover:underline">Phòng</a> */}
                                        </div>
                                        <h1 class="text-2xl font-bold mb-4">Phòng 2 người</h1>
                                        <div class="flex items-center mb-4">
                                            <FaBed class="mr-2 w-6"/>
                                            <span>1 giường đôi</span>
                                        </div>
                                        <div class="mb-4">
                                            <span>diện tích: 16m2</span>
                                        </div>
                                        <div class="mb-4">
                                            <h2 class="font-bold mb-2">Dịch vụ:</h2>
                                            <div class="flex flex-wrap gap-2">
                                                <div class="flex items-center bg-gray-200 rounded-full px-3 py-1">
                                                    <FaTimesCircle class=" mr-2 w-4 p-0"/>
                                                    
                                                    <span>hủy miễn phí trong 24h</span>
                                                </div>
                                                <div class="flex items-center bg-gray-200 rounded-full px-3 py-1">
                                                    <FaHotTub class="mr-2 w-4"/>
                                                    
                                                    <span>Bồn tắm</span>
                                                </div>
                                                <div class="flex items-center bg-gray-200 rounded-full px-3 py-1">
                                                    <FaWifi class="mr-2 w-4"/>
                                                    <span>wifi miễn phí</span>
                                                </div>
                                                <div class="flex items-center bg-gray-200 rounded-full px-3 py-1">
                                                    
                                                    <FaVolumeOff class="mr-2 w-4"/>
                                                    <span>Hệ thống chống tiếng ồn</span>
                                                </div>
                                                <div class="flex items-center bg-gray-200 rounded-full px-3 py-1">
                                                    
                                                    <FaSnowflake class="mr-2 w-4"/>
                                                    <span>Máy lạnh</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-4">
                                            <span class="font-bold">Trạng thái:</span>
                                            <span class="text-blue-500 status-room">còn 5 phòng</span>
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <div class="text-green-500 text-2xl font-bold">$50</div>
                                            <div class="flex">
                                            <button class="bg-grey-500 text-black px-6 py-2 rounded-full shadow-md hover:bg-grey-600 mr-2">Thoát</button>
                                            <button class="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600">Chỉnh sửa</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            
                        )}
                    </div>   
  
                </div>

            </div>
        </div>
    );
};

export default DetailLocationBusinessScreen;