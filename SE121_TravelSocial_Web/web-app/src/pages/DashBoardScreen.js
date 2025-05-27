import React, { useState } from "react";

import SideBar from "../components/SideBar";
import "../styles/DashBoardScreen.css";
import { FaAngleRight, FaBell, FaMoneyBillAlt } from "react-icons/fa";
import Calendar from "react-calendar";
import pagination from "../components/Pagination";
import PercentageIndicator from "../components/PercentageIndicator";
import { businesses, users } from "./BusinessData";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import moment from "moment";

const DashBoardScreen = () => {
  const userId = localStorage.getItem("userId");
  const [value, setValue] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [monthlyBookings, setMonthlyBookings] = useState(0); // Số booking trong tháng
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ownerCount, setOwnerCount] = useState(0);
  const [pendingLocationCount, setPendingLocationCount] = useState(0);
  const onChange = (newDate) => {
    setValue(newDate);
    setSelectedDate(newDate); // Cập nhật ngày đã chọn
  };

  const filteredLocations = selectedDate
    ? locations.filter((location) => {
        // Giả sử mỗi user có một thuộc tính date chứa ngày mà họ có dữ liệu
        const userDate = new Date(location.dateCreated); // Thay đổi 'user.date' thành thuộc tính thực tế của bạn
        return userDate.toDateString() === selectedDate.toDateString();
      })
    : [];

  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/location/detail/${id}`);
  };

  const handleBusinessDetailClick = (id) => {
    navigate(`/location/detail/${id}`); // Điều hướng đến DetailLocationScreen với ID
  };

  useEffect(() => {
    const fetchMonthlyStats = async () => {
      try {
        // Lấy tháng và năm hiện tại
        const currentMonth = new Date().getMonth() + 1; // JavaScript getMonth() trả từ 0-11
        const currentYear = new Date().getFullYear();
        console.log("userId: ", userId);
        // Gọi API với query params
        const response = await fetch(
          `http://localhost:3000/bookings/revenue/?month=${currentMonth}&year=${currentYear}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch monthly stats");
        }
        const data = await response.json();

        setMonthlyBookings(data.data.totalBookings);
        setMonthlyRevenue(data.data.totalRevenue);
      } catch (error) {
        console.error("Error fetching monthly stats:", error);
      }
    };

    fetchMonthlyStats();
  }, []);

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
        // setLocationOwner(data.data || []);
        setOwnerCount(data.data?.length || 0);
      } catch (error) {
        console.error("Error fetching locations Owner:", error);
      }
    };

    fetchLocationOwner();
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/alllocation");
        const data = await response.json();

        if (response.ok) {
          const pendingLocationCount = data.data.filter(
            (location) => location.status === "inactive"
          );
          setLocations(data.data);
          setPendingLocationCount(pendingLocationCount.length);
          console.log(data.data);
        } else {
          setError(data.message || "Không thể lấy danh sách địa điểm");
        }
      } catch (err) {
        setError("Lỗi kết nối tới API");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const pendingLocations = locations.filter(
    (location) => location.status === "inactive"
  );

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
    <div class="dashboardbody">
      <div class="leftframe">
        <div class="chart">
          <div>
            <div className="business-card">
              <div className="card-header">
                <div class="circle">
                  <FaMoneyBillAlt size={40}></FaMoneyBillAlt>
                </div>
                <p>Tổng nhà kinh doanh</p>
                <div className="frame">
                  {/* <p className={`percentage ${1 < 0 ? 'decrease' : 'increase'}`}>
                        12%
                    </p> */}
                  {/* <PercentageIndicator class="percentage" percentage={-12} /> */}
                </div>
              </div>
              <div className="card-body">
                <p className="number">{ownerCount}</p>
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
            <div className="business-card">
              <div className="card-header">
                <div class="circle">
                  <FaMoneyBillAlt size={40}></FaMoneyBillAlt>
                </div>
                <p>Doanh thu trong tháng</p>
                <div className="frame">
                  {/* <p className={`percentage ${1 < 0 ? 'decrease' : 'increase'}`}>
                        12%
                    </p> */}
                  {/* <PercentageIndicator class="percentage" percentage={12} /> */}
                </div>
              </div>
              <div className="card-body">
                <p className="number">{monthlyRevenue} VND</p>
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
            <div className="business-card">
              <div className="card-header">
                <div class="circle">
                  <FaMoneyBillAlt size={40}></FaMoneyBillAlt>
                </div>
                <p>Tổng địa điểm chờ duyệt</p>
                <div className="frame">
                  {/* <p className={`percentage ${1 < 0 ? 'decrease' : 'increase'}`}>
                        12%
                    </p> */}
                  {/* <PercentageIndicator class="percentage" percentage={-12} /> */}
                </div>
              </div>
              <div className="card-body">
                <p className="number">{pendingLocationCount}</p>
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
            <div className="business-card">
              <div className="card-header">
                <div class="circle">
                  <FaMoneyBillAlt size={40}></FaMoneyBillAlt>
                </div>
                <p>Số lượt booking trong tháng</p>
                {/* <div className="frame">
                  {/* <p className={`percentage ${1 < 0 ? 'decrease' : 'increase'}`}>
                        12%
                    </p> */}
                {/* <PercentageIndicator class="percentage" percentage={-12} /> */}
                {/* </div> */}
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
        </div>
        <div class="new-booking scroll-container mh-scroll">
          <p class="new-booking-text">Địa điểm chờ duyệt trong ngày</p>
          <table class="custom-table ">
            <thead>
              <tr>
                <th> </th>
                <th>Tên địa điểm</th>
                <th>Ngày tạo</th>
                <th>Loại</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {(pendingLocations || []).map((business) => (
                <tr
                  key={business._id}
                  className="cursor-pointer hover:bg-blue-100"
                  onClick={() => handleRowClick(business._id)}
                >
                  <td>
                    <div className="location-icon">
                      <img
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                        }}
                        src={business.image?.[0].url}
                        alt="Location Icon"
                      />
                    </div>
                  </td>
                  <td>{business.name}</td>
                  <td>{moment(business.dateCreated).format("DD/MM/YYYY")}</td>
                  <td>{getCategoryName(business.category.id)}</td>
                  <td>
                    <span
                      className={
                        business.status === "active"
                          ? "status-label-2"
                          : "status-label status-waiting"
                      }
                    >
                      {business.status === "inactive"
                        ? "Chờ phê duyệt"
                        : business.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div class="rightframe">
        <p class="staticbydate">Thống kê theo ngày </p>
        <div class="flex items-center justify-center mb-4">
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
        <div class="scroll-container">
          <p class="new-business mb-3">Địa điểm kinh doanh đăng ký ngày</p>
          <div>
            {filteredLocations.length > 0 ? (
              filteredLocations.map((user) => (
                <div
                  className="user-info"
                  key={user.id}
                  onClick={() => handleBusinessDetailClick(user._id)} // Bắt sự kiện click
                  style={{ cursor: "pointer" }}
                >
                  <img
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      marginRight: 10,
                    }}
                    src={user.image?.[0].url}
                    alt="Location Icon"
                  />
                  <div className="user-details">
                    <h2 className="user-name">{user.name}</h2>
                    <p className="user-time">
                      {moment(user.dateCreated).format("DD/MM/YYYY hh:mm:ss")}
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
    </div>
  );
};

export default DashBoardScreen;