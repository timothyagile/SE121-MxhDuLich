import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Linking, TextInput, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Facility from '@/components/HomeScreen/Facility';
import axios from 'axios';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import DateTimePicker from '@react-native-community/datetimepicker';


const { width, height } = Dimensions.get('window');

const GOOGLE_MAPS_API_KEY = 'AIzaSyBeCTs9sMcGjsjlIIIiML2TXrLqOZSEY6sxoacainaymoixaiduoc';
const ADDRESS = 'FFXQ+X94, Bung Riềng, Xuyên Mộc, Bà Rịa - Vũng Tàu, Vietnam';

export default function DetailScreen({navigation} : {navigation : NativeStackNavigatorProps}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const [date1, setDate1] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [showPicker1, setShowPicker1] = useState(false);
    const [showPicker2, setShowPicker2] = useState(false);
    const [selectedDate1, setSelectedDate1] = useState('');
    const [selectedDate2, setSelectedDate2] = useState('');

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
        setIsLiked(!isLiked);
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

    // Gọi hàm lấy tọa độ khi component được render
    // useEffect(() => {
    //     getCoordinatesFromAddress(ADDRESS);
    // }, []);

    const openMap = () => {
        if (latitude && longitude) {
            const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
            Linking.openURL(url).catch(err => console.error("Không thể mở Google Maps", err));
        } else {
            console.log('Tọa độ không khả dụng');
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
        <TouchableOpacity style={styles.heartButton} onPress={toggleLike}>
          <FontAwesome name="heart" size={24}  color={isLiked ? "red" : "#000"} />
        </TouchableOpacity>
      </View>

      {/* Thông tin địa điểm */}
      <View style={styles.infoSection}>
      <View style = {styles.header}>
        <Text style={styles.title}>Hồ Cốc - Vũng Tàu</Text>
        <TouchableOpacity onPress={openMap} >
            <Text style = {styles.showMap}>Map</Text>
        </TouchableOpacity>
      </View>
        
        <View style={styles.rating}>
          <FontAwesome name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>4.5 (355 Đánh giá)</Text>
        </View>
        <View>
        <Text style={styles.description}  
                numberOfLines={isExpanded ? undefined : 4}
                ellipsizeMode="tail">
            Du lịch Hồ Cốc là một địa điểm cấm trại vô cùng nổi tiếng với các dịch vụ giá rẻ, phù hợp với mọi đối tượng từ sinh viên đến người đã đii làm. Với mức giá phải chăng, Hồ Cốc mang lại một trải nghiệm tuyệt vời cho khách du lịch với các hoạt động như lửa trại, BBQ, tắm biển,... Khách hàng còn được trải nghiệm chèo sup ở Hồ Cốc - một hồ nước ngọt ngay cạnh bên khu cắm trại. Còn chần chờ gì nữa mà không thử ngay.     
            </Text>
            <TouchableOpacity onPress={toggleExpanded}>
                <Text style={styles.readMore}>
                    {isExpanded ? 'Show Less' : 'Read More'}
                </Text>
            </TouchableOpacity>

        </View>
        
        {/* <TouchableOpacity>
          <Text style={styles.readMore}>Read more</Text>
        </TouchableOpacity> */}

        {/* Tiện ích */}
        <Text style={styles.facilityTitle}>Dịch vụ</Text>
        <View style={styles.facilityContainer}>
          <View style={styles.facilityItem}>
            <FontAwesome name="fire" size={24} color="#555" />
            <Text style={styles.facilityText}>Lửa trại</Text>
          </View>
          <View style={styles.facilityItem}>
            <FontAwesome name="fire" size={24} color="#555" />
            <Text style={styles.facilityText}>Dinner</Text>
          </View>
          <View style={styles.facilityItem}>
            <FontAwesome name="fire" size={24} color="#555" />
            <Text style={styles.facilityText}>1 Tab</Text>
          </View>
          <View style={styles.facilityItem}>
            <FontAwesome name="fire" size={24} color="#555" />
            <Text style={styles.facilityText}>Pool</Text>
          </View>
           <View style={styles.facilityItem}>
            <FontAwesome name="fire" size={24} color="#555" />
            <Text style={styles.facilityText}>Pool</Text>
          </View>
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

        {/* Number of People Input */}
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
        <View style={styles.stateContainer}>
          <Text style={styles.stateText}>Trang thái:</Text>
          <Text style={styles.stateBadge}>Có sẵn</Text>
        </View>

        {/* Search Button */}
        <TouchableOpacity onPress={()=>navigation.navigate('available-room-screen')} style={styles.searchButton}>
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
                <Text style={styles.price}>500.000 VND</Text>
            </View>
          
          <TouchableOpacity onPress={()=> navigation.navigate('reservation-required-screen')} style={styles.bookNowButton}>
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
    fontSize: 14,
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
