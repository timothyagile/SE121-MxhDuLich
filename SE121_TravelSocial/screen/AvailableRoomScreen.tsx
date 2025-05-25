import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert, Platform, Modal, FlatList, Dimensions } from 'react-native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { iconMapping } from '../constants/icon';
import { RootStackParamList } from '@/types/navigation';
import { API_BASE_URL } from '../constants/config';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import ServiceOption2 from '@/components/DetailScreen/ServiceOption2';
import { useUser } from '../context/UserContext';
import { trackEvents } from '../constants/recommendation';

const { width } = Dimensions.get('window');


interface Room {
    _id: string;
    name: string;
    bedType: string;
    area: number; 
    quantity: number; 
    pricePerNight: number;
    nights:number;
    image: string[]; 
    description: string;
    checkinDate: Date;
    checkoutDate: Date;
    facility: {
        id: string;
        name: string; 
        description?: string; 
        icon: string;
    }[];
    bed: {
        category: string;
        icon: string;
        quantity: number;
    }[];
}

export default function AvailableRoomScreen({ navigation }: {navigation: NativeStackNavigatorProps}) {
    const route = useRoute<RouteProp<RootStackParamList, 'available-room-screen'>>();
    const { id, checkinDate, checkoutDate, serviceOfLocation } = route.params;
    const { userId } = useUser();
    console.log('checkin ddate: ', checkinDate, serviceOfLocation);
    const [date1, setDate1] = useState(checkinDate);
    const [date2, setDate2] = useState(checkoutDate);
    
    const [selectedDate1, setSelectedDate1] = useState('');
    const [selectedDate2, setSelectedDate2] = useState('');
    const [showPicker1, setShowPicker1] = useState(false);
    const [showPicker2, setShowPicker2] = useState(false);    
    const [rooms, setRooms] = useState<Room[]>([]);
    const [services, setServices] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalServiceVisible, setModalServiceVisible] = useState(false);
    const [selectedServices, setSelectedServices] = useState<any>([]);

    const [roomCount, setRoomCount] = useState(0);
    const [selectedRooms, setSelectedRooms] = useState(0);
    const [selectedRoomCounts, setSelectedRoomCounts] = useState<Record<string, number>>({});
    const [selectedServiceCounts, setSelectedServiceCounts] = useState(0);
    const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
    const [buttonText, setButtonText] = useState("Chọn");
    const [currentIndex, setCurrentIndex] = useState(0);

    const showDatePicker1 = () => {
        setShowPicker1(true);
    };
  
      const showDatePicker2 = () => {
        setShowPicker2(true);
    };

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

    const onScrollEnd = (e: any) => {
      const contentOffsetX = e.nativeEvent.contentOffset.x;
      const index = Math.round(contentOffsetX / width);
      setCurrentIndex(index);
    };

    const images = [
        require('../assets/images/room.jpg'),
        require('../assets/images/room.jpg'),
        require('../assets/images/room.jpg'),
    ];

    const getIcon = (iconName: string) => {
        return iconMapping[iconName] || iconMapping["default.png"];
    };

    useEffect(() => {
        const fetchAvailableRooms = async () => {
          try {
            const bookingResponse = await fetch(
              `${API_BASE_URL}/booking/getall`
            );
            const bookingData = await bookingResponse.json();
      
            if (Array.isArray(bookingData.data)) {
              const bookings = bookingData.data;
              console.log(bookings);

              const roomResponse = await fetch(
                `${API_BASE_URL}/room/getbylocationid/${id}`
              );
              const roomData = await roomResponse.json();
      
              if (Array.isArray(roomData.data)) {
                const rooms = roomData.data;


                const availableRooms = rooms.filter((room: any) => {
                  const isBooked = bookings.some((booking: any) => {
                    const bookingCheckin = new Date(booking.checkInDate).getTime();
                    const bookingCheckout = new Date(booking.checkOutDate).getTime();
                    
                    const userCheckin = new Date(checkinDate).getTime();
                    const userCheckout = new Date(checkoutDate).getTime();
                    // console.log('booking checkin: ',bookingCheckin);
                    // console.log('booking checkout: ',bookingCheckout);
                    // console.log('user checkin: ',userCheckin);
                    // console.log('user checkout: ',userCheckout);
                    
                    return (
                      room._id === booking?.items?.roomId && 
                      ((userCheckin >= bookingCheckin && userCheckin <= bookingCheckout) ||
                        (userCheckout >= bookingCheckin && userCheckout <= bookingCheckout))  
                    );
                  });
      
                  return !isBooked; 
                });
      
                setRooms(availableRooms); 
              }
            }
          } catch (error) {
            console.error('eError fetching rooms or bookings:', error);
          }
        };
      
        fetchAvailableRooms();
      }, [id, checkinDate, checkoutDate]);

    const handleApply = () => {
        {selectedRoomCounts[currentRoomId!] ? `Đã chọn ${selectedRoomCounts[currentRoomId!]} phòng` : "Chọn"}
        setModalVisible(false);
    };

    const handleApplyService = () => {
        {selectedRoomCounts[currentRoomId!] ? `Đã chọn ${selectedRoomCounts[currentRoomId!]} phòng` : "Chọn"}
        setModalServiceVisible(false);
    };
    
    const toggleModal = (roomId?: string) => {
        setCurrentRoomId(roomId || null);
        setModalVisible(!isModalVisible);
    };

    const toggleModalService = (roomId?: string) => {
        //setCurrentRoomId(roomId || null);
        setModalServiceVisible(!isModalServiceVisible);
    };

    const incrementRoomCount = (roomId: string) => {
        const room = rooms.find((r) => r._id === roomId); // Tìm thông tin phòng
        if (room) {
            const maxCount = room.quantity; // Lấy số lượng phòng có sẵn
            setSelectedRoomCounts((prevCounts) => {
                const currentCount = prevCounts[roomId] || 0;
                if (currentCount < maxCount) {
                    return {
                        ...prevCounts,
                        [roomId]: currentCount + 1,
                    };
                } else {
                    Alert.alert("Thông báo", `Chỉ còn ${maxCount} phòng khả dụng.`);
                    return prevCounts; // Không tăng nếu đã đạt giới hạn
                }
            });
        }
    };

    const decrementRoomCount = (roomId: string) => {
        setSelectedRoomCounts(prevCounts => {
            const currentCount = prevCounts[roomId] || 0;
            if (currentCount > 0) {
                return {
                    ...prevCounts,
                    [roomId]: currentCount - 1, 
                };
            }
            return prevCounts;
        });
    };

    type SelectedRoom = {
        roomId: string;
        count: number;
        roomDetails: {
          name: string;
          price: number;
          checkinDate: Date;
          checkoutDate: Date;
        };
    };    const handleConfirm = () => {
        const selectedRoomsData = Object.keys(selectedRoomCounts).map((roomId) => {
            const room = rooms.find((r) => r._id === roomId);
            return {
              roomId,
              count: selectedRoomCounts[roomId],
              roomDetails: {
                name: room?.name || '',
                price: room?.pricePerNight || 0,
                checkinDate: date1,
                checkoutDate: date2
              },
              nights: Math.abs((date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24)),
            };
        });

        if (selectedRoomsData.length === 0) {
            Alert.alert("Thông báo", "Vui lòng chọn ít nhất 1 phòng trước khi tiếp tục.");
            return;
        }
        const selectedServicesData = selectedServices.filter((service: any) => service.quantity > 0);

        // Track click event for the booking process
        if (userId && id) {
          trackEvents.click(userId, id, {
            action: 'proceed_to_booking',
            rooms_selected: selectedRoomsData.length,
            services_selected: selectedServicesData.length,
            checkin_date: date1.toISOString(),
            checkout_date: date2.toISOString()
          });
          console.log(`Tracked booking click event for user: ${userId}, location: ${id}`);
        }

        console.log('selectedServicesDataaaaa: ', selectedServicesData);
        navigation.navigate('reservation-required-screen', {
          selectedRoomsData,
          selectedServicesData: selectedServicesData,
          locationId: id,
        });
    };

    
    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.arrowleftbutton} onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/icons/arrowleft.png')} style={styles.arrowlefticon} />
                </TouchableOpacity>
                <View style ={{flexDirection:'row', alignItems:'center', alignContent:'center',justifyContent:'center', }}>
                    <View>
                        <Text style={{fontSize:18,fontWeight:'bold',}}>Phòng có sẵn</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.createButton}
                    onPress={handleConfirm}
                    >
                    <Text style={styles.createButtonText}>Xác nhận</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.body}>
                <View style={styles.container}>
                <View style={styles.body}>
                {rooms.map((room, index) => (
                    <View key={index} style={styles.roomcontainer}>
                        <View style={styles.imageCarousel}>
                            <FlatList
                                data={images}
                                horizontal={true}
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                <Image
                                    source={ item }
                                    style={styles.roomImage}
                                />
                                )}
                                onMomentumScrollEnd={onScrollEnd}
                            />
                            <View style={styles.pagination}>
                                {images.map((_, index) => (
                                <View
                                    key={index}
                                    style={[
                                    styles.dot,
                                    index === currentIndex ? styles.activeDot : styles.inactiveDot,
                                    ]}
                                />
                                ))}
                            </View>
                        </View>
                        <Text style={styles.title}>{room?.name || ''}</Text>
                        <Text style={styles.roomDescription}>
                            {room?.description || 'Mô tả phòng hiện chưa có'}
                        </Text>
                        <View style={styles.bedandarea}>
                            
                            {room.bed.map((bed, index) => (
                                <View key={index} style={styles.backgroundBox}>
                                    
                                        <Image style={{width:17, height:17}}  source={getIcon(bed.icon)}/>
                                        <Text style={styles.bed}>{bed.category} : {bed.quantity} </Text>
                                    
                                </View>
                            ))}
                            
                            <View style={styles.areacontainer}>
                                <Text style={styles.area}>Diện tích: </Text>
                                <Text style={styles.area}>{room.area} m²</Text>
                            </View>
                        </View>

                        <View style = {styles.bedandarea}>
                            <Image style={{width:17, height:17}} source={require('../assets/icons/service.png')}></Image>
                            <Text style={styles.area}>   Dịch vụ:</Text>
                        </View>

                        <View style={styles.featureContainer}>
                        
                            {room.facility.map((facility, index) => (
                                
                                <View key={index} style={styles.backgroundBox}>
                                    <Image
                                        
                                        source={getIcon(facility?.id)}
                                        style={{height:17, width:17, marginRight:3,}}
                                    />
                                    <Text style={styles.area}>{facility.name}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={styles.servicecontainer}>
                            <View style={styles.state}>
                                <Text style={styles.area}>Trạng thái: </Text>
                                <Text style={styles.statetext}>{room.quantity}</Text>
                                <Text style={styles.statetext}> phòng</Text>
                            </View>
                        </View>
                        
                        {/* <Text style={styles.chosedate}>Chọn ngày</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={[styles.inputContainer, {width:'44%', marginLeft: 13,}]}>
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
                            <View style={[styles.inputContainer,{width:'44%', marginRight: 13,}]}>
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
                            </View> */}

                        <View style={styles.endcontainer}>
                            <View style={{ flex: 4 }}>
                                <Text style={styles.area2}>Giá</Text>
                                <Text style={styles.pricetext}>{room.pricePerNight.toLocaleString('vi-VN')} VND</Text>
                            </View>
                            <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center' }}>    
                                <TouchableOpacity style={styles.choosebutton} onPress={() => toggleModal(room._id)}>
                                    <Text style={styles.choosetext}>
                                        {selectedRoomCounts[room._id] ? `Đã chọn ${selectedRoomCounts[room._id]} phòng` : "Chọn"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{  justifyContent: 'center', alignItems: 'center' }}>    
                                <TouchableOpacity style={[styles.choosebutton, {width: '90%', marginBottom: 20}]} onPress={() => toggleModalService(room._id)}>
                                <Text style={styles.choosetext}>
                                    {selectedServices.length > 0
                                    ? `Đã chọn ${selectedServices.reduce((total: any, item:any) => total + item.quantity, 0)} dịch vụ`
                                    : 'Dịch vụ kèm theo (tùy chọn)'}
                                </Text>
                                </TouchableOpacity>
                        </View>
                    </View>
                ))}

                </View>
                </View>  
                
            </ScrollView>

            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={()=>toggleModal()} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Chọn số lượng phòng</Text>
                        <View style={styles.modalBody}>
                            <Text style={styles.modalText}>Số lượng phòng</Text>
                            <View style={styles.counterContainer}>
                                <TouchableOpacity onPress={()=>decrementRoomCount(currentRoomId!)} style={styles.counterButton}>
                                    <Text style={styles.counterButtonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.counterValue}>{selectedRoomCounts[currentRoomId!] || 0}</Text>
                                <TouchableOpacity onPress={()=>incrementRoomCount(currentRoomId!)} style={styles.counterButton}>
                                    <Text style={styles.counterButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                            <Text style={styles.applyButtonText}>Xác nhận</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
            </Modal>

            <Modal visible={isModalServiceVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={()=>toggleModalService()} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Chọn dịch vụ kèm theo</Text>
                        <ScrollView>
                            <ServiceOption2 services={serviceOfLocation} selectedServicess={selectedServices} onChangeSelectedServices={setSelectedServices} />
                        </ScrollView>
                        <TouchableOpacity style={styles.applyButton} onPress={handleApplyService}>
                            <Text style={styles.applyButtonText}>Xác nhận</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E7E9F3',
    },

    body:{
    },

    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
      },
      dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 5,
      },
      activeDot: {
        backgroundColor: 'blue',
      },
      inactiveDot: {
        backgroundColor: 'gray',
      },

    imageCarousel: {
        width: '100%',
        height: 220,
        marginBottom: 16, 
      },
    roomImage: {
        marginStart:0,
        marginTop: 10,
        width: 394, 
        height: 190,
        borderRadius: 10,
        marginRight: 0, 
    },

    roomcontainer:{
        backgroundColor:'#FFFFFF',
        borderRadius:8,
        
        marginHorizontal:10,
        marginVertical:0,
        marginBottom:20,
    },

    title:{
        fontSize:20,
        fontWeight:'bold',
        marginLeft:20,
        marginTop:10,
        position:'absolute',
    },

    roomDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
        lineHeight: 20,
        marginLeft: 20,
    },

    bedandarea:{
        flexDirection: 'row',
        marginLeft:20,
        marginTop:20,
    },

    bed:{
        fontSize:14,
        marginLeft:10,
    },

    areacontainer:{
        flexDirection:'row',
        position:'absolute',
        right:20,
    },

    area:{
        fontSize:14,
        color: '#666',
    },

    area2:{
        fontSize: 14,
    },

    servicecontainer:{

    },

    featureContainer: {
        marginTop:10,
        marginLeft:10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    backgroundBox: {
        
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        padding: 5,
        margin: 5,
    },

    state:{
        width:170,
        marginTop:20,
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 5,
        margin: 5,
        shadowColor: '#196EEE',
        shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 2,
          shadowRadius: 4,
          elevation: 10,
    },

    inputContainer: {
        marginTop: 20,

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

    chosedate: {
        marginLeft:20,
        marginTop:20,
        fontSize:20,
        fontWeight:'bold',
    },

    statetext:{
        fontSize:14,
        color:'#196EEE',
        shadowColor: '#196EEE',
        shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 2,
          shadowRadius: 5,
          elevation: 10,
    },

    endcontainer:{
        marginTop:10,
        flexDirection:'row',
        marginLeft:20,
        marginBottom:20,
    },

    choosebutton:{
        borderRadius:10,
        backgroundColor: '#176FF2',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent:'center',
        width:200,
        height:50,
    },

    choosetext:{
        color:'white',
        fontSize: 22,
        fontWeight:'600',
    },

    pricetext:{
        color:'#2DD7A4',
        fontSize: 16 ,
        fontWeight:'600',
    },
    
    boxText:{

    },

    header: {
      
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
      width:'100%',
      position: 'relative',
      backgroundColor: '#ffffff', 
      paddingHorizontal:100,
      paddingVertical:40,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 2,
      shadowRadius: 4,
      elevation: 20,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },

    arrowleftbutton: {
        position: 'absolute',
        left: 10,
      },
      arrowlefticon: {
        width: 40,
        height: 40,
      },

      modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        maxHeight: '80%',
        // width: '80%',
        // backgroundColor: 'white',
        // borderRadius: 10,
        // padding: 20,
        // alignItems: 'center',
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5, // Đổ bóng trên Android
        shadowColor: '#000', // Đổ bóng trên iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    modalBody: {
        width: '100%',
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        marginVertical: 10,
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    counterButton: {
        backgroundColor: '#E7E9F3',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    counterButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    counterValue: {
        fontSize: 18,
        marginHorizontal: 10,
    },
    applyButton: {
        backgroundColor: '#176FF2',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    applyButtonText: {
        color: 'white',
        fontSize: 18,
    },

    createButton: {
        position: 'absolute',
        right: 10,
      },
      createButtonText: {
        color: '#196EEE',
        fontWeight: 'bold',
        fontSize: 16,
      }, 
});



