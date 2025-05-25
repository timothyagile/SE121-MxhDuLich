import React from "react";
import "../styles/ListLocationScreen.css";
import { useState, useEffect } from "react";
import { FaAngleRight, FaBell, FaEye, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { locations } from '../pages/BusinessData';
import Pagination from "../components/Pagination";

const ListLocationBusinessScreen = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchLocations = async () => {
      // Hiển thị trạng thái loading
      try {
        const response = await fetch(
          `http://localhost:3000/locationbyuserid/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch locations");
        }
        const data = await response.json();
        setLocations(data.data || []);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, [userId]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredLocations = locations.filter((location) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      location.name.toLowerCase().includes(searchTermLower) ||
      location?.category?.name?.toLowerCase().includes(searchTermLower) ||
      location.address.toLowerCase().includes(searchTermLower)
    );
  });

  const itemsPerPage = 10;
  const currentData = filteredLocations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalItems = filteredLocations.length;

  const handleRowClick = (id) => {
    navigate(`/business/location/detail/${id}`);
  };

  const handleAddLocationClick = () => {
    navigate(`/location/add`);
  };

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

  return (
    <div class="container pg-0">
      <div class="containerformobile">
        {/* <div class="containerlistbusiness widthlistbusiness"> */}{" "}
        <div class="containerlistbusiness widthlistbusiness">
          <div class="listbusinessbody scroll-container mh-900">
            <div className="flex justify-between">
              <div class="search">
                <FaSearch class="icon-search" />
                <input
                  type="text"
                  className="input-text border-search"
                  placeholder="Tìm kiếm địa điểm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="search-1">
                <button
                  className="bg-blue-500 text-white text-sm px-3 py-1.5 rounded-lg"
                  title="Click để thêm"
                  onClick={() => handleAddLocationClick()}
                >
                  Thêm địa điểm mới
                </button>
              </div>
            </div>

            <table>
              <thead>
                <tr className="listlocation">
                  <th>STT</th>
                  <th>Tên nhà kinh doanh</th>
                  <th>Loại</th>
                  <th>Địa chỉ</th>
                  <th>Trạng thái</th>
                  <th></th>
                </tr>
              </thead>

              <tbody className="row-container">
                {currentData?.map((location, index) => (
                  <tr
                    key={location.id}
                    className="clickable-row"
                    onClick={() => handleRowClick(location?._id)}
                  >
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>
                      <div className="namefield">
                        <img
                          src={
                            location?.image
                              ? require("../assets/images/avt.png")
                              : require("../assets/images/avt.png")
                          }
                          alt="User Avatar"
                          className="user-avatar"
                        />
                        <p>{location?.name}</p>
                      </div>
                    </td>
                    <td>{getCategoryName(location?.category?.id)}</td>
                    <td>{location?.address}</td>
                    <td>
                      {/* Hiển thị trạng thái */}
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
                    <td>
                      <button type="button" className="icon-container iconview">
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            totalItems={totalItems}
            itemsPerPage={10}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ListLocationBusinessScreen;