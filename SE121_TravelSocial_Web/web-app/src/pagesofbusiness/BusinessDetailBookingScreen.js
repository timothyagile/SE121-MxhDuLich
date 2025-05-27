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
            const response = await fetch(`http://localhost:3000/user/getbyid/${userOfBookingId}`);
            const data = await response.json();

            if (response.ok) {
                setUserData(data.data);
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

    const fetchLocationData = async () => {
        try {
            setLoading(true); 
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
        const userOfBooking = localStorage.getItem('userOfBookingId');
        if (userOfBooking) {
            console.log('get booking from localstorage: ', userOfBooking);
            setUserOfBookingId(userOfBooking);
        }
        const storedBooking = localStorage.getItem('selectedBooking');
        if (storedBooking) {
            console.log('get booking from localstorage: ', JSON.parse(storedBooking));
            setBooking(JSON.parse(storedBooking));
        }
    }, [bookingId, booking?.status]);

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
    }, [userOfBookingId], [booking, booking?.status]);
    
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
                                        
                                        <span class="text-green-500 ml-2">{booking?.totalPriceAfterTax} VND</span>

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
                                        <div>
                                            <div class="mb-2 text-gray-500">Mã Booking</div>
                                            <div class="mb-4">{booking?._id}</div>
                                            <div class="mb-2 text-gray-500">Ngày checkin</div>
                                            <div class="mb-4">{moment(booking?.checkinDate).format('DD/MM/YYYY HH:mm:ss')}</div>
                                            <div class="mb-2 text-gray-500">Tổng tiền</div>
                                            <div class="mb-4">{booking?.totalPriceAfterTax}</div>
                                            {/* <div class="mb-2 text-gray-500">Tên liên hệ</div>
                                            <div class="mb-4">{userData?.userName}</div>
                                            <div class="mb-2 text-gray-500">Giới tính</div>
                                            <div className="mb-4">
                                                {userData?.gender === 'male' ? 'Nam' : 'Nữ'}
                                            </div> */}
                                        </div>
                                        <div>
                                            <div class="mb-2 text-gray-500">Ngày đặt</div>
                                            <div class="mb-4">{moment(booking?.dateBooking).format('DD/MM/YYYY HH:mm:ss')}</div>
                                            <div class="mb-2 text-gray-500">Ngày checkout</div>
                                            <div class="mb-4">{moment(booking?.checkoutDate).format('DD/MM/YYYY HH:mm:ss')}</div>
                                            {/* <div class="mb-2 text-gray-500">Số CMND/CCCD</div>
                                            <div class="mb-4">079303041653</div> */}
                                            <div class="mb-2 text-gray-500">Số tiền đã trả</div>
                                            <div class="mb-4">{booking?.amountPaid}</div>
                                            {/* <div class="mb-2 text-gray-500">Địa chỉ</div>
                                            <div class="mb-4">{userData?.userPhoneNumber}</div> */}
                                        </div>
                                        <div class="mb-4">
                                            <h2 class="font-bold mb-2">Phòng:</h2>
                                            
                                            <div className="flex flex-wrap gap-2">
                                                {booking?.items.map((item, index) => (
                                                    <div key={index} className="flex items-center bg-gray-200 rounded-full px-3 py-1">
                                                        {/* {getFacilityIcon(item.roomId)} */}
                                                        <span class="mr-2">Số lượng: </span>
                                                        <span class="font-bold">{item.quantity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div class="flex items-center justify-between">
                                            <div className="flex items-center justify-center mt-2">
                                                <h2 class="text-black font-bold mr-2">Trạng thái</h2>
                                                <span
                                                className={`status-label${
                                                    booking.status === 'canceled' 
                                                    ? '' 
                                                    : booking.status === 'complete' 
                                                    ? '-2' 
                                                    : '-1'
                                                }`}
                                                >
                                                {booking.status === 'pending' && 'Chờ duyệt'}
                                                {booking.status === 'confirm' && 'Đã xác nhận'}
                                                {booking.status === 'canceled' && 'Đã hủy'}
                                                {booking.status === 'complete' && 'Hoàn thành'}
                                                {booking.status !== 'pending' && 
                                                booking.status !== 'confirm' && 
                                                booking.status !== 'canceled' && 
                                                booking.status !== 'complete' && 
                                                booking.status}
                                                </span>
                                                {/* <input 
                                                    name="pricePerNight"
                                            
                                                     type="number" className="w-48 p-3 border border-gray-300 rounded-lg"></input> */}
                                            </div>
                                            
                                            <div class="flex">
                                                <button onClick={handleUpdateBooking} class="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600">Xác nhận Booking</button>
                                            </div>
                                        </div>
                                </div>
                            )}
                            {currentTab === 'customerinfo' && (
                                <div class="border border-gray-200 rounded-b-lg p-4">
                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <div class="mb-2 text-gray-500">Mã khách hàng</div>
                                            <div class="mb-4">{userData?._id}</div>
                                            <div class="mb-2 text-gray-500">Số điện thoại</div>
                                            <div class="mb-4">{userData?.userPhoneNumber}</div>
                                            <div class="mb-2 text-gray-500">Ngày sinh</div>
                                            <div class="mb-4">{userData?.userDateOfBirth}</div>
                                            <div class="mb-2 text-gray-500">Tên liên hệ</div>
                                            <div class="mb-4">{userData?.userName}</div>
                                            <div class="mb-2 text-gray-500">Giới tính</div>
                                            <div className="mb-4">
                                                {userData?.gender === 'male' ? 'Nam' : 'Nữ'}

                                            </div>

                                        </div>
                                        <div>
                                            <div class="mb-2 text-gray-500">Họ và tên</div>
                                            <div class="mb-4">{userData?.userName}</div>
                                            <div class="mb-2 text-gray-500">Địa chỉ email</div>
                                            <div class="mb-4">{userData?.userEmail}</div>
                                            {/* <div class="mb-2 text-gray-500">Số CMND/CCCD</div>
                                            <div class="mb-4">079303041653</div> */}
                                            <div class="mb-2 text-gray-500">Số điện thoại liên hệ</div>
                                            <div class="mb-4">{userData?.userPhoneNumber}</div>
                                            <div class="mb-2 text-gray-500">Địa chỉ</div>
                                            <div class="mb-4">{userData?.userPhoneNumber}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {currentTab === 'locationinfo' && (
                                <div class="border border-gray-200 rounded-b-lg p-4">
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <div class="mb-2 text-gray-500">Mã địa điểm</div>
                                        <div class="mb-4">{booking._id}</div>
                                        <div class="mb-2 text-gray-500">Loại</div>
                                        <div className="mb-4">
                                            {
                                                locationData?.category?.id === 'hotel' ? 'Khách sạn' :
                                                locationData?.category?.id === 'homestay' ? 'Homestay' :
                                                locationData?.category?.id === 'guest_home' ? 'Nhà nghỉ' :
                                                'Danh mục không xác định'
                                            }
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <div class="mb-2 text-gray-500">Tên địa điểm</div>
                                        <div class="mb-4">{locationData.name}</div>
                                        <div class="mb-2 text-gray-500">Địa chỉ</div>
                                        <div class="mb-4">{locationData.address}</div>
                                        <div class="mb-2 text-gray-500">Ngày đăng ký kinh doanh</div>
                                        <div class="mb-4">{moment(locationData.dateCreated).format('DD/MM/YYYY HH:mm:ss')}</div>
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