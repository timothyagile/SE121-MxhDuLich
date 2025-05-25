import React from "react";
import "../styles/ListBookingScreen.css";
import { useNavigate } from "react-router-dom";
import { FaAngleRight, FaBell, FaEye, FaSearch } from "react-icons/fa";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
// import { businesses, bookings } from "./BusinessData";
import { formatDate, formatDateTime } from "../utils/dateUtils";
import { formatCurrency } from "../utils/formatCurrency";
import { useDebounce } from "use-debounce";

const ListBookingScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState([]);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000); // 2-second debounce

  const statusMapping = {
    confirm: "Đã duyệt",
    pending: "Đang chờ",
    canceled: "Đã hủy",
    complete: "Hoàn thành",
    cancelled: "Đã hủy",
  };

  // fetch data from api
  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let bookingResponse;
        if (debouncedSearchTerm.trim() === "") {
          bookingResponse = await fetch(
            // `http://localhost:3000/booking/getbyusername?name=`
            `http://localhost:3000/booking/getall`
          );
        } else {
          bookingResponse = await fetch(
            // `http://localhost:3000/booking/getbyusername?name=${searchTerm}`
            `http://localhost:3000/booking/getall`
          );
        }

        const bookingResult = await bookingResponse.json();
        console.log(bookingResult.data);
        if (bookingResult.isSuccess) {
          const bookingsData = bookingResult.data;
          setBookings(bookingsData);

          // Get unique user IDs from bookings
          const userIds = [
            ...new Set(bookingsData.map((booking) => booking.userId)),
          ];

          // Fetch user details for all user IDs
          const userResponses = await Promise.all(
            userIds.map((id) =>
              fetch(`http://localhost:3000/user/getbyid/${id}`)
            )
          );

          const userResults = await Promise.all(
            userResponses.map((res) => res.json())
          );

          // Map user details to user ID
          const usersMap = {};
          userResults.forEach((user) => {
            if (user.isSuccess) {
              usersMap[user.data._id] = user.data;
            }
          });

          // Attach user details to each booking
          const enrichedBookings = bookingsData.map((booking) => ({
            ...booking,
            user: usersMap[booking.userId],
          }));

          setBookings(enrichedBookings);
        } else {
          setError("Không tìm thấy !");
        }
      } catch (err) {
        setError("An error occurred while fetching bookings.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1); // Only reset if necessary
    }
  }, [searchTerm]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleRowClick = (id, booking, userId) => {
    console.log('choosed booking: ',JSON.stringify(booking) );
    localStorage.setItem('selectedBooking', JSON.stringify(booking));
    localStorage.setItem('userOfBookingId', userId);
    navigate(`/booking/detail/${id}`);
  };

  const filteredData = bookings
    // .filter((booking) => {
    //   const searchTermLower = searchTerm.toLowerCase();
    //   return booking.status.toLowerCase().includes(searchTermLower);
    // })
    .map((booking) => ({
      ...booking,
      status: statusMapping[booking.status] || booking.status,
      dateBooking: formatDateTime(booking.dateBooking),
    }));

  const currentData = filteredData.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  const getStatusColor = (status) => {
    const statusClasses = {
      "Đang chờ": "status-waiting",
      "Đã hủy": "status-cancelled",
      "Đã duyệt": "status-approved",
      "Hoàn thành": "status-completed",
      canceled: "status-cancelled",
      confirm: "status-approved",
    };
    return statusClasses[status] || "status-default";
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalItems = filteredData.length;

  if (isLoading) {
    return <div>Loading bookings...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
                placeholder="Tìm kiếm lượt đặt chỗ"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên khách hàng</th>
                  <th>Mã phiếu</th>
                  <th>Ngày đặt</th>
                  <th>Trạng thái</th>
                  <th>Tổng tiền</th>
                  <th></th>
                </tr>
              </thead>
              {error ? (
                <div>{error}</div>
              ) : (
                <tbody className="row-container">
                  {currentData.map((booking, index) => (
                    <tr key={booking._id} className="clickable-row">
                      <td>{index + 1 + (currentPage - 1) * 10}</td>
                      <td>
                        <div className="namefield">
                          <img
                            src={booking.user?.userAvatar?.url}
                            alt="User Avatar"
                            className="user-avatar"
                          />
                          <p>{booking.user?.userName || "Unknown User"}</p>
                        </div>
                      </td>
                      <td>{booking._id}</td>
                      <td>{booking.dateBooking}</td>
                      <td>
                        <span
                          className={`status-label ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td>{formatCurrency(Number(booking.totalPrice))}</td>
                      <td>
                        <button
                          type="button"
                          className="icon-container iconview"
                          onClick={() => handleRowClick(booking._id, booking, booking.userId )}
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
            itemsPerPage={10}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ListBookingScreen;