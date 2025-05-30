import React from 'react';
import '../styles/DetailBookingScreen.css';
import { FaBell, FaCalendar, FaEnvelope, FaMoneyBill } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import pagination from '../components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope, faUser, faMapMarkerAlt, faMemo, faLocation } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';



const BusinessDetailBookingScreen = () => {

    const { id: bookingId } = useParams();
    const [currentTab, setCurrentTab] = useState('customerinfo');
    const [userData, setUserData] = useState(null);
    const [locationData, setLocationData] = useState(null);
    const [userOfBookingId, setUserOfBookingId] = useState(null);
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    // const onCancel = () => {
    //     if (window.confirm('Bạn có chắc muốn hủy?')) {
    //       console.log('Đã hủy');
    //     }
    // };

    const formattedDate = booking?.dateBooking
    ? moment(booking?.dateBooking).format('DD/MM/YYYY HH:mm:ss')
    : 'Chưa có ngày đặt';

    const handleCustomerInfoClick =()=> {
        setCurrentTab('customerinfo');
    }

    const handleLocationInfoClick = () => {
        setCurrentTab('locationinfo')
    }
    const handleBookingInfoClick = () => {
        setCurrentTab('bookinginfo')

    }


    const fetchUserData = async () => {
        try {
            setLoading(true); 
            
            const response = await fetch(`http://localhost:3000/user/getbyid/${booking.userId._id}`);
            const data = await response.json();

            if (response.ok) {
                setUserData(data.data);
               
            } else {
                setError(data.message || 'Không thể lấy thông tin người dùng');
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi gọi API');
        } finally {
            setLoading(false);
        }
    };

    const fetchLocationData = async () => {
        try {
            setLoading(true); 
            console.log('booking.locationId: ', booking);
            const response = await fetch(`http://localhost:3000/locationbyid/${booking.locationId}`);
            const data = await response.json();

            if (response.ok) {
                setLocationData(data.data);
                console.log('data of detail booking: ', data.data);
            } else {
                setError(data.message || 'Không thể lấy thông tin người dùng');
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi gọi API');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Lấy dữ liệu từ localStorage chỉ khi bookingId thay đổi
        const storedBooking = localStorage.getItem('selectedBooking');
        if (storedBooking) {
            const bookingObj = JSON.parse(storedBooking);
            setBooking(bookingObj);
            if (bookingObj.userId) {
                setUserOfBookingId(bookingObj.userId.toString());
            }
        }
    }, [bookingId]);


    useEffect(() => {
        if (userOfBookingId && typeof userOfBookingId === 'string') {
            fetchUserData();
        }
    }, [userOfBookingId]);

    // Fetch location khi booking thay đổi và có locationId hợp lệ
    useEffect(() => {
        if (booking && booking.locationId) {
            fetchLocationData();
        }
    }, [booking]);

    const handleUpdateBooking = async () => {
        const userConfirmed = window.confirm('Bạn có chắc chắn muốn xác nhận đơn đặt này?');
        
        if (userConfirmed) {
          console.log('log toi day');
          try {
            const response = await fetch(`http://localhost:3000/booking/update/${bookingId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ status: 'confirm' }),
            });
      
            const result = await response.json();
      
            if (result.isSuccess) {
              window.alert('Booking đã được xác nhận.');
              await fetchLocationData();
              //onCancel(); // Cập nhật danh sách sau khi hủy
            } else {
              window.alert(result.message || 'Không thể cập nhật booking.');
            }
          } catch (error) {
            console.error('Error update booking:', error);
            window.alert('Không thể kết nối với máy chủ.');
          }
        }
      };
      
      

    // useEffect(() => {
    //     if (bookingId) {
    //         fetchUserData();
    //     }
    // }, [bookingId]);

    useEffect(() => {
        if (userOfBookingId) {
            fetchUserData();
        }
        if (booking) {
            fetchLocationData();
        }
    }, [userOfBookingId, booking, booking?.status]); // eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <div class="container">
            <div class="containerformobile">
           
                <div class="containerlistbusiness widthlistbusiness">
                    <div class="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow-md p-6">
                        <div class="flex items-center">
                            <img alt="Profile picture of a person" class="w-20 h-20 rounded-full mr-4" height="80" src="https://storage.googleapis.com/a1aa/image/0FPVWfLJ1m0nJS9YfULFrbvezZsDHus5bXhqxVDA6tO9UMKnA.jpg" width="80"/>
                            <div>
                                <h1 class="text-xl font-bold">
                                    {booking?.locationName}
                                </h1>
                                <div class="flex items-center text-gray-600 mt-2">
                                    <FaCalendar class="mr-2"/>
                                  
                                        <span>{moment(booking?.checkinDate).format('DD/MM/YYYY HH:mm:ss')} - {moment(booking?.checkoutDate).format('DD/MM/YYYY HH:mm:ss')}</span>
                                    </div>
                                    <div class="flex items-center mt-2">
                                        <FaMoneyBill class="mr-2 w-5"/>
                                        
                                        <span class="text-green-500 ml-2">{booking?.totalPriceAfterTax?.toLocaleString('vi-VN')} đ</span>

                                        {/* <span class="text-green-500 ml-2">34,000,000 đ</span>
                                        <span class="text-green-500 ml-2 status-label-2">- 50%</span> */}

                                    </div>
                                <div class="flex items-center text-gray-500 mt-1 ">
                                    <FaEnvelope class="mr-2"/>
                                    
                                    <div class="text-gray-500">
                                    Đặt lúc {formattedDate}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-6">
                            <div class="flex">
                                <button onClick={handleBookingInfoClick} className={`flex items-center px-4 py-2 ${currentTab === 'bookinginfo' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} rounded-t-lg`}>
                                    <i class="fas fa-user mr-2">
                                    </i>
                                    <span>
                                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                                        Thông tin booking
                                    </span>

                                </button>
                                <button onClick={handleCustomerInfoClick} className={`flex items-center px-4 py-2 ${currentTab === 'customerinfo' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} rounded-t-lg ml-2`}>

                                    <i class="fas fa-user mr-2">
                                    </i>
                                    <span>
                                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                                        Thông tin khách hàng
                                    </span>
                                </button>
                                <button  onClick={handleLocationInfoClick} class={`flex items-center px-4 py-2 ${currentTab === 'locationinfo' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} rounded-t-lg ml-2`}>
                                    <i class="fas fa-map-marker-alt mr-2">
                                    </i>
                                    <span>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                                        Thông tin địa điểm
                                    </span>
                                </button>
                            </div>
                            {currentTab === 'bookinginfo' && (
                                <div class="border border-gray-200 rounded-b-lg p-4">
    <div class="grid grid-cols-2 gap-4">
      <div class="border rounded-lg bg-gray-50 p-4 mb-4">
        <div class="mb-2 text-gray-500 font-semibold border-b pb-1">Thông tin chung</div>
        <div class="mb-2"><span class="text-gray-500">Mã Booking:</span> <span class="font-bold">{booking?._id}</span></div>
        <div class="mb-2"><span class="text-gray-500">Ngày đặt:</span> {moment(booking?.dateBooking).format('DD/MM/YYYY HH:mm:ss')}</div>
        <div class="mb-2"><span class="text-gray-500">Ngày checkin:</span> {moment(booking?.checkinDate).format('DD/MM/YYYY')}</div>
        <div class="mb-2"><span class="text-gray-500">Ngày checkout:</span> {moment(booking?.checkoutDate).format('DD/MM/YYYY')}</div>
        <div class="mb-2"><span class="text-gray-500">Trạng thái:</span> <span className={`status-label${booking.status === 'canceled' ? '' : booking.status === 'complete' ? '-2' : '-1'}`}>{booking.status === 'pending' && 'Chờ duyệt'}{booking.status === 'confirm' && 'Đã xác nhận'}{booking.status === 'canceled' && 'Đã hủy'}{booking.status === 'complete' && 'Hoàn thành'}{booking.status !== 'pending' && booking.status !== 'confirm' && booking.status !== 'canceled' && booking.status !== 'complete' && booking.status}</span></div>
      </div>
      <div class="border rounded-lg bg-gray-50 p-4 mb-4">
        <div class="mb-2 text-gray-500 font-semibold border-b pb-1">Chi tiết thanh toán</div>
        <div class="mb-2"><span class="text-gray-500">Tổng tiền:</span> <span class="font-bold text-blue-700">{booking?.totalPrice?.toLocaleString('vi-VN')} đ</span></div>
        <div class="mb-2"><span class="text-gray-500">Giảm giá:</span> {booking?.discount ? `- ${booking.discount.toLocaleString('vi-VN')} đ` : '0 đ'}</div>
        <div class="mb-2"><span class="text-gray-500">Tổng sau giảm:</span> {booking?.totalAfterDiscount?.toLocaleString('vi-VN')} đ</div>
        <div class="mb-2"><span class="text-gray-500">Thuế:</span> {booking?.tax?.toLocaleString('vi-VN')} đ</div>
        <div class="mb-2"><span class="text-gray-500">Tổng tiền sau thuế:</span> <span class="font-bold text-green-700">{booking?.totalPriceAfterTax?.toLocaleString('vi-VN')} đ</span></div>
        <div class="mb-2"><span class="text-gray-500">Số tiền đã trả:</span> {booking?.amountPaid?.toLocaleString('vi-VN')} đ</div>
        {booking?.voucherId && (
          <>
            <div class="mb-2 text-gray-500">Mã voucher:</div>
            <div class="mb-2">{booking.voucherId}</div>
          </>
        )}
      </div>
    </div>
    <div class="mb-4 border rounded-lg bg-gray-50 p-4">
      <h2 class="font-bold mb-2 border-b pb-1">Danh sách phòng</h2>
      <div className="flex flex-wrap gap-2">
        {booking?.items?.map((item, idx) => (
          <div key={idx} className="flex flex-col bg-white border rounded px-4 py-2 mb-2 shadow min-w-[180px]">
            <div>
              <span className="font-semibold">Phòng:</span> {item.roomId?.name || item.roomId}
              {locationData?.address && (
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="ml-2 text-blue-500 cursor-pointer"
                  title="Xem trên bản đồ"
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationData.address)}`, '_blank')}
                />
              )}
            </div>
            <div><span className="font-semibold">Số lượng:</span> {item.quantity}</div>
            <div><span className="font-semibold">Giá/phòng:</span> {item.price?.toLocaleString('vi-VN')} đ</div>
            <div><span className="font-semibold">Số đêm:</span> {item.nights}</div>
            <div><span className="font-semibold">Thành tiền:</span> {(item.price * item.quantity * item.nights)?.toLocaleString('vi-VN')} đ</div>
          </div>
        ))}
      </div>
    </div>
    <div class="flex items-center justify-end mt-4">
      <button
        onClick={handleUpdateBooking}
        class="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600"
      >
        Xác nhận Booking
      </button>
    </div>
  </div>
                            )}
                            {currentTab === 'customerinfo' && (
                                <div class="border border-gray-200 rounded-b-lg p-4">
    <div class="grid grid-cols-2 gap-4">
      <div class="border rounded-lg bg-gray-50 p-4 mb-4">
        <div class="mb-2 text-gray-500 font-semibold border-b pb-1">Thông tin khách hàng</div>
        <div class="mb-2"><span class="text-gray-500">Mã khách hàng:</span> <span class="font-bold">{userData?._id}</span></div>
        <div class="mb-2"><span class="text-gray-500">Số điện thoại:</span> {userData?.userPhoneNumber}</div>
        <div class="mb-2"><span class="text-gray-500">Ngày sinh:</span> {userData?.userDateOfBirth}</div>
        <div class="mb-2"><span class="text-gray-500">Tên liên hệ:</span> {userData?.userName}</div>
        <div class="mb-2"><span class="text-gray-500">Giới tính:</span> {userData?.gender === 'male' ? 'Nam' : 'Nữ'}</div>
      </div>
      <div class="border rounded-lg bg-gray-50 p-4 mb-4">
        <div class="mb-2 text-gray-500 font-semibold border-b pb-1">Thông tin liên hệ</div>
        <div class="mb-2"><span class="text-gray-500">Họ và tên:</span> {userData?.userName}</div>
        <div class="mb-2"><span class="text-gray-500">Địa chỉ email:</span> {userData?.userEmail}</div>
        <div class="mb-2"><span class="text-gray-500">Số điện thoại liên hệ:</span> {userData?.userPhoneNumber}</div>
        <div class="mb-2"><span class="text-gray-500">Địa chỉ:</span> {userData?.userPhoneNumber}</div>
      </div>
    </div>
  </div>
                            )}
                            {currentTab === 'locationinfo' && (
                                <div class="border border-gray-200 rounded-b-lg p-4">
    <div class="grid grid-cols-2 gap-4">
      <div class="border rounded-lg bg-gray-50 p-4 mb-4">
        <div class="mb-2 text-gray-500 font-semibold border-b pb-1">Thông tin địa điểm</div>
        <div class="mb-2"><span class="text-gray-500">Mã địa điểm:</span> <span class="font-bold">{booking._id}</span></div>
        <div class="mb-2"><span class="text-gray-500">Loại:</span> {
          locationData?.category?.id === 'hotel' ? 'Khách sạn' :
          locationData?.category?.id === 'homestay' ? 'Homestay' :
          locationData?.category?.id === 'guest_home' ? 'Nhà nghỉ' :
          'Danh mục không xác định'
        }</div>
      </div>
      <div class="border rounded-lg bg-gray-50 p-4 mb-4">
        <div class="mb-2 text-gray-500 font-semibold border-b pb-1">Địa chỉ & ngày đăng ký</div>
        <div class="mb-2"><span class="text-gray-500">Tên địa điểm:</span> {locationData?.name}
          {locationData?.address && (
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="ml-2 text-blue-500 cursor-pointer"
              title="Xem trên bản đồ"
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationData.address)}`, '_blank')}
            />
          )}
        </div>
        <div class="mb-2"><span class="text-gray-500">Địa chỉ:</span> {locationData?.address}</div>
        <div class="mb-2"><span class="text-gray-500">Ngày đăng ký kinh doanh:</span> {moment(locationData?.dateCreated).format('DD/MM/YYYY HH:mm:ss')}</div>
      </div>
    </div>
  </div>
                            )}
                        </div>
                    </div>
                </div> 
            </div>
        </div>
       
    );

};
export default BusinessDetailBookingScreen;