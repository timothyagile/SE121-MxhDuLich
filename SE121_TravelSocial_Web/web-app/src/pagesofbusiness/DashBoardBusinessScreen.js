/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useMemo } from "react";
import "../styles/DashBoardScreen.css";
import { FaAngleRight, FaMoneyBillAlt } from "react-icons/fa";
import Calendar from "react-calendar";
import { FaChartBar, FaBell, FaFilter, FaSearch, FaStar } from "react-icons/fa";
import Chart from "react-apexcharts";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import moment from "moment";

const DashBoardBusinessScreen = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [value, setValue] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [topLocations, setTopLocations] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [chartData, setChartData] = useState({
    series: [{ name: "Doanh thu", data: [] }],
    options: {
      chart: { type: "line", height: 200 },
      xaxis: {
        categories: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ],
      },
      title: { text: "Doanh thu theo tháng", align: "center" },
    },
  });

  const onChange = (newdate) => {
    setValue(newdate);
    setSelectedDate(newdate);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      setLoadingBookings(true);
      try {
        // Sử dụng API mới trả về đầy đủ thông tin
        const response = await fetch(
          `http://localhost:3000/booking/getfullbybusinessid/${userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBookings(data.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoadingBookings(false);
      }
    };
    fetchBookings();
  }, [userId]);

  const pendingBookings = useMemo(
    () => bookings.filter((booking) => booking.status === "pending"),
    [bookings]
  );

  const [monthlyBookings, setMonthlyBookings] = useState(0); // Số booking trong tháng
  const [monthlyRevenue, setMonthlyRevenue] = useState(0); // Doanh thu trong tháng

  useEffect(() => {
    const fetchMonthlyStats = async () => {
      setLoadingStats(true);
      try {
        // Lấy tháng và năm hiện tại
        const currentMonth = new Date().getMonth() + 1; // JavaScript getMonth() trả từ 0-11
        const currentYear = new Date().getFullYear();
        console.log("userId: ", userId);
        // Gọi API với query params
        const response = await fetch(
          `http://localhost:3000/bookings/revenue/${userId}?month=${currentMonth}&year=${currentYear}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch monthly stats");
        }
        const data = await response.json();

        setMonthlyBookings(data.data.totalBookings);
        setMonthlyRevenue(data.data.totalRevenue);
      } catch (error) {
        console.error("Error fetching monthly stats:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchMonthlyStats();
  }, [userId]); // Chạy lại khi `userId` thay đổi

  const filteredBookingsByDate = useMemo(
    () =>
      selectedDate
        ? bookings.filter((booking) =>
            moment(booking.dateBooking).isSame(selectedDate, "day")
          )
        : bookings,
    [bookings, selectedDate]
  );

  // FILTERED BOOKINGS BY SEARCH
  const filteredBookings = useMemo(() => {
    if (!searchTerm) return bookings;
    const lower = searchTerm.toLowerCase();
    return bookings.filter(
      (b) =>
        (b.userName && b.userName.toLowerCase().includes(lower)) ||
        (b.locationName && b.locationName.toLowerCase().includes(lower)) ||
        (b._id && b._id.toLowerCase().includes(lower))
    );
  }, [bookings, searchTerm]);

  const handleRowClick = (id) => {
    navigate(`/business/booking/detail/${id}`);
  };

  const handleBusinessDetailClick = (id) => {
    navigate(`/business/booking/detail/${id}`);
  };

  useEffect(() => {
    // Tính top 3 địa điểm được đặt nhiều nhất
    const locationMap = {};
    bookings.forEach((b) => {
      if (b.locationName) {
        locationMap[b.locationName] = (locationMap[b.locationName] || 0) + 1;
      }
    });
    const sortedLocations = Object.entries(locationMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, count]) => ({ name, count }));
    setTopLocations(sortedLocations);

    // Tính top 3 khách hàng đặt nhiều nhất
    const customerMap = {};
    bookings.forEach((b) => {
      if (b.userName) {
        customerMap[b.userName] = (customerMap[b.userName] || 0) + 1;
      }
    });
    const sortedCustomers = Object.entries(customerMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, count]) => ({ name, count }));
    setTopCustomers(sortedCustomers);

    // Tính dữ liệu cho biểu đồ doanh thu theo tháng
    const revenueByMonth = Array(12).fill(0);
    bookings.forEach((b) => {
      if (b.dateBooking && b.totalPriceAfterTax) {
        const month = new Date(b.dateBooking).getMonth();
        revenueByMonth[month] += b.totalPriceAfterTax;
      }
    });
    setChartData((prev) => ({
      ...prev,
      series: [{ name: "Doanh thu", data: revenueByMonth }],
    }));
  }, [bookings]);

  return (
    <div className="dashboardbody">
      <div className="leftframe">
        {/* Thanh tìm kiếm, bộ lọc, thông báo */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <FaSearch />
            <input
              type="text"
              className="input-text border-search"
              placeholder="Tìm kiếm booking, khách hàng, địa điểm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 220 }}
            />
            <button
              className="btn-filter ml-2"
              onClick={() => setShowFilter((v) => !v)}
            >
              <FaFilter /> Bộ lọc
            </button>
          </div>
          <div className="flex items-center gap-3">
            <FaBell className="text-yellow-500 animate-bounce" />
            <span className="text-sm text-gray-500">Thông báo mới</span>
          </div>
        </div>
        {showFilter && (
          <div className="mb-3 p-2 bg-gray-100 rounded">
            <span>Bộ lọc nâng cao (demo):</span>
            <div className="flex gap-2 mt-2">
              <button className="btn btn-xs">Chờ duyệt</button>
              <button className="btn btn-xs">Đã duyệt</button>
              <button className="btn btn-xs">Hoàn thành</button>
              <button className="btn btn-xs">Đã hủy</button>
            </div>
          </div>
        )}
        {/* Biểu đồ doanh thu theo tháng */}
        <div className="mb-4">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="line"
            height={200}
          />
        </div>
        {/* Top 3 địa điểm và khách hàng */}
        <div className="flex gap-4 mb-4">
          <div className="bg-white rounded shadow p-3 flex-1">
            <h3 className="font-bold mb-2 flex items-center">
              <FaChartBar className="mr-2" />
              Top 3 địa điểm nổi bật
            </h3>
            {topLocations.length === 0 ? (
              <span>Chưa có dữ liệu</span>
            ) : (
              <ul>
                {topLocations.map((loc, idx) => (
                  <li
                    key={loc.name}
                    className="flex items-center gap-2 mb-1"
                  >
                    <span className="font-bold">#{idx + 1}</span> {loc.name}{" "}
                    <span className="ml-auto text-blue-600">
                      {loc.count} lượt đặt
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="bg-white rounded shadow p-3 flex-1">
            <h3 className="font-bold mb-2 flex items-center">
              <FaStar className="mr-2" />
              Top 3 khách hàng
            </h3>
            {topCustomers.length === 0 ? (
              <span>Chưa có dữ liệu</span>
            ) : (
              <ul>
                {topCustomers.map((cus, idx) => (
                  <li
                    key={cus.name}
                    className="flex items-center gap-2 mb-1"
                  >
                    <span className="font-bold">#{idx + 1}</span> {cus.name}{" "}
                    <span className="ml-auto text-green-600">
                      {cus.count} booking
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="chart business-card-2">
          <div>
            <div className="business-card">
              <div className="card-header">
                <div className="circle">
                  {" "}
                  <FaMoneyBillAlt size={40}></FaMoneyBillAlt>
                </div>
                <p>Booking trong tháng</p>
                <div className="frame">
                  {/* <PercentageIndicator class="percentage" percentage={-12} /> */}
                </div>
              </div>
              <div className="card-body">
                <p className="number">{monthlyBookings}</p>
              </div>
              <div className="separator">
                <div></div>
              </div>
              <div className="card-footer">
                <p>Cập nhật lần cuối: {moment().format("DD/MM/YYYY")}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="business-card ">
              <div className="card-header">
                <div className="circle">
                  {" "}
                  <FaMoneyBillAlt size={40}></FaMoneyBillAlt>
                </div>
                <p>Doanh thu trong tháng</p>
                <div className="frame">
                  {/* <PercentageIndicator class="percentage" percentage={18} /> */}
                </div>
              </div>
              <div className="card-body">
                <p className="number">
                  {monthlyRevenue?.toLocaleString()} VND
                </p>
              </div>
              <div className="separator">
                <div></div>
              </div>
              <div className="card-footer">
                <p>Cập nhật lần cuối: {moment().format("DD/MM/YYYY")}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="new-booking scroll-container mh-scroll">
          <p className="new-booking-text">Booking đang chờ xác nhận</p>
          {loadingBookings ? (
            <div className="flex justify-center items-center py-4">
              <span>Đang tải dữ liệu...</span>
            </div>
          ) : pendingBookings.length === 0 ? (
            <div className="flex justify-center items-center py-4">
              <span>Không có booking nào đang chờ xác nhận.</span>
            </div>
          ) : (
            <table className="custom-table ">
              <thead>
                <tr>
                  <th> </th>
                  <th>Tên địa điểm</th>
                  <th>Tên nhà kinh doanh</th>
                  <th>Thời gian</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {(pendingBookings || []).map((booking) => (
                  <tr
                    key={booking.id || booking._id}
                    className="cursor-pointer hover:bg-blue-100"
                    onClick={() => handleRowClick(booking._id)}
                  >
                    <td>
                      <div className="location-icon">
                        <img
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                          }}
                          src={booking.locationImage?.[0]?.url}
                          alt="Location Icon"
                        />
                      </div>
                    </td>
                    <td>{booking.locationName || "N/A"}</td>
                    <td>{booking.userName || "N/A"}</td>
                    <td>
                      {booking.dateBooking
                        ? moment(booking.dateBooking).format("DD-MM-YYYY")
                        : "N/A"}
                    </td>
                    <td>
                      <span
                        className={
                          booking.status === "đã duyệt"
                            ? "status-label-2"
                            : "status-label"
                        }
                      >
                        {booking.status === "pending"
                          ? "Chờ phê duyệt"
                          : booking.status || "N/A"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="rightframe">
        <p className="staticbydate">Thống kê theo ngày </p>
        <div className="flex items-center justify-center mb-4">
          <Calendar
            className="custom-calendar w-[90%]"
            onChange={onChange}
            value={value}
            locale="vi-VN"
            navigationLabel={({ date, label, locale, view }) => label}
            tileContent={({ date, view }) =>
              view === "month" && date.getDay() === 0 ? null : null
            }
          />
        </div>
        <div className="scroll-container">
          <p className="new-business mb-3">Booking trong ngày</p>
          {loadingBookings ? (
            <div className="flex justify-center items-center py-4">
              <span>Đang tải dữ liệu...</span>
            </div>
          ) : filteredBookingsByDate.length > 0 ? (
            filteredBookingsByDate.map((booking) => (
              <div
                className="user-info"
                key={booking.id || booking._id}
                onClick={() => handleBusinessDetailClick(booking._id)}
                style={{ cursor: "pointer" }}
              >
                <img
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginRight: 10,
                  }}
                  src={booking.userAvatar?.url}
                  alt="Location Icon"
                />
                <div className="user-details">
                  <h2 className="user-name">{booking.userName || "N/A"}</h2>
                  <p className="user-time">
                    {booking.dateBooking
                      ? moment(booking.dateBooking).format("DD-MM-YYYY hh:mm:ss")
                      : "N/A"}
                  </p>
                </div>
                <div className="arrow-icon">
                  <FaAngleRight />
                </div>
              </div>
            ))
          ) : (
            <p>Không có nhà kinh doanh nào cho ngày đã chọn.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoardBusinessScreen;