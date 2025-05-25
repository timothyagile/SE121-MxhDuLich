import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert, Platform, Linking, ActivityIndicator, Modal } from 'react-native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { RadioButton } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RouteParams } from 'expo-router';
import { RootStackParamList } from '@/types/navigation';
import {API_BASE_URL} from '../constants/config';
import { useUser } from '../context/UserContext';
import { trackEvents } from '../constants/recommendation';

type ReservationRouteProp = RouteProp<RootStackParamList, 'reservation-required-screen'>;

interface RoomDetails {
    name: string;
    price: number;
    checkinDate: Date;
    checkoutDate: Date;
    pricePerNight: number;
}

interface SelectedRoomData {
    count: number;
    roomDetails: RoomDetails;
    roomId: string;
    nights: number;
}

export default function ReservationRequiredScreen({ navigation }: {navigation: NativeStackNavigatorProps}) {
    const route = useRoute<ReservationRouteProp>();
    const { selectedRoomsData,selectedServicesData ,locationId } = route.params;
    const { userId } = useUser();

    const formatRoomDate = (date: Date): string => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };
    //console.log('xxx:',selectedRoomsData);
    const roomList = selectedRoomsData.map((room) => ({
        id: room.roomId,
        name: room.roomDetails.name,
        price: room.roomDetails.price,
        checkinDate: room.roomDetails.checkinDate,
        checkoutDate: room.roomDetails.checkoutDate,
        count: room.count,
    }));
    //console.log('selected room dataa: ',selectedRoomsData);

    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [name, setName] = useState({ firstName: '', lastName: '' });
    const [phoneNumber, setPhoneNumber] = useState('');
    const [displayName, setDisplayName] = useState({ firstName: '', lastName: '' });
    const [displayPhoneNumber, setDisplayPhoneNumber] = useState('');
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [checked, setChecked] = useState('first');
    const [locationDetails, setLocationDetails] = useState<any>(null);
    const [selectedVoucher, setSelectedVoucher] = useState<any>(null);
    const [voucherList, setVoucherList] = useState<any[]>([]);
    const [voucherDetail, setVoucherDetail] = useState<any>(null);
    const [showVoucherModal, setShowVoucherModal] = useState(false);
   

    const totalRooms = selectedRoomsData.reduce((sum, room) => sum + room.count, 0);

    const roomPrice = selectedRoomsData.reduce(
        (sum, room) => sum + room.roomDetails.price * room.count * room.nights,
        0
      );

      const calculateTotal = () => {
        //console.log('selectedServicesData:', selectedServicesData);
        return selectedServicesData?.reduce((total: any, item: any) => {
          return total + item.quantity * item.service.price;
        }, 0);
      };

    
    const servicePrice = calculateTotal();
    //   const cleaningFee = 15000.0;
    //   const serviceFee = roomPrice * 0.01;
      const tax = roomPrice * 0.08;
      const totalPrice = roomPrice +  tax + servicePrice;

      const [displayedTotalPrice, setDisplayedTotalPrice] = useState(totalPrice);
    
      const fetchLocationDetails = async (id: string) => {
        try {
          const response = await fetch(`${API_BASE_URL}/locationbyid/${locationId}`);
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
    
      useEffect(() => {
        if (locationId) {
          fetchLocationDetails(locationId);
        }
      }, [locationId]);

    useEffect(() => {
        console.log('Received Rooms:', selectedRoomsData);
      }, [selectedRoomsData]);

      useEffect(() => {
        const fetchVouchers = async () => {
          try {
            const res = await fetch(`${API_BASE_URL}/voucher/getall`);
            const data = await res.json();
            if (data.isSuccess) setVoucherList(data.data || []);
          } catch (e) { console.log('Lỗi lấy voucher', e); }
        };
        fetchVouchers();
      }, []);

      const handleSelect = (option: string) => {
        setSelectedOption(option);
        setChecked(option);
        if (option === 'first') {
          setDisplayedTotalPrice(totalPrice); // Trả toàn bộ
        } else if (option === 'second') {
          setDisplayedTotalPrice(totalPrice / 2); // Trả một nửa
        }
      };



    const handleSave = (field: string) => {
        if (field === 'name') {
            setDisplayName({ firstName: name.firstName, lastName: name.lastName }); 
        } else if (field === 'phoneNumber') {
            setDisplayPhoneNumber(phoneNumber);
        }
        setIsEditing(null);
    };

    const handlePhoneNumberChange = (text: string) => {
        setPhoneNumber(text);
    };



    const renderField = (field: string) => {
        switch (field) {
        case 'name':
            return isEditing === 'name' ? (
            <>
                <TextInput
                style={styles.input}
                value={name.firstName}
                onChangeText={(text) => setName({ ...name, firstName: text })}
                placeholder="Họ"
                />
                <TextInput
                style={styles.input}
                value={name.lastName}
                onChangeText={(text) => setName({ ...name, lastName: text })}
                placeholder="Tên"
                />
                <TouchableOpacity style={styles.saveButton} onPress={() => handleSave('name')}>
                <Text style={styles.saveButtonText}>Lưu</Text>
                </TouchableOpacity>
            </>
            ) : (
            <Text style={styles.secondtext0}>{`${name.firstName} ${name.lastName}`}</Text>
            );
        case 'phoneNumber':
            return isEditing === 'phoneNumber' ? (
            <>
                <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                keyboardType="phone-pad"
                />
                <TouchableOpacity style={styles.saveButton} onPress={() => handleSave('phoneNumber')}>
                <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </>
            ) : (
                <Text style={styles.secondtext0}>{displayPhoneNumber || phoneNumber}</Text>
            );
        default:
            return null;
        }
    };

    // Hàm kiểm tra voucher hợp lệ
const verifyVoucher = async (voucher: any) => {
  try {
    const res = await fetch(`${API_BASE_URL}/voucher/getbycode/${voucher.code}`);
    const data = await res.json();
    if (!data || !data.data) return false;
    const v = data.data;
    const now = new Date();
    if (v.status !== 'active') return false;
    if (now < new Date(v.startDate) || now > new Date(v.endDate)) return false;
    if (v.usesCount >= v.maxUse) return false;
    if (v.minOderValue && totalPrice < v.minOderValue) return false;
    return true;
  } catch (e) {
    return false;
  }
};

// Khi chọn voucher, kiểm tra hợp lệ
const handleSelectVoucher = async (voucher: any) => {
  const valid = await verifyVoucher(voucher);
  if (!valid) {
    Alert.alert('Voucher không hợp lệ', 'Voucher đã hết hạn, hết lượt dùng hoặc không đủ điều kiện.');
    return;
  }
  setSelectedVoucher(voucher);
};


    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.arrowleftbutton} onPress={() => navigation.goBack()}>
                <Image source={require('../assets/icons/arrowleft.png')} style={styles.arrowlefticon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Yêu Cầu Đặt Chỗ</Text>
            </View>
            <ScrollView>
            <View style={{flexDirection:'row'}}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: locationDetails?.image?.[0].url }} style={styles.image} />
                </View>
                <View style ={styles.textContainer}>
                    <Text style= {styles.title}>{locationDetails?.name || 'Tên địa điểm'}</Text>

                    <View style={styles.detailsContainer}>
                        <View style={styles.ratingBox}>
                            <Image source = {require('../assets/icons/star.png')} style={{height:20, width:20, marginRight:3,}}></Image>
                            <Text style={styles.boxText}>{locationDetails?.rating || 4}</Text>
                        </View>
                        <View style={styles.featureBox}>
                            <Image source={require('../assets/icons/clock.png')} style ={{marginRight:3,}}></Image>
                            <Text style={styles.boxText}>mễn phí hủy trong 24h</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style ={{width:'100%', height:10, backgroundColor:'#E0DCDC', marginVertical:10, }}></View>
            <View style={styles.bookingcontainer}>
                <Text style={styles.yourbooking}>Booking của bạn</Text>
                <View style={{flexDirection:'row', alignItems:'center', marginTop:10,}}>
                    <Text style={styles.firsttext}>Ngày</Text>
                    <Text style={styles.secondtext}>
                        {selectedRoomsData.length > 0
                        ? `${formatRoomDate(selectedRoomsData[0].roomDetails.checkinDate)} - ${formatRoomDate(selectedRoomsData[0].roomDetails.checkoutDate)}`
                        : "No room selected"}
                    </Text>
                </View>
                {/* <View style={{flexDirection:'row', alignItems:'center', marginTop:10,}}>
                    <Text style={styles.firsttext}>Số người</Text>
                    <Text style={styles.secondtext}>4</Text>
                </View> */}
                <View style={{flexDirection:'row', alignItems:'center', marginTop:10,}}>
                    <Text style={styles.firsttext}>Số phòng</Text>
                    <Text style={styles.secondtext}>{totalRooms}</Text>
                </View>
                {selectedRoomsData.map((room, index) => (
                <View key={index} style={{flexDirection:'row', marginTop: 10 }}>
                    <Text style={styles.firsttext}>         {room.roomDetails.name}</Text>
                    <Text style={styles.secondtext}>{room.count}   phòng</Text>
                </View>
                ))}
                <View style={{flexDirection:'row', alignItems:'center', marginTop:10,}}>
                    <Text style={styles.firsttext}>Số dịch vụ</Text>
                    <Text style={styles.secondtext}>{selectedServicesData.reduce((total: any, item:any) => total + item.quantity, 0)}</Text>
                </View>
                {selectedServicesData.map((service : any, index: any) => (
                <View key={index} style={{flexDirection:'row', marginTop: 10 }}>
                    <Text style={styles.firsttext}>         {service.service?.name}</Text>
                    <Text style={styles.secondtext}>{service.quantity}   {service.service.unit}</Text>
                </View>
                ))}
            </View>

            <View style ={{width:'100%', height:10, backgroundColor:'#E0DCDC', marginVertical:10, }}></View>
            <View style={styles.bookingcontainer}>
                <Text style={styles.yourbooking}>Chi tiết giá</Text>
                <View style={{flexDirection:'row', alignItems:'center', marginTop:10,}}>
                    {/* <Text style={styles.firsttext}>$50 x 2</Text>
                    <Text style={styles.secondtext1}>$100.00</Text> */}
                    <Text style={styles.firsttext}>Phòng ({totalRooms} phòng)</Text>
                    <Text style={styles.secondtext1}>{roomPrice.toLocaleString('vi-VN')} VND</Text>
                </View>
                {/* <View style={{flexDirection:'row', alignItems:'center', marginTop:10,}}>
                    <Text style={styles.firsttext}>Phí dọn dẹp</Text>
                    <Text style={styles.secondtext1}>{cleaningFee.toFixed(0)} VND</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', marginTop:10,}}>
                    <Text style={styles.firsttext}>Phí dịch vụ</Text>
                    <Text style={styles.secondtext1}>{serviceFee.toFixed(0)} VND</Text>
                </View> */}
                <View style={{flexDirection:'row', alignItems:'center', marginTop:10,}}>
                    <Text style={styles.firsttext}>Dịch vụ kèm theo</Text>
                    <Text style={styles.secondtext1}>{calculateTotal()?.toLocaleString('vi-VN')} VND</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', marginTop:10,}}>
                    <Text style={styles.firsttext}>Thuế</Text>
                    <Text style={styles.secondtext1}>{tax.toLocaleString('vi-VN')} VND</Text>
                </View>

                <View style ={{width:'100%', height:1, backgroundColor:'#E0DCDC', marginVertical:10, }}></View>
                
                <View style={{flexDirection:'row', alignItems:'center', marginTop:10,}}>
                    <Text style={styles.firsttext}>Tổng cộng</Text>
                    <Text style={styles.secondtext1}>{totalPrice.toLocaleString('vi-VN')} VND</Text>
                </View>
            </View>

            <View style ={{width:'100%', height:10, backgroundColor:'#E0DCDC', marginVertical:10, }}></View>
            <View style={styles.bookingcontainer}>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.yourbooking}>Phương thức thanh toán</Text>
                    <Text style={{color:'red', fontSize:20, marginLeft:5}}>*</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', marginTop:10,}}>
                    <Text style={styles.firsttext}>Trả hết</Text>
                    <Text style={styles.secondtext}>({totalPrice.toLocaleString('vi-VN')} VND)</Text>
                    <View style={{position:'absolute', right:0,}}>
                        <RadioButton
                        value="first"
                        status={checked === 'first' ? 'checked' : 'unchecked'}
                        onPress={() => handleSelect('first')}
                        />
                    </View>
                    
                </View>
                <View style={{flexDirection:'row', alignItems:'center', marginTop:10,}}>
                    <Text style={styles.firsttext}>Trả một nửa</Text>
                    <Text style={styles.secondtext}>{(totalPrice / 2).toLocaleString('vi-VN')} VND</Text>
                    <View style={{position:'absolute', right:0,}}>
                        <RadioButton
                        value="second"
                        status={checked === 'second' ? 'checked' : 'unchecked'}
                        onPress={() => handleSelect('second')}
                        />
                    </View>
                    
                </View>
                <Text style={{width:'60%',}}>Cần trả {(totalPrice / 2).toLocaleString('vi-VN')} VND hôm nay và còn lại vào ngày {formatRoomDate(selectedRoomsData[0].roomDetails.checkinDate)}</Text>
                
            </View>

            <View style ={{width:'100%', height:10, backgroundColor:'#E0DCDC', marginVertical:10, }}></View>
            
            <View style={styles.bookingcontainer}>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.yourbooking}>Thông tin liên lạc</Text>
                    <Text style={{color:'red', fontSize:20, marginLeft:5}}>*</Text>
                </View>
                <TouchableOpacity 
                style={styles.rowwithicon}         
                onPress={() => setIsEditing(isEditing === 'phoneNumber' ? null : 'phoneNumber')}
                >
                    <Text style={styles.firsttext}>{phoneNumber ? phoneNumber : 'Số điện thoại'}</Text>
                    <Image
                        source={isEditing === 'phoneNumber'
                            ? require('../assets/icons/arrowdown.png')
                            : require('../assets/icons/arrowright.png')}
                        style={styles.arrowIcon}
                    />                    
                </TouchableOpacity>
                {isEditing === 'phoneNumber' && renderField('phoneNumber')}
                <TouchableOpacity
                style={styles.rowwithicon} 
                onPress={() => setIsEditing(isEditing === 'name' ? null : 'name')}
                >
                    <Text style={styles.firsttext}>{name.firstName || name.lastName ? `${name.firstName} ${name.lastName}` : 'Tên'}</Text>
                    <Image
                        source={isEditing === 'name'
                            ? require('../assets/icons/arrowdown.png')
                            : require('../assets/icons/arrowright.png')}
                        style={styles.arrowIcon}
                    />                   
                    </TouchableOpacity>
                {isEditing === 'name' && renderField('name')}

            </View>

            <View style ={{width:'100%', height:10, backgroundColor:'#E0DCDC', marginVertical:10, }}></View>
            <View style={styles.bookingcontainer}>
            <View style={{flexDirection:'row'}}>
                    <Text style={styles.yourbooking}>Lưu ý</Text>
                    <Text style={{color:'red', fontSize:20, marginLeft:5}}>*</Text>
                </View>
            </View>
            
            <View style={{width:'100%', marginVertical:20,}}>                <View style = {{  alignItems:'center', justifyContent:'center',alignContent:'center',width:'100%'}}>
                    
                    <TouchableOpacity 
                        style={styles.addpaymentmethod2} 
                        onPress={() => {
                            // Track booking event (proceeding to payment)
                            if (userId && locationId) {
                                trackEvents.click(userId, locationId, {
                                    action: 'proceed_to_payment',
                                    total_price: displayedTotalPrice,
                                    rooms_count: selectedRoomsData.length,
                                });
                                console.log(`Tracked payment click event for user: ${userId}, location: ${locationId}`);
                            }
                            
                            navigation.navigate('payment-method-screen',{
                                locationId: locationId,
                                totalPrice: displayedTotalPrice,
                                selectedRoomsData: selectedRoomsData,
                                selectedVoucher: selectedVoucher ? selectedVoucher.code : null,
                            });
                        }} 
                    >
                        <Text style={styles.boxText3}>Tiếp tục để thanh toán</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.bookingcontainer}>
                <Text style={styles.yourbooking}>Chọn voucher</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: 10}}>
                  {voucherList.map((voucher) => (
                    <TouchableOpacity
                      key={voucher._id}
                      style={{
                        backgroundColor: selectedVoucher?._id === voucher._id ? '#176FF2' : '#eee',
                        padding: 10, borderRadius: 10, marginRight: 10,
                      }}
                      onPress={async () => {
                        setVoucherDetail(voucher);
                        setShowVoucherModal(true);
                      }}
                    >
                      <Text style={{color: selectedVoucher?._id === voucher._id ? '#fff' : '#000'}}>{voucher.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
            </View>
            {/* Modal hiển thị chi tiết voucher */}
<Modal
  visible={showVoucherModal}
  transparent
  animationType="slide"
  onRequestClose={() => setShowVoucherModal(false)}
>
  <View style={{flex:1, backgroundColor:'rgba(0,0,0,0.4)', justifyContent:'center', alignItems:'center'}}>
    <View style={{backgroundColor:'#fff', borderRadius:16, padding:24, width:'80%'}}>
      <Text style={{fontWeight:'bold', fontSize:20, marginBottom:8}}>Chi tiết voucher</Text>
      {voucherDetail && (
        <>
          <Text style={{fontSize:16, marginBottom:4}}>Tên: {voucherDetail.name}</Text>
          <Text style={{fontSize:16, marginBottom:4}}>Mã: {voucherDetail.code}</Text>
          <Text style={{fontSize:16, marginBottom:4}}>Giảm: {voucherDetail.discountValue}{voucherDetail.discountType === 'percent' ? '%' : ' VND'}</Text>
          <Text style={{fontSize:16, marginBottom:4}}>Điều kiện: Đơn tối thiểu {voucherDetail.minOderValue?.toLocaleString('vi-VN') || 0} VND</Text>
          <Text style={{fontSize:16, marginBottom:4}}>Hiệu lực: {voucherDetail.startDate ? new Date(voucherDetail.startDate).toLocaleDateString() : ''} - {voucherDetail.endDate ? new Date(voucherDetail.endDate).toLocaleDateString() : ''}</Text>
          <Text style={{fontSize:16, marginBottom:4}}>Số lượt còn lại: {voucherDetail.maxUse - voucherDetail.usesCount}</Text>
        </>
      )}
      <View style={{flexDirection:'row', justifyContent:'flex-end', marginTop:16}}>
        <TouchableOpacity onPress={() => setShowVoucherModal(false)} style={{marginRight:16}}>
          <Text style={{color:'#176FF2', fontWeight:'bold'}}>Đóng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            if (voucherDetail) {
              const valid = await verifyVoucher(voucherDetail);
              if (!valid) {
                Alert.alert('Voucher không hợp lệ', 'Voucher đã hết hạn, hết lượt dùng hoặc không đủ điều kiện.');
                return;
              }
              setSelectedVoucher(voucherDetail);
              setShowVoucherModal(false);
            }
          }}
        >
          <Text style={{color:'#fff', backgroundColor:'#176FF2', paddingHorizontal:16, paddingVertical:8, borderRadius:8, fontWeight:'bold'}}>Áp dụng</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

            </ScrollView>
        </View>  
);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },

    bookingcontainer:{
        marginLeft:20,
        marginTop:10,
        marginBottom:10,
        marginRight:10,
    },

    yourbooking:{
        fontSize:20,
        fontWeight:'bold',
    },

    firsttext:{
        fontSize:20,
        
    },

    secondtext:{
        fontSize:20,
        opacity: 0.6,
        marginLeft:20,
        
    },

    secondtext1:{
        fontSize:20,
        opacity: 0.6,
        marginLeft:20,
        position:'absolute',
        right:20,
    },

    rowwithicon:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop:5,
    },

    arrowIcon:{
        marginRight:10,
    
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

      imageContainer: {
        marginLeft:20,
        width: 130,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        flexShrink: 1,
        flexWrap: 'wrap',
    },

    detailsContainer: {
        position:'absolute',
        flexDirection: 'row',
        bottom: 0,
    },
    ratingBox: {
        flexDirection: 'row',
        backgroundColor: '#FFFFE9',
        padding: 10,
        borderRadius: 20,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    featureBox: {
        flexDirection:'row',
        borderRadius:20,
        backgroundColor: '#FFFFE9',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    boxText:{

    },

    boxText3:{
        color:'white',
        fontWeight:'900',
        fontSize:22,
    },

    addpaymentmethod:{
        borderRadius:20,
        backgroundColor: '#176FF2',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent:'center',
        width:200,
        shadowColor: '#176FF2',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 2,
        shadowRadius: 4,
        elevation: 20,
    },

    addpaymentmethod2:{
        
        borderRadius:60,
        backgroundColor: '#176FF2',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent:'center',
        width:'85%',
        height:60,
    },


    firsttext0:{
        fontSize:20,
        opacity:0.8,
        marginLeft:0,
      },
    
      edittext:{
        marginRight:0,
        fontSize:22,
        textDecorationLine:'underline',
        opacity:0.7,
      },
    
      secondtext0:{
        marginTop:10,
        fontSize:20,
        marginLeft:0,
      },
    
      input: {
        marginTop: 20,
        fontSize: 20,
        marginLeft: 0,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 8,
        borderRadius:8,
        marginBottom:5,
      },
      
      saveButton: {
        width:60,
        backgroundColor: 'blue',
        padding: 10,
        marginTop: 20,
        alignItems: 'center',
        borderRadius:5,
        marginBottom:10,
      },
      saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      },

});
