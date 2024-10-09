import React, { useState } from 'react';
import { FaAngleRight,FaBell, FaEye } from 'react-icons/fa';
import Chart from 'react-apexcharts';
import '../styles/StatisticScreen.css'

const StatisticScreen = () => {

    const chartOptions = {
        chart: {
            type: 'line',
            height: 350,
        },
        xaxis: {
            categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11','tháng 12']
        },
        title: {
            text: 'Doanh thu theo tháng',
            align: 'center'
        }
    };

    const seriesData = [{
        name: 'Doanh thu',
        data: [30, 40, 35, 50, 49, 60, 70, 1, 60, 45, 35, 30]
    }];

    const successRate = 60;  // Phần trăm thành công
    const failureRate = 100 - successRate;  // Phần trăm thất bại
  
    const [chartData] = useState({
      series: [successRate, failureRate],  // Dữ liệu: Thành công và thất bại
      options: {
        chart: {
          type: 'donut',
        },
        labels: ['Thành công', 'Thất bại'],  // Nhãn cho các phần
        colors: ['#69c0ff', 'rgba(244,91,105,0.6)'],  // Màu sắc: Xanh cho thành công, Đỏ cho thất bại
        plotOptions: {
          pie: {
            donut: {
              size: '70%',
              labels: {
                show: true,
                total: {
                  show: true,
                  label: 'Thành công',
                  formatter: () => `${successRate}%`,  // Hiển thị tỉ lệ thành công
                },
              },
            },
          },
        },
        dataLabels: {
          enabled: false,  // Không hiển thị nhãn bên ngoài
        },
        legend: {
          position: 'bottom',  // Đưa chú thích xuống dưới
          horizontalAlign: 'center',
          markers: {
            width: 12,
            height: 12,
          },
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: 'bottom',
            },
          },
        }],
      },
    });

    const [chartData2] = useState({
        series: [40, 30, 20, 10],  // Dữ liệu: Phần trăm các loại dịch vụ
        options: {
          chart: {
            type: 'donut',
          },
          labels: ['Khách sạn', 'Nhà hàng', 'Tour du lịch', 'Phương tiện di chuyển'],  // Nhãn cho từng loại dịch vụ
          colors: ['#69c0ff', '#00E396', '#FEB019', 'rgba(244,91,105,0.6)'],  // Màu sắc tùy chỉnh cho từng loại dịch vụ
          plotOptions: {
            pie: {
              donut: {
                size: '70%',
                labels: {
                  show: true,
                  total: {
                    show: true,
                    label: 'Tổng số',
                    formatter: () => '100%',
                  },
                },
              },
            },
          },
          dataLabels: {
            enabled: true,  // Hiển thị nhãn bên ngoài
            formatter: function (val) {
              return `${val}%`;  // Hiển thị phần trăm bên ngoài biểu đồ
            },
          },
          legend: {
            position: 'bottom',  // Đưa chú thích xuống dưới
            horizontalAlign: 'center',
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: 'bottom',
              },
            },
          }],
        },
      });
  

    return (
        <div class="container">
            <div class="containerformobile">
                <div class="dashboardheader">
                    <div className="notification-icon">
                    <FaBell></FaBell>
                    </div>
                    <div className="admin-info">
                    <img src="avatar.png" alt="Admin Avatar" className="admin-avatar" />
                    <div className="admin-details">
                        <h2 className="admin-name">Tô Hoàng Huy</h2>
                        <p className="admin-role">Quản trị viên</p>
                    </div>
                    
                    </div>
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
                            <h3 style={{ textAlign: 'center' }}>Tỉ lệ Thành công của Booking</h3>
                            
                            <Chart
                                class="piechart"
                                options={chartData.options}
                                series={chartData.series}
                                type="donut"
                                width="380"
                            />
                            
                           
                        </div>

                        <div class="staticchart">
                            <h3 style={{ textAlign: 'center' }}>Tỉ lệ Đặt các Dịch vụ</h3>
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
                <div>
                    
                </div>
            </div>
        </div>
    );
};

export default StatisticScreen;