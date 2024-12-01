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

    const successRate = 60;  
    const failureRate = 100 - successRate;  
  
    const [chartData] = useState({
      series: [successRate, failureRate],  
      options: {
        chart: {
          type: 'donut',
        },
        labels: ['Thành công', 'Thất bại'],  
        colors: ['#69c0ff', 'rgba(244,91,105,0.6)'],  
        plotOptions: {
          pie: {
            donut: {
              size: '70%',
              labels: {
                show: true,
                total: {
                  show: true,
                  label: 'Thành công',
                  formatter: () => `${successRate}%`, 
                },
              },
            },
          },
        },
        dataLabels: {
          enabled: false, 
        },
        legend: {
          position: 'bottom', 
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
        series: [40, 30, 20, 10],  
        options: {
          chart: {
            type: 'donut',
          },
          labels: ['Khách sạn', 'Nhà hàng', 'Tour du lịch', 'Phương tiện di chuyển'],  
          colors: ['#69c0ff', '#00E396', '#FEB019', 'rgba(244,91,105,0.6)'], 
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
            enabled: true,  
            formatter: function (val) {
              return `${val}%`;  
            },
          },
          legend: {
            position: 'bottom',
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
                
            </div>
        </div>
    );
};

export default StatisticScreen;