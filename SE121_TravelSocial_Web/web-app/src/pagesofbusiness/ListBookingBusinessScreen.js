import React, { useState, useEffect } from "react";
import "../styles/ListBookingScreen.css";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaEye } from "react-icons/fa";
import Pagination from "../components/Pagination";
import axios from "axios";
import moment from "moment";
import "../styles/ListBookingScreen.css";
import { useDebounce } from "use-debounce";

const ListBookingBusinessScreen = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState([]);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

  const userId = localStorage.getItem("userId");
  console.log("businessid ", userId);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Sử dụng API mới trả về đầy đủ thông tin
        const response = await fetch(
          `http://localhost:3000/booking/getfullbybusinessid/${userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched bookings:", data);
        setBookings(data.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [userId]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (id, booking, userId) => {
    console.log("choosed booking: ", JSON.stringify(booking));
    localStorage.setItem("selectedBooking", JSON.stringify(booking));
    localStorage.setItem("userOfBookingId", userId);
    navigate(`/business/booking/detail/${id}`);
  };

  const filteredData = bookings.filter((booking) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      booking.locationName.toLowerCase().includes(searchTermLower) ||
      booking._id.toLowerCase().includes(searchTermLower) ||
      // booking.roomId.toLowerCase().includes(searchTermLower) ||
      booking.dateBooking.toLowerCase().includes(searchTermLower)
    );
  });

  const currentData = filteredData.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalItems = filteredData.length;

  return (
    <div className="container pg-0">
      <div className="containerformobile">
        <div className="containerlistbusiness widthlistbusiness">
          <div className="listbusinessbody scroll-container mh-900">
            <div className="search">
              <FaSearch className="icon-search" />
              <input
                type="text"
                className="input-text border-search"
                placeholder="Tìm kiếm lượt đặt chỗ"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên địa điểm</th>
                  <th>Tên khách hàng</th>
                  <th>Ngày đặt</th>
                  <th>Trạng thái</th>
                  <th>Tổng tiền</th>
                  <th></th>
                </tr>
              </thead>

              <tbody className="row-container">
                {currentData.map((booking, index) => (
                  <tr
                    key={booking.id}
                    className="clickable-row"
                    onClick={() =>
                      handleRowClick(booking._id, booking, booking.userId)
                    }
                  >
                    <td>{index + 1}</td>
                    <td>
                      <div className="namefield">
                        <img
                          src={
                            booking?.locationImage?.[0]?.url
                              ? booking?.locationImage?.[0]?.url
                              : require("../assets/images/avt.png")
                          }
                          alt="User Avatar"
                          className="user-avatar"
                        />
                        <p>{booking.locationName}</p>
                      </div>
                    </td>
                    <td>{booking.userName}</td>
                    <td>{moment(booking.dateBooking).format("DD-MM-YYYY")}</td>
                    <td>
                      <span
                        className={`status-label${
                          booking.status === "canceled"
                            ? ""
                            : booking.status === "complete"
                            ? "-2"
                            : "-1"
                        }`}
                      >
                        {booking.status === "pending" && "Chờ duyệt"}
                        {booking.status === "confirm" && "Đã xác nhận"}
                        {booking.status === "canceled" && "Đã hủy"}
                        {booking.status === "complete" && "Hoàn thành"}
                        {booking.status !== "pending" &&
                          booking.status !== "confirm" &&
                          booking.status !== "canceled" &&
                          booking.status !== "complete" &&
                          booking.status}
                      </span>
                    </td>
                    <td>{booking.totalPriceAfterTax?.toLocaleString('vi-VN')} đ</td>
                    <td>
                      <button
                        type="button"
                        className="icon-container iconview"
                        onClick={() => handleRowClick(booking.id)}
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
            itemsPerPage={10}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ListBookingBusinessScreen;