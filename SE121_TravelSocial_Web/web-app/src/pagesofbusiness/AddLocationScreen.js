import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaAngleRight, FaBell, FaEye, FaSearchLocation, FaEdit, FaStar, FaStarHalfAlt, FaBed, FaTimesCircle, FaHotTub, FaWifi, FaVolumeOff, FaSnowflake } from 'react-icons/fa';
import { FaRankingStar, FaX, FaPlus } from "react-icons/fa6";
import { MdEventNote } from "react-icons/md";
import '../styles/DetailLocationScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope, faUser, faMapMarkerAlt, faMemo } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Fix leaflet marker icon path
if (typeof window !== 'undefined' && L && L.Icon && L.Icon.Default) {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });
}

function MapLocationPicker({ latitude, setLatitude, longtitude, setLongtitude, setAddress, setProvince }) {
  async function fetchAddress(lat, lng) {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=vi`);
      const data = await res.json();
      if (data && data.address) {
        setAddress(data.display_name || "");
        // Ưu tiên lấy tỉnh/thành phố từ address
        setProvince(
          data.address.state ||
          data.address.city ||
          data.address.town ||
          data.address.county ||
          data.address.region ||
          ""
        );
      }
    } catch (e) {
      // Không làm gì nếu lỗi
    }
  }
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setLatitude(e.latlng.lat);
        setLongtitude(e.latlng.lng);
        fetchAddress(e.latlng.lat, e.latlng.lng);
      },
    });
    return latitude && longtitude ? (
      <Marker position={[parseFloat(latitude), parseFloat(longtitude)]} />
    ) : null;
  }
  return (
    <MapContainer
      center={[
        latitude !== '' && latitude !== undefined ? parseFloat(latitude) : 10.762622,
        longtitude !== '' && longtitude !== undefined ? parseFloat(longtitude) : 106.660172,
      ]}
      zoom={13}
      style={{ height: 300, width: '100%', marginBottom: 16 }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker />
    </MapContainer>
  );
}

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
    const [province, setProvince] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longtitude, setLongtitude] = useState("");
    const [services, setServices] = useState([]);
    const [selectedServiceIds, setSelectedServiceIds] = useState([]);

    // Danh sách dịch vụ tĩnh
    const staticServices = [
      { id: 'wifi', name: 'Wifi miễn phí' },
      { id: 'tub', name: 'Bồn tắm' },
      { id: 'cancelable', name: 'Hủy miễn phí trong 24h' },
      { id: 'volumeoff', name: 'Hệ thống chống tiếng ồn' },
      { id: 'ac', name: 'Máy lạnh' },
      // Thêm các dịch vụ khác nếu cần
    ];
    
    // Lấy danh sách dịch vụ duy nhất dựa trên tên dịch vụ (không lặp)
    const uniqueServices = React.useMemo(() => {
      const seen = new Set();
      return services.filter(s => {
        if (seen.has(s.name)) return false;
        seen.add(s.name);
        return true;
      });
    }, [services]);

    const [selectedServices, setSelectedServices] = useState([]); // [{_id, name, price, description, unit, icon}]

    useEffect(() => {
        // Fetch all available services
        fetch("http://localhost:3000/service")
            .then((res) => res.json())
            .then((data) => {
                if (data.isSuccess) setServices(data.data);
            })
            .catch(() => setServices([]));
    }, []);

    const handleDeleteImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    const handleServiceCheckbox = (serviceId) => {
      setSelectedServices(prev => {
        if (prev.find(s => s._id === serviceId)) {
          return prev.filter(s => s._id !== serviceId);
        } else {
          const service = uniqueServices.find(s => s._id === serviceId);
          return service ? [...prev, { ...service, price: '', description: '' }] : prev;
        }
      });
    };

    const handleServiceChange = (serviceId, field, value) => {
      setSelectedServices(prev => prev.map(s => s._id === serviceId ? { ...s, [field]: value } : s));
    };

    const handleSubmit = async () => {
        const formData = new FormData();
    
        // Append text fields
        formData.append("name", locationName);
        formData.append("ownerId", userId);
        formData.append("address", address);
        formData.append("category", JSON.stringify({ id: type.id, cateName: type.cateName }));        
        formData.append("status", "inactive"); // Thêm status mặc định khi tạo location
        formData.append("description", description);
        formData.append("province", province);
        formData.append("minPrice", minPrice);
        formData.append("latitude", latitude);
        formData.append("longtitude", longtitude);
        // Do NOT append serviceIds here anymore
    
        // Append image files
        images.forEach((image) => {
            formData.append("file", image.file); // use "file" if that's the field name you need
        });
        formData.append('services', JSON.stringify(selectedServices));

        try {
            const response = await fetch(`http://localhost:3000/createlocation`, {
                method: "POST",
                body: formData,
                credentials: "include",
                headers: {
                    // Authorization: `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const responseData = await response.json();
            console.log("Location creation response:", responseData);
            if (!responseData.data || !responseData.data._id) {
                throw new Error("No location ID returned from API");
            }
            const newLocationId = responseData.data._id;

            // Khi submit, tạo service với giá và mô tả người dùng nhập
            for (const selected of selectedServices) {
              const servicePayload = {
                name: selected.name,
                description: selected.description || '',
                price: selected.price || 0,
                unit: selected.unit || '',
                icon: selected.icon || '',
                isAvailable: true,
                locationId: newLocationId,
              };
              try {
                const serviceRes = await fetch('http://localhost:3000/service', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(servicePayload),
                  credentials: 'include',
                });
                if (!serviceRes.ok) {
                  throw new Error(`Failed to create service: ${selected.name}`);
                }
              } catch (serviceErr) {
                console.error(`Error creating service ${selected.name}:`, serviceErr);
              }
            }

            alert("Địa điểm đã được tạo thành công!");
            navigate("/business/location/list");
        } catch (error) {
            console.error("Error creating location or services:", error);
            alert("Có lỗi xảy ra khi tạo địa điểm hoặc dịch vụ!");
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
                                        console.log("Selected type:", { id: selectedOption, cateName });
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
                            <div class="flex">
                                <input 
                                    class="w-full p-3 border border-gray-300 rounded-lg" 
                                    placeholder="Tỉnh/Thành phố" 
                                    type="text" 
                                    value={province}
                                    onChange={(e) => setProvince(e.target.value)}
                                />
                            </div>
                            <div class="flex">
                                <input 
                                    class="w-full p-3 border border-gray-300 rounded-lg" 
                                    placeholder="Giá thấp nhất (VND)" 
                                    type="number" 
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                />
                            </div>
                            <div class="flex mb-4 flex-col">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Chọn vị trí trên bản đồ</label>
                                <MapLocationPicker
                                    latitude={latitude}
                                    setLatitude={setLatitude}
                                    longtitude={longtitude}
                                    setLongtitude={setLongtitude}
                                    setAddress={setAddress}
                                    setProvince={setProvince}
                                />
                                <div className="flex space-x-2 mt-2">
                                    <input
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                        placeholder="Vĩ độ (latitude)"
                                        type="number"
                                        value={latitude}
                                        onChange={(e) => setLatitude(e.target.value)}
                                    />
                                    <input
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                        placeholder="Kinh độ (longtitude)"
                                        type="number"
                                        value={longtitude}
                                        onChange={(e) => setLongtitude(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Dịch vụ kèm theo</label>
                                {uniqueServices.map(service => {
                                  const selected = selectedServices.find(s => s._id === service._id) || {};
                                  return (
                                    <div key={service._id} className="flex items-center gap-2 mb-2">
                                      <input
                                        type="checkbox"
                                        checked={!!selectedServices.find(s => s._id === service._id)}
                                        onChange={e => handleServiceCheckbox(service._id)}
                                      />
                                      <span className="w-40">{service.name}</span>
                                      <input
                                        type="number"
                                        placeholder="Giá (VND)"
                                        className="border p-1 rounded w-28"
                                        value={selected.price || ''}
                                        onChange={e => handleServiceChange(service._id, 'price', e.target.value)}
                                        disabled={!selectedServices.find(s => s._id === service._id)}
                                      />
                                      <input
                                        type="text"
                                        placeholder="Mô tả"
                                        className="border p-1 rounded w-40"
                                        value={selected.description || ''}
                                        onChange={e => handleServiceChange(service._id, 'description', e.target.value)}
                                        disabled={!selectedServices.find(s => s._id === service._id)}
                                      />
                                    </div>
                                  );
                                })}
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