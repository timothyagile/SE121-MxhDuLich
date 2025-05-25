import React from "react";
import "../styles/ListLocationScreen.css";
import { FaAngleRight, FaBell, FaEye, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { locations } from "./BusinessData";
import Pagination from "../components/Pagination";
import { useDebounce } from "use-debounce";

const ListLocationScreen = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000); // 2-second debounce
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let response;
        if (debouncedSearchTerm.trim() === "") {
          response = await fetch(`http://localhost:3000/locationbyname?name`);
          console.log(response.json);
        } else {
          const formattedSearchTerm = debouncedSearchTerm
            .trim()
            .replace(/\s+/g, "-");

          response = await fetch(
            `http://localhost:3000/locationbyname?name=${formattedSearchTerm}`
          );
        }

        const result = await response.json();
        if (result.isSuccess) {
          setLocations(result.data);
        } else {
          setError("Không tìm thấy !");
        }
      } catch (err) {
        setError("An error occurred while fetching locations.");
      } finally {
        setIsLoading(false);
      }
    };

    // Always fetch data regardless of the search term
    fetchLocations();
  }, [debouncedSearchTerm]);

  // const filteredLocations = locations.filter((location) => {
  //   const searchTermLower = searchTerm.toLowerCase();
  //   return (
  //     location.name.toLowerCase().includes(searchTermLower) ||
  //     location.type.toLowerCase().includes(searchTermLower) ||
  //     location.address.toLowerCase().includes(searchTermLower)
  //   );
  // });

  const itemsPerPage = 10;
  const currentData = locations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1); // Only reset if necessary
    }
  }, [searchTerm]);

  const totalItems = locations.length;

  const handleRowClick = (id) => {
    navigate(`/location/detail/${id}`);
  };

  if (isLoading) {
    return <div>Loading locations...</div>;
  }

  return (
    <div class="container pg-0">
      <div class="containerformobile">
        <div class="containerlistbusiness widthlistbusiness">
          <div class="listbusinessbody scroll-container mh-900">
            <div class="search">
              <FaSearch class="icon-search" />
              <input
                type="text"
                className="input-text"
                placeholder="Tìm kiếm địa điểm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên địa điểm</th>
                  <th>Loại</th>
                  <th>Địa chỉ</th>
                  <th>Trạng thái</th>
                  <th></th>
                </tr>
              </thead>

              {error ? (
                <div>{error}</div>
              ) : (
                <tbody className="row-container">
                  {currentData.map((location, index) => (
                    <tr key={location.id} className="clickable-row">
                      <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                      <td>
                        <div className="namefield">
                          <img
                            src={location.image?.[0]?.url}
                            alt="User Avatar"
                            className="user-avatar"
                          />
                          <p>{location.name}</p>
                        </div>
                      </td>
                      <td>
                        {location.category && location.category.name
                          ? location.category.name
                          : location.category?.cateName}
                      </td>
                      <td>{location.address}</td>
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
                        <button
                          type="button"
                          className="icon-container iconview"
                          onClick={() => handleRowClick(location._id)}
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>

          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ListLocationScreen;