import React from "react";
import "../styles/ListBusinessScreen.css";
import { FaAngleRight, FaBell, FaEye, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import Pagination from "../components/Pagination";
import { businesses } from "./BusinessData";
import { useState, useEffect } from "react";

const ITEMS_PER_PAGE = 10;

const ListBusinessScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const userId = localStorage.getItem("userId");
  const [locationOwner, setLocationOwner] = useState([]);

  // Tính tổng số trang
  // const totalItems = businesses.length;

  // Lấy dữ liệu của trang hiện tại

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/business/detail/${id}`);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = businesses.filter((business) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      business.name.toLowerCase().includes(searchTermLower) ||
      business.code.toLowerCase().includes(searchTermLower) ||
      business.contact.toLowerCase().includes(searchTermLower) ||
      business.phone.toLowerCase().includes(searchTermLower)
    );
  });

  const currentData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalItems = filteredData.length;

  useEffect(() => {
    const fetchLocationOwner = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/user/getbyuserrole`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch locations");
        }
        const data = await response.json();
        console.log(data.data);
        setLocationOwner(data.data || []);
      } catch (error) {
        console.error("Error fetching locations Owner:", error);
      }
    };

    fetchLocationOwner();
  }, []);

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
                placeholder="Tìm kiếm nhà kinh doanh"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <table className="business-table">
              <thead>
                <tr>
                  <th>Stt</th>
                  <th>Tên</th>
                  <th>Mã</th>
                  <th>Email</th>
                  <th>Điện Thoại</th>
                  {/* <th>Loại</th> */}
                  <th></th>
                </tr>
              </thead>
              <tbody className="row-container">
                {locationOwner.map((business, index) => (
                  <tr key={business._id} className="clickable-row">
                    <td>{index + 1}</td>
                    <td>
                      <div className="namefield">
                        <img
                          src={business?.userAvatar?.url}
                          alt="User Avatar"
                          className="user-avatar"
                        />
                        <p>{business?.userName}</p>
                      </div>
                    </td>
                    <td>{business?._id}</td>
                    <td>{business?.userEmail}</td>
                    <td>{business?.userPhoneNumber}</td>
                    {/* <td>{business.type}</td> */}
                    <td>
                      <button
                        type="button"
                        className="icon-container iconview"
                        onClick={() => handleRowClick(business._id)}
                      >
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
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ListBusinessScreen;