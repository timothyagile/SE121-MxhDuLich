import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Linking, TextInput, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Facility from '@/components/HomeScreen/Facility';
import axios from 'axios';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute,RouteProp } from '@react-navigation/native';
import {API_BASE_URL} from '../../constants/config';
import { Icon } from 'react-native-paper';
import {iconMapping} from '../../constants/icon';
import CustomModal from '@/components/CollectionScreen/AddIntoCollection';


const { width, height } = Dimensions.get('window');

const GOOGLE_MAPS_API_KEY = 'AIzaSyBeCTs9sMcGjsjlIIIiML2TXrLqOZSEY6s';
const ADDRESS = 'FFXQ+X94, Bung Riềng, Xuyên Mộc, Bà Rịa - Vũng Tàu, Vietnam';


type RootStackParamList = {
  'detail-screen': { id: string }; 
};

type LikedItems = {
  [key: string]: boolean;
};

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'detail-screen'>;

export default function DetailScreen({navigation} : {navigation : NativeStackNavigatorProps}) {
  const route = useRoute<DetailScreenRouteProp>();
  const { id } = route.params; 
  interface Service {
    _id: string;
    id: string;
    roomId: string;
    name: string;
    quantity: number;
    icon: string;
    description: string;
  }

  type FacilityIcons = {
    [key: string]: string; // Cho phép dùng các khóa kiểu string
};

  const getIcon = (iconName: string) => {
    return iconMapping[iconName] || iconMapping["default.png"];
  };


const facilityIcons: FacilityIcons = {
    "Wifi miễn phí": "wifi",
    "Máy lạnh": "ac-unit",
    "Kitchen": "Kitchen", 
    "Hồ bơi": "pool",
    "Lửa trái": "fire",
    "Bãi đỗ xe": "local-parking",
    "Nhà hàng": "restaurant",
    "Phòng gym": "fitness-center",
    "Spa": "spa",
    "Bar": "local-bar",
    "Dịch vụ khác": "help",
};
  
  const [services, setServices] = useState<Service[]>([]);  // Khai báo rõ ràng kiểu dữ liệu
  
  
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const [date1, setDate1] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [showPicker1, setShowPicker1] = useState(false);
    const [showPicker2, setShowPicker2] = useState(false);
    const [selectedDate1, setSelectedDate1] = useState('');
    const [selectedDate2, setSelectedDate2] = useState('');
    const [locationDetails, setLocationDetails] = useState<any>(null);
    //const [services, setServices] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState(0);
    const [roomsStatus, setRoomsStatus] = useState('');
    const [likedItems, setLikedItems] = useState<LikedItems>({});
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);


    const showDatePicker1 = () => {
      setShowPicker1(true);
    };

    const showDatePicker2 = () => {
      setShowPicker2(true);
    };
  
    // Hàm xử lý khi chọn ngày
    const onDateChange1 = (_: any, selected: Date | undefined) => {
      setShowPicker1(false);
      if (selected) {
        if (selected > date2) {
          Alert.alert("Lỗi", "Ngày checkin phải nhỏ hơn hoặc bằng ngày checkout.");
        } else {
          setDate1(selected);
          const formattedDate = selected.toLocaleDateString('vi-VN');
          setSelectedDate1(formattedDate);
        }
      }
    };

    const onDateChange2 = (_: any, selected: Date | undefined) => {
      setShowPicker2(false);
      if (selected) {
        // Kiểm tra nếu ngày checkout nhỏ hơn ngày checkin
        if (selected < date1) {
          Alert.alert("Lỗi", "Ngày checkout phải lớn hơn hoặc bằng ngày checkin.");
        } else {
          setDate2(selected);
          const formattedDate = selected.toLocaleDateString('vi-VN');
          setSelectedDate2(formattedDate);
        }
      }
    };

    const toggleLike = () => {
        

    };

    const handlePress = (id: string) => {
      setIsLiked(!isLiked);
      setLikedItems((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
      setSelectedLocationId(id);
      setModalVisible(true); 
    };

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    const getCoordinatesFromAddress = async (address: string) => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;

        try {
            const response = await axios.get(url);
            if (response.data.status === 'OK') {
                const location = response.data.results[0].geometry.location;
                setLatitude(location.lat);
                setLongitude(location.lng);
            } else {
                console.log('Không thể lấy tọa độ:', response.data.status);
            }
        } catch (error) {
            console.error('Lỗi khi gọi Geocoding API:', error);
        }
    };

    //Gọi hàm lấy tọa độ khi component được render
    // useEffect(() => {
    //     getCoordinatesFromAddress(ADDRESS);
    // }, []);

    useEffect(() => {
      console.log(locationDetails?.address)
      if (locationDetails?.address) {
          getCoordinatesFromAddress(locationDetails?.address);
      }
  }, [locationDetails]);

    const openMap = () => {
        if (latitude && longitude) {
            const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
            Linking.openURL(url).catch(err => console.error("Không thể mở Google Maps", err));
        } else {
            console.log('Tọa độ không khả dụng');
        }
    };

    useEffect(() => {
      if (id) {
        fetchLocationDetails(id); // Gọi API lấy thông tin chi tiết
      }
    }, [id]);

    useEffect(() => {
      if (locationDetails?._id) {
        fetchRoomServices(locationDetails._id); // Gọi API lấy danh sách dịch vụ
      }
    }, [locationDetails]);

    const fetchLocationDetails = async (id: string) => {
      try {
        const response = await fetch(`${API_BASE_URL}/locationbyid/${id}`);
        const data = await response.json();
        if (data.isSuccess) {
          console.log('Location details:', data.data);
          setLocationDetails(data.data);
        } else {
          console.error('API error:', data.error);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    const fetchRoomServices = async (locationId: string) => {
      try {
        console.log('locationid: ',locationId);
        const response = await fetch(`${API_BASE_URL}/room/getbylocationid/${locationId}`);
        const result = await response.json();
    
        if (result.isSuccess && result.data) {
          
          // Lấy danh sách dịch vụ từ tất cả các phòng
          console.log('room',result.data);
          const allServices = result.data.flatMap((room: any) => room.facility || []);
          console.log('service: ',allServices);
          const uniqueServices = Array.from(new Set(allServices.map((service: any) => service.name)))
                                  .map((name) => {
                                    return allServices.find((service: any) => service.name === name); // Lấy thông tin dịch vụ
                                  }); // Loại bỏ dịch vụ trùng lặp
          setServices(uniqueServices);
        } else {
          //console.error('Error fetching room services:', result.error);
        }

        const allPrices = result.data?.map((room:any) => room.price);
        const minPrice =Math.min(...allPrices);
        setMinPrice(minPrice);

        if (result.isSuccess && Array.isArray(result.data)){
          const availableRooms = result.data?.filter((room: any) => room?.quantity > 0);
        
          if (availableRooms.length > 0){
            setRoomsStatus('Còn phòng');
          } else {
            setRoomsStatus('Hết phòng');
          }
        } else {
          setRoomsStatus('Hết phòng');
        }



      } catch (error) {
        // console.error('Error fetching room services:', error);
      }
    };
  
  return (
    <ScrollView style={styles.container}>
      {/* Hình ảnh và nút quay lại */}
      <View style={styles.imageContainer}>
        <Image
        source={require('../../assets/images/bai-truoc-20.jpg')}
          style={[styles.image, ]}
        />
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#1E90FF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('chat-board-screen')} style={styles.messageButton}>
            <Image style={{width:30, height:30}} source={require('../../assets/icons/message.png')}></Image>
          {/* <FontAwesome name="message" size={24} color="#FF4500" /> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.heartButton} onPress={() => handlePress(id.toString())}>
          <FontAwesome name="heart" size={24}  color={isLiked ? "red" : "#000"} />
        </TouchableOpacity>
        <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)} onSelectCollection={(collectionId:any)=>console.log('selected:', collectionId)} selectedLocationId={selectedLocationId}></CustomModal>

      </View>

      {/* Thông tin địa điểm */}
      <View style={styles.infoSection}>
      <View style = {styles.header}>
        <Text style={styles.title}>{locationDetails?.name || 'Tên địa điểm'}</Text>
        <TouchableOpacity onPress={openMap} >
            <Text style = {styles.showMap}>Map</Text>
        </TouchableOpacity>
      </View>
        
        <View style={styles.rating}>
          <FontAwesome name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{locationDetails?.rating || '0'} ({locationDetails?.reviews || 0} Đánh giá)</Text>
        </View>
        <View>
        <Text style={styles.description}  
                numberOfLines={isExpanded ? undefined : 4}
                ellipsizeMode="tail">
                {locationDetails?.description || 'Mô tả chưa có sẵn.'}
            </Text>
            <TouchableOpacity onPress={toggleExpanded}>
                <Text style={styles.readMore}>
                    {isExpanded ? 'Show Less' : 'Read More'}
                </Text>
            </TouchableOpacity>

        </View>
        {/* Tiện ích */}
        <Text style={styles.facilityTitle}>Dịch vụ</Text>


        <View style={styles.facilityContainer}>
          {services.map((service, index) => (
            <View style={styles.facilityItem} key={index}>
                <Image source={getIcon(service?.id)}/>
              <Text style={styles.facilityText}>{service?.name}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
        <Text style={styles.title2}>Tìm phòng</Text>

        {/* Checkin Date - Checkout Date Input */}
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <View style={[styles.inputContainer, {width:'47%'}]}>
            
            <TouchableOpacity onPress={showDatePicker1}>
              <FontAwesome name="calendar" size={20} color="gray" style={styles.iconLeft} />
            </TouchableOpacity>
            <TextInput
              readOnly
              placeholder="Checkin"
              value={selectedDate1}
              style={styles.input}
            />
            {showPicker1 && (
              <DateTimePicker
                value={date1}
                mode="date"
                display="default"
                onChange={onDateChange1}
              />
            )}
          </View>
          <View style={[styles.inputContainer,{width:'47%'}]}>
            <TouchableOpacity onPress={showDatePicker2}>
              <FontAwesome name="calendar" size={20} color="gray" style={styles.iconLeft} />
            </TouchableOpacity>            
            <TextInput
              readOnly
              placeholder="Checkout"
              value={selectedDate2}
              style={styles.input}
            />
            {showPicker2 && (
              <DateTimePicker
                value={date2}
                mode="date"
                display="default"
                onChange={onDateChange2}
              />
            )}
          </View>
        </View>

        {/* Number of People  */}
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="gray" style={styles.iconLeft} />
          <TextInput
            placeholder="Số người"
            style={styles.input}
             keyboardType="numeric"
          />
          <FontAwesome name="chevron-down" size={20} color="gray" style={styles.iconRight} />
        </View>

        {/* Availability State */}
        {/* <View style={styles.stateContainer}>
          <Text style={styles.stateText}>Trang thái:</Text>
          <Text style={styles.stateBadge}>{roomsStatus}</Text>
        </View> */}

        {/* Search Button */}
        <TouchableOpacity onPress={()=> {
          console.log('Navigating with ID: ', locationDetails._id);
          navigation.navigate('available-room-screen', {
            id: locationDetails._id,
            checkinDate: date1, // Gửi ngày checkin
            checkoutDate: date2, // Gửi ngày checkout
          });}} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Tìm kiếm</Text>
        </TouchableOpacity>
      </View>

       {/* Feedback Section */}
       <View style={styles.section}>
        <Text style={styles.title2}>Phản hồi từ người dùng</Text>

        <View style={styles.feedbackContainer}>
          <View style={styles.avatarContainer}>
            <Image source={require('../../assets/images/avt.png')} style={styles.avatar} />
          </View>
          <View>
            <Text style={styles.customerName}>To Hoang Huy</Text>
          </View>
        </View>

        <Text style={styles.feedbackText}>
          “The location was perfect. The staff was friendly. Our bed was comfy. The pool was fresh with a great view. The breakfast was delicious! We had a hot tub on our balcony which was awesome.”
        </Text>   
      </View>

        {/* Giá và nút đặt */}
        <View style={styles.bookingSection}>
            <View>
                <Text style={styles.priceLabel}>Giá chỉ từ</Text>
                <Text style={styles.price}>{minPrice} VND</Text>
            </View>
          
          <TouchableOpacity onPress={()=> navigation.navigate('available-room-screen', {
            id: locationDetails._id,
            checkinDate: date1, // Gửi ngày checkin
            checkoutDate: date2, // Gửi ngày checkout
          })} style={styles.bookNowButton}>
            <Text style={styles.bookNowText}>Đặt ngay</Text>
            <FontAwesome size={20} name='arrow-right' style={styles.iconBookNow}></FontAwesome>
          </TouchableOpacity>
        </View>
      </View>   
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  imageContainer: {
    width: '100%',
    height: height * 0.4,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius:18,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 16,
    elevation: 5,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
},
  messageButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 16,
    elevation: 5,
  },
  heartButton: {
    position: 'absolute',
    bottom: -20,
    right: 16,
    width:50,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 25,
    elevation: 5,
    height:50,
    justifyContent:'center',
    alignItems:'center',
  },
  infoSection: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 4,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  readMore: {
    color: '#1E90FF',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  facilityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  facilityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  facilityItem: {
    alignItems: 'center',
    width:'22%',
    backgroundColor:'white',
    borderRadius:10,
    height: 60,
    justifyContent:'center',
    marginTop:10,
    
  },
  facilityText: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  bookingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceLabel: {
    fontSize: 18,
    color: '#555',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#32CD32',
  },
  bookNowButton: {
    flexDirection:'row',
    width:160,
    height: 60,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  bookNowText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:18,
  },

  iconBookNow :{
    color: 'white',
    marginLeft: 4
  },

  showMap: { 
    fontSize: 16,
    color: '#1E90FF',
    fontWeight: 'bold',
},

section: {
  marginTop:-10,
  marginBottom:40,
  
},
title2: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 12,
},

avatarContainer: {

  width: 50,
  height: 50,
  borderRadius: 50,
  marginRight:20,
  overflow: 'hidden',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F3F8FE', 
},
avatar: {
  width: '100%',
  height: '100%',
  resizeMode: 'cover', 
},

inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  marginBottom: 12,
  paddingLeft: 10,
  paddingRight: 10,
},
input: {
  flex: 1,
  padding: 10,
},
iconLeft: {
  marginRight: 10,
},
iconRight: {
  marginLeft: 10,
},
stateContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
},
stateText: {
  marginRight: 8,
  fontSize: 16,
},
stateBadge: {
  backgroundColor: '#ebf4ff',
  color: '#1e90ff',
  paddingHorizontal: 12,
  paddingVertical: 4,
  borderRadius: 16,
  fontSize: 14,
},
searchButton: {
  backgroundColor: '#1e90ff',
  borderRadius: 8,
  paddingVertical: 12,
  alignItems: 'center',
},
searchButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},
feedbackContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 12,
},
profilePicture: {
  width: 50,
  height: 50,
  borderRadius: 25,
  marginRight: 12,
},
customerName: {
  fontWeight: 'bold',
  fontSize: 16,
},
feedbackText: {
  color: '#4a4a4a',
  fontSize: 14,
  lineHeight: 20,
},
});
