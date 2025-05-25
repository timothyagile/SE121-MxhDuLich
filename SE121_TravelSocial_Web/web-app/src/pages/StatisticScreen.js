import React, { useState } from "react";
import { FaAngleRight, FaBell, FaEye } from "react-icons/fa";
import Chart from "react-apexcharts";
import "../styles/StatisticScreen.css";
import { useEffect } from "react";

const StatisticScreen = () => {
  const [years, setYears] = useState(new Date().getFullYear() - 1);
  const [successRate, setSuccessRate] = useState(0);
  const [seriesData, setSeriesData] = useState([
    { name: "Doanh thu", data: [] },
  ]);
  const failureRate = 100 - successRate;
  const chartOptions = {
    chart: {
      type: "line",
      height: 350,
    },
    xaxis: {
      categories: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "tháng 8",
        "tháng 9",
        "tháng 10",
        "tháng 11",
        "tháng 12",
      ],
    },
    title: {
      text: "Doanh thu theo tháng",
      align: "center",
    },
  };

  const handleYearChange = (event) => {
    setYears(event.target.value);
  };

  useEffect(() => {
    const fetchSuccessRate = async () => {
      try {
        const response = await fetch(`http://localhost:3000/booking/getall`);
        if (!response.ok) {
          throw new Error("Failed to fetch bookings data.");
        }

        const result = await response.json();
        const bookings = result.data || []; // Danh sách các booking
        console.log("chart:", bookings);

        // Lọc booking theo năm được chọn
        const filteredBookings = bookings.filter((booking) => {
          const bookingYear = new Date(booking.dateBooking).getFullYear();
          return bookingYear === parseInt(years);
        });

        // Tính toán số lượng trạng thái
        const totalBookings = filteredBookings.length;
        const completedBookings = filteredBookings.filter(
          (booking) => booking.status === "complete"
        ).length;
        const canceledBookings = totalBookings - completedBookings;

        // Cập nhật tỷ lệ thành công
        const successRate2 =
          totalBookings > 0 ? (completedBookings / totalBookings) * 100 : 0;
        setSuccessRate(successRate2);

        setChartData({
          ...chartData,
          series: [successRate2, 100 - successRate2],
        });
      } catch (error) {
        console.error("Error fetching bookings data:", error);
      }
    };

    fetchSuccessRate();
  }, [years]);

  // const seriesData = [
  //   {
  //     name: "Doanh thu",
  //     data: [30, 40, 35, 50, 49, 60, 70, 1, 60, 45, 35, 30],
  //   },
  // ];

  useEffect(() => {
    const fetchYearlyRevenue = async () => {
      try {
        // Lấy năm hiện tại
        const monthlyData = [];

        // Gọi API cho từng tháng (1 -> 12)
        for (let month = 1; month <= 12; month++) {
          const response = await fetch(
            `http://localhost:3000/bookings/revenue/?month=${month}&year=${years}`
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch revenue for month ${month}`);
          }
          const result = await response.json();
          monthlyData.push(result.data.totalRevenue || 0); // Nếu không có dữ liệu, dùng 0
        }
        console.log(monthlyData);

        setSeriesData([{ name: "Doanh thu", data: monthlyData }]); // Cập nhật dữ liệu biểu đồ
      } catch (error) {
        console.error("Error fetching yearly revenue:", error);
      }
    };
    fetchYearlyRevenue();
    // fetchBookingSuccessRate();
    // fetchServiceBookingRates();
  }, [years]);

  const [chartData, setChartData] = useState({
    series: [successRate, failureRate],
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Thành công", "Thất bại"],
      colors: ["#69c0ff", "rgba(244,91,105,0.6)"],
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "Tổng số",
                formatter: () => `100%`,
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        markers: {
          width: 12,
          height: 12,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/alllocation`);
        if (!response.ok) {
          throw new Error("Failed to fetch locations");
        }
        const data = await response.json();
        console.log(data.data);
        // Đếm số lượng từng loại
        const hotelCount = data.data.filter(
          (location) => location?.category?.id === "hotel"
        ).length;
        const motelCount = data.data.filter(
          (location) => location?.category?.id === "guest home"
        ).length;
        const homestayCount = data.data.filter(
          (location) => location?.category?.id === "homestay"
        ).length;
        const total = hotelCount + motelCount + homestayCount;
        console.log(homestayCount, hotelCount, motelCount);

        // Tính tỷ lệ
        const hotelPercentage = ((hotelCount / total) * 100).toFixed(2);
        const motelPercentage = ((motelCount / total) * 100).toFixed(2);
        const homestayPercentage = ((homestayCount / total) * 100).toFixed(2);

        // Cập nhật series
        setChartData2((prevData) => ({
          ...prevData,
          series: [
            parseFloat(hotelPercentage),
            parseFloat(motelPercentage),
            parseFloat(homestayPercentage),
          ],
        }));
        setSeries([
          parseFloat(hotelPercentage),
          parseFloat(motelPercentage),
          parseFloat(homestayPercentage),
        ]);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocationData();
  }, []);

  const [series, setSeries] = useState([10, 20, 70]);
  const [chartData2, setChartData2] = useState({
    series: [series],
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Khách sạn", "Nhà nghỉ", "Homestay"],
      colors: ["#69c0ff", "#00E396", "#FEB019"],
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "Tổng số",
                formatter: () => "100%",
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return `${val}%`;
        },
      },
      legend: {
        position: "bottom",
        horizontalAlign: "center",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div class="container pg-0">
      <div class="containerformobile">
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="yearSelect">Chọn năm: </label>
          <select id="yearSelect" value={years} onChange={handleYearChange}>
            {/* Thêm các năm vào đây, ví dụ từ 2020 đến năm hiện tại */}
            {[2020, 2021, 2022, 2023, 2024, 2025].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div class="containerlistbusiness widthlistbusiness">
          <Chart
            options={chartOptions}
            series={seriesData}
            type="line"
            height={350}
          />
          <div class="chartcontainer">
            <div class="staticchart">
              <h3 style={{ textAlign: "center" }}>
                Tỉ lệ Thành công của Booking
              </h3>

              <Chart
                class="piechart"
                options={chartData.options}
                series={chartData.series}
                type="donut"
                width="380"
              />
            </div>

            <div class="staticchart">
              <h3 style={{ textAlign: "center" }}>Tỉ lệ Đặt các Dịch vụ</h3>
              <Chart
                class="piechart"
                options={chartData2.options}
                series={chartData2.series}
                type="donut"
                width="380"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticScreen;