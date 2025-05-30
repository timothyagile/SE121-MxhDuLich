import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleRight, FaBell, FaEye } from "react-icons/fa";
import "../styles/DetailBusinessScreen.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneAlt,
  faEnvelope,
  faUser,
  faMapMarkerAlt,
  faMemo,
  faLocation,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { businesses } from "./BusinessData";

const DetailBusinessScreen = () => {
  const { id } = useParams(); // Lấy id từ URL
  const business = businesses.find((b) => b.id === parseInt(id));
  const [owner, setOwner] = useState([]);
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("profile");

  const handleProfileClick = () => {
    setCurrentTab("profile");
  };

  const handleLocationClick = () => {
    setCurrentTab("businessLocation");
  };

  useEffect(() => {
    const fetchDetailOwner = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/user/getbyid/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch locations");
        }
        const data = await response.json();
        console.log(data.data);
        setOwner(data.data || []);
      } catch (error) {
        console.error("Error fetching locations Owner:", error);
      }
    };

    fetchDetailOwner();
  }, [id]);

  useEffect(() => {
    const fetchLocations = async () => {
      // Hiển thị trạng thái loading
      try {
        const response = await fetch(
          `http://localhost:3000/locationbyuserid/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch locations");
        }
        const data = await response.json();
        setLocations(data.data);
        console.log(data.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, [id]);

  function getCategoryName(id) {
    switch (id) {
      case "hotel":
        return "Khách sạn";
      case "homestay":
        return "Homestay";
      case "guest home":
        return "Nhà nghỉ";
      default:
        return "Không xác định"; // Giá trị mặc định nếu id không khớp
    }
  }

  const handleRowClick = (id) => {
    navigate(`/location/detail/${id}`);
  };

  return (
    <div class="container">
      <div class="containerformobile">
        <div class="containerlistbusiness widthlistbusiness">
          <div class="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center">
              <img
                alt="Profile picture of a person"
                class="w-20 h-20 rounded-full mr-4"
                height="80"
                src="https://storage.googleapis.com/a1aa/image/0FPVWfLJ1m0nJS9YfULFrbvezZsDHus5bXhqxVDA6tO9UMKnA.jpg"
                width="80"
              />
              <div>
                <h1 class="text-xl font-bold">{owner?.userName}</h1>
                <div class="flex items-center text-gray-600 mt-2">
                  <i class="fas fa-phone-alt mr-2"></i>
                  <span>
                    <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />

                    {owner?.userPhoneNumber}
                  </span>
                </div>
                <div class="flex items-center text-gray-600 mt-1">
                  <i class="fas fa-envelope mr-2"></i>
                  <span>
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                    {owner.userEmail}
                  </span>
                </div>
              </div>
            </div>
            <div class="mt-6">
              <div class="flex">
                <button
                  onClick={handleProfileClick}
                  className={`flex items-center px-4 py-2 ${
                    currentTab === "profile"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  } rounded-t-lg`}
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  <span>Hồ sơ</span>
                </button>
                <button
                  onClick={handleLocationClick}
                  class={`flex items-center px-4 py-2 ${
                    currentTab === "businessLocation"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  } rounded-t-lg ml-2`}
                >
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                  <span>Địa điểm kinh doanh</span>
                </button>
              </div>
              {currentTab === "profile" && (
                <div class="border border-gray-200 rounded-b-lg p-4">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <div class="text-gray-600">Mã nhà kinh doanh</div>
                      <div class="font-semibold">{owner?._id}</div>
                    </div>
                    <div>
                      <div class="text-gray-600">Họ và tên</div>
                      <div class="font-semibold">{owner?.userName}</div>
                    </div>
                    <div>
                      <div class="text-gray-600">Số điện thoại</div>
                      <div class="font-semibold">{owner?.userPhoneNumber}</div>
                    </div>
                    <div>
                      <div class="text-gray-600">Địa chỉ email</div>
                      <div class="font-semibold">{owner?.userEmail}</div>
                    </div>
                    <div>
                      <div class="text-gray-600">Ngày sinh</div>
                      <div class="font-semibold">{owner?.userDateOfBirth}</div>
                    </div>
                    <div>
                      <div class="text-gray-600">Ngày đăng ký kinh doanh</div>
                      <div class="font-semibold">12/10/2023</div>
                    </div>
                    <div>
                      <div class="text-gray-600">Giới tính</div>
                      <div class="font-semibold">Nữ</div>
                    </div>
                    <div>
                      <div class="text-gray-600">Số CMND/CCCD</div>
                      <div class="font-semibold">079303041653</div>
                    </div>
                    <div class="col-span-2">
                      <div class="text-gray-600">Địa chỉ</div>
                      <div class="font-semibold">{owner?.userAddress}</div>
                    </div>
                  </div>
                </div>
              )}
              {currentTab === "businessLocation" && (
                <div class="flex">
                  <div class="w-full scroll-container mh-550">
                    <table class="min-w-full bg-white">
                      <thead>
                        <tr>
                          <th class="py-2 px-4 border-b">STT</th>
                          <th class="py-2 px-4 border-b">Tên Địa điểm</th>
                          <th class="py-2 px-4 border-b">Loại</th>
                          <th class="py-2 px-4 border-b">Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        {locations.map((location, index) => (
                          <tr
                            key={location._id}
                            onClick={() => handleRowClick(location._id)} // Thêm sự kiện click
                            className="cursor-pointer hover:bg-gray-100"
                          >
                            <td class="py-2 px-4 border-b ">{index + 1}</td>
                            <td class="py-2 px-4 border-b flex items-center">
                              <img
                                alt="Image of a camping site"
                                class="w-10 h-10 rounded-full mr-2"
                                height="40"
                                src="https://storage.googleapis.com/a1aa/image/DMI3DZ3pR8qVKJ19uApteCrfCf8Na2RYQTEPRH47JxKKniKnA.jpg"
                                width="40"
                              />
                              {location?.name}
                            </td>
                            <td class="py-2 px-4 border-b ">
                              {getCategoryName(location?.category?.id)}
                            </td>
                            <td class="py-2 px-4 border-b ">
                              {/* <span class="bg-yellow-100 text-yellow-600 py-1 px-3 rounded-full text-xs">
                                                            {location.tatus}
                                                        </span> */}
                              <span>
                                {" "}
                                {location.status === "inactive" ? (
                                  <span className="status-label status-waiting">
                                    Chờ phê duyệt
                                  </span>
                                ) : location.status === "active" ? (
                                  <span className="status-label status-completed">
                                    Đã phê duyệt
                                  </span>
                                ) : location.status === "rejected" ? (
                                  <span className="status-label status-cancelled">
                                    Bị từ chối
                                  </span>
                                ) : (
                                  <span>Chưa xác định</span>
                                )}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {/* <tr>
                                                    <td class="py-2 px-4 border-b text-center">2
                                                    </td>
                                                    <td class="py-2 px-4 border-b flex items-center">
                                                        <img alt="Image of a camping site" class="w-10 h-10 rounded-full mr-2" height="40" src="https://storage.googleapis.com/a1aa/image/DMI3DZ3pR8qVKJ19uApteCrfCf8Na2RYQTEPRH47JxKKniKnA.jpg" width="40"/>
                                                        Cắm trại du lịch Hồ Cốc - Vũng Tàu Bãi 2
                                                    </td>
                                                    <td class="py-2 px-4 border-b text-center">Camping</td>
                                                    <td class="py-2 px-4 border-b text-center">
                                                        <span class="bg-green-100 text-green-600 py-1 px-3 rounded-full text-xs">
                                                        Đang hoạt động
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="py-2 px-4 border-b text-center">3</td>
                                                    <td class="py-2 px-4 border-b flex items-center">
                                                        <img alt="Image of a camping site" class="w-10 h-10 rounded-full mr-2" height="40" src="https://storage.googleapis.com/a1aa/image/DMI3DZ3pR8qVKJ19uApteCrfCf8Na2RYQTEPRH47JxKKniKnA.jpg" width="40"/>
                                                        Cắm trại du lịch Hồ Cốc - Vũng Tàu Bãi 2
                                                    </td>
                                                    <td class="py-2 px-4 border-b text-center">Camping</td>
                                                    <td class="py-2 px-4 border-b text-center">
                                                        <span class="bg-yellow-100 text-yellow-600 py-1 px-3 rounded-full text-xs">
                                                            Tạm dừng
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="py-2 px-4 border-b text-center">4</td>
                                                    <td class="py-2 px-4 border-b flex items-center">
                                                        <img alt="Image of a camping site" class="w-10 h-10 rounded-full mr-2" height="40" src="https://storage.googleapis.com/a1aa/image/DMI3DZ3pR8qVKJ19uApteCrfCf8Na2RYQTEPRH47JxKKniKnA.jpg" width="40"/>
                                                        Cắm trại du lịch Hồ Cốc - Vũng Tàu Bãi 2
                                                    </td>
                                                    <td class="py-2 px-4 border-b text-center">Camping</td>
                                                    <td class="py-2 px-4 border-b text-center">
                                                        <span class="bg-yellow-100 text-yellow-600 py-1 px-3 rounded-full text-xs">
                                                        Tạm dừng
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="py-2 px-4 border-b text-center">5</td>
                                                    <td class="py-2 px-4 border-b flex items-center">
                                                        <img alt="Image of a camping site" class="w-10 h-10 rounded-full mr-2" height="40" src="https://storage.googleapis.com/a1aa/image/DMI3DZ3pR8qVKJ19uApteCrfCf8Na2RYQTEPRH47JxKKniKnA.jpg" width="40"/>
                                                        Cắm trại du lịch Hồ Cốc - Vũng Tàu Bãi 2
                                                    </td>
                                                    <td class="py-2 px-4 border-b text-center">Camping</td>
                                                    <td class="py-2 px-4 border-b text-center">
                                                        <span class="bg-green-100 text-green-600 py-1 px-3 rounded-full text-xs">
                                                            Đang hoạt động
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="py-2 px-4 border-b text-center">6</td>
                                                    <td class="py-2 px-4 border-b flex items-center">
                                                        <img alt="Image of a camping site" class="w-10 h-10 rounded-full mr-2" height="40" src="https://storage.googleapis.com/a1aa/image/DMI3DZ3pR8qVKJ19uApteCrfCf8Na2RYQTEPRH47JxKKniKnA.jpg" width="40"/>
                                                        Cắm trại du lịch Hồ Cốc - Vũng Tàu Bãi 2
                                                    </td>
                                                    <td class="py-2 px-4 border-b text-center">Camping</td>
                                                    <td class="py-2 px-4 border-b text-center">
                                                        <span class="bg-yellow-100 text-yellow-600 py-1 px-3 rounded-full text-xs">
                                                            Tạm dừng
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="py-2 px-4 border-b text-center">1</td>
                                                    <td class="py-2 px-4 border-b flex items-center">
                                                        <img alt="Image of a camping site" class="w-10 h-10 rounded-full mr-2" height="40" src="https://storage.googleapis.com/a1aa/image/DMI3DZ3pR8qVKJ19uApteCrfCf8Na2RYQTEPRH47JxKKniKnA.jpg" width="40"/>
                                                        Cắm trại du lịch Hồ Cốc - Vũng Tàu
                                                    </td>
                                                    <td class="py-2 px-4 border-b text-center">Camping</td>
                                                    <td class="py-2 px-4 border-b text-center">
                                                        <span class="bg-yellow-100 text-yellow-600 py-1 px-3 rounded-full text-xs">
                                                            Tạm dừng
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="py-2 px-4 border-b text-center">1</td>
                                                    <td class="py-2 px-4 border-b flex items-center">
                                                        <img alt="Image of a camping site" class="w-10 h-10 rounded-full mr-2" height="40" src="https://storage.googleapis.com/a1aa/image/DMI3DZ3pR8qVKJ19uApteCrfCf8Na2RYQTEPRH47JxKKniKnA.jpg" width="40"/>
                                                        Cắm trại du lịch Hồ Cốc - Vũng Tàu
                                                    </td>
                                                    <td class="py-2 px-4 border-b text-center">Camping</td>
                                                    <td class="py-2 px-4 border-b text-center">
                                                        <span class="bg-yellow-100 text-yellow-600 py-1 px-3 rounded-full text-xs">
                                                            Tạm dừng
                                                        </span>
                                                    </td>
                                                </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBusinessScreen;