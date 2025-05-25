import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaAngleRight, FaBell, FaEye, FaSearchLocation, FaEdit, FaStar, FaStarHalfAlt, FaBed, FaTimesCircle, FaHotTub, FaWifi, FaVolumeOff, FaSnowflake } from 'react-icons/fa';
import { FaRankingStar, FaX, FaPlus } from "react-icons/fa6";
import { MdEventNote } from "react-icons/md";
import '../styles/DetailLocationScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope, faUser, faMapMarkerAlt, faMemo } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";


const AddLocationScreen = () => {


    const token = localStorage.getItem("authToken");
    console.log("JWT Token:", token);
    const userId = localStorage.getItem('userId');
    const [images, setImages] = useState([]);
    const [locationName, setLocationName] = useState("");
    const [address, setAddress] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [businessProof, setBusinessProof] = useState("");

    const handleDeleteImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
    
        // Append text fields
        formData.append("name", locationName);
        formData.append("ownerId", userId);
        formData.append("address", address);
        formData.append("category", JSON.stringify(type));
        formData.append("description", description);
    
        // Append image files
        images.forEach((image) => {
            formData.append("file", image.file); // use "file" if that's the field name you need
        });

        console.log(formData);
    
        try {
            const response = await fetch(`http://localhost:3000/createlocation`, {
                method: "POST",
                body: formData,
                credentials: "include", // Cho phép gửi cookie (tương tự với "withCredentials: true" trong axios)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const responseData = await response.json();
            console.log("Response:", responseData);
            alert("Địa điểm đã được tạo thành công!");
            navigate("/locations");
        } catch (error) {
            console.error("Error creating location:", error);
            alert("Có lỗi xảy ra khi tạo địa điểm!");
        }
    };
    

    const handleAddImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const tempUrl = URL.createObjectURL(file); // Tạo URL tạm thời
            const newImage = { url: tempUrl, file }; // Lưu cả file và URL
            setImages([...images, newImage]); // Thêm vào danh sách ảnh
        }
    };

    const navigate = useNavigate();


    return (
        <div class="container">
            <div class="containerformobile">
                <div class="containerlistbusiness widthlistbusiness none-h">
                    <div class="bg-white shadow-md rounded-lg max-w-4xl mx-auto mt-10 p-8">
                        <div className="flex space-x-4 scroll-container-x overflow-x-auto pb-4 whitespace-nowrap">
                            {images.map((image, index) => (
                                <div key={index} className="relative w-24 h-24 inline-block">
                                    <img alt="Location" className="w-full h-full object-cover rounded-lg" src={image?.url} />
                                    <button
                                        onClick={() => handleDeleteImage(index)}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                    >
                                        <FaX className="text-xs" />
                                    </button>

                                </div>
                            ))}
                            <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-lg inline-block">
                                <input type="file" accept="image/*" className="hidden" id="image-upload" onChange={handleAddImage} />
                                <label htmlFor="image-upload">
                                    <FaPlus className="text-gray-500 text-2xl cursor-pointer" />
                                </label>
                            </div>
                        </div>

                        <div class="space-y-4">
                            <div class="flex items-center space-x-4">
                                <input 
                                    class="flex-1 p-3 border border-gray-300 rounded-lg" 
                                    placeholder="Tên địa điểm" 
                                    type="text" 
                                    value={locationName}
                                    onChange={(e) => setLocationName(e.target.value)}/>
                            </div>
                            <div class="flex">
                                <input 
                                    class=" w-none flex-1 items-center space-x-4 p-3 border border-gray-300 rounded-lg" 
                                    placeholder="Địa chỉ" 
                                    type="text" 
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}/>
                            </div>
                            <div class="flex">
                                <select 
                                    class="flex-1 p-3 border border-gray-300 rounded-lg"
                                    value={type.id || ""}
                                    onChange={(e) => {
                                        const selectedOption = e.target.value;
                                        const cateName = e.target.options[e.target.selectedIndex].text;
                                        setType({ id: selectedOption, cateName }); // Cập nhật type thành đối tượng
                                    }}>
                                    <option value="">Loại</option>
                                    <option value="hotel">Khách sạn</option>
                                    <option value="homestay">Homestay</option>
                                    <option value="guest home">Nhà nghỉ</option>
                                </select>
                            </div>
                            <div class="flex">
                                <textarea 
                                    class="w-full p-3 border border-gray-300 rounded-lg h-32" 
                                    placeholder="Mô tả"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}>
                                </textarea>
                            </div>
                            <div class="flex">
                                <input class="w-full p-3 border border-gray-300 rounded-lg" placeholder="Minh chứng đăng ký kinh doanh" type="text" />
                            </div>
                        </div>
                        <div class="flex justify-end space-x-4 mt-6">
                            <button class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg">
                                Hủy
                            </button>
                            <button 
                                class="px-6 py-2 bg-blue-500 text-white rounded-lg"
                                onClick={handleSubmit}>
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