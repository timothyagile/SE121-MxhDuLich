import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert, Platform, Linking, ActivityIndicator } from 'react-native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParamList } from '@/types/navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import {API_BASE_URL} from '../constants/config';
import { useUser } from '@/context/UserContext';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Icon, IconButton } from 'react-native-paper';
import { trackEvents } from '../constants/recommendation';


type ReservationRouteProp = RouteProp<RootStackParamList, 'payment-method-screen'>;
interface Bank {
    
    appId: string;
    appLogo: string;
    appName: string;
    bankName: string;
    deeplink: string;
}



export default function PaymentMethodScreen({ navigation }: {navigation: NativeStackNavigatorProps}) {
    const route = useRoute<ReservationRouteProp>();
    const { locationId, totalPrice, selectedRoomsData } = route.params;
    console.log('roomdata in payment: ', selectedRoomsData);
    const {userId} = useUser(); 
    const [selectedButton, setSelectedButton] = useState<string | null>(null);
    const [locationDetails, setLocationDetails] = useState<any>(null);
    const [banks, setBanks] = useState<Bank[]>([]);
    const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
    const [loading, setLoading] = useState(true);
    const [qrImage, setQrImage] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false);
    

    const handlePress = (button: string) => {
        setSelectedButton(button);
        if (button === 'bank') {
            fetchBanks();
        }
        handleMomoPayment();
    };

    const handleMomoPayment = async () => {
        // const partnerCode = "MOMOXXXX"; 
        // const totalPrice = 50000; 
        // const orderId = "order12345"; 
        // const description = "Thanh toán TravelSocial";
    
        // const deeplink = `momo://?action=payWithApp&amount=${totalPrice}&orderId=${orderId}&description=${description}`;
        // try {
        //     await Linking.openURL(deeplink);
        // } catch (error) {
        //     Alert.alert('Lỗi', 'Không thể mở ứng dụng MoMo.');
        // }
    };


const generateVietQR = async () => {
    try {
        const response = await axios.post(
            'https://api.vietqr.io/v2/generate',
            {
                accountNo: "9386441295",
                accountName: "TO HOANG HUY",
                acqId: "970436",
                addInfo: "chuyen tien dat cho",
                amount: "2000",
                template: "compact",
            },
            {
                headers: {
                    'x-client-id': 'f905c745-0625-48e1-8468-e9d47ebb861c',
                    'x-api-key': '527eee5f-326f-4dd4-91ab-df80ba43329e',
                    'Content-Type': 'application/json',
                },
            }
        );

        setQrImage(response.data.qrDataURL);
        return response.data;
    } catch (error:any) {
        console.error('Error generating VietQR:', error.response?.data || error.message);
    }
};

useEffect(() => {
    if (qrImage) {
    }
}, [qrImage]); 

useEffect(()=>{
    handleGenerateQR();
},[])


const handleGenerateQR = async () => {
    const qrData = await generateVietQR();
    setQrImage(qrData.data.qrDataURL); 
};

const saveQRImageToGallery = async () => {
    try {
        if (!qrImage) {
            Alert.alert('QR Code không có dữ liệu!');
            return;
        }
        const base64Data = qrImage.split(',')[1];
        const fileUri = FileSystem.documentDirectory + 'vietqr.png';
        await FileSystem.writeAsStringAsync(fileUri, base64Data, {
            encoding: FileSystem.EncodingType.Base64,
        });
        const permission = await MediaLibrary.requestPermissionsAsync();

        if (permission.granted) {
            const asset = await MediaLibrary.createAssetAsync(fileUri);
            await MediaLibrary.createAlbumAsync('QR Codes', asset, false); 
            Alert.alert('Thành công!', 'Ảnh QR đã được lưu vào thư viện ảnh.');
        } else {
            Alert.alert('Không có quyền', 'Ứng dụng cần quyền truy cập vào thư viện ảnh.');
        }
    } catch (error) {
        console.error('Error saving QR Image to gallery:', error);
        Alert.alert('Lỗi', 'Không thể lưu ảnh QR vào thư viện ảnh.');
    }
};
    
    const fetchBanks = async () => {
        
        try {
            const response = await fetch('https://api.vietqr.io/v2/android-app-deeplinks');
            const data = await response.json();
            if (data && data.apps && Array.isArray(data.apps)) {
                setBanks(data.apps);
                setLoading(false);
            } else {
                Alert.alert('Lỗi', 'Dữ liệu ngân hàng không hợp lệ.');
                setLoading(false);
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể tải danh sách ngân hàng.');
        } 
    };
    const handlePress1 = (bank: Bank) => {
        setSelectedBank(bank);

    };

    const applyAndPay = async () => {
        // if (selectedBank) {
        //     Linking.openURL(selectedBank.deeplink).catch(err => 
        //         Alert.alert('Error', 'Không thể mở ứng dụng ngân hàng.')
        //     );
        // } else {
        //     Alert.alert('Error', 'Vui lòng chọn một ngân hàng trước khi thanh toán.');
        // }
        setIsSubmitting(true);

    try {
        if (selectedBank) {
            await Linking.openURL(selectedBank.deeplink).catch(err =>
                Alert.alert('Error', 'Không thể mở ứng dụng ngân hàng.')
            );
        }
        // Gọi API tạo booking
            await createBooking();
        } finally {
            setIsSubmitting(false);
        }
    };

    const fetchLocationDetails = async (id: string) => {
        try {
          console.log('locationid in payment: ',locationId);
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

    const createBooking = async () => {
        // const totalPriceAfterTax = Math.max(parseInt(totalPrice) * 0.08);
        try {
            // Cấu trúc dữ liệu gửi đi
            const bookingData = {
                // tax: 0.08,
                // totalPrice: totalPrice,
                userId: userId,
                // totalPriceAfterTax: totalPriceAfterTax,
                // tax: 0.04,
                // totalPrice: totalPrice,
                checkinDate: selectedRoomsData[0].roomDetails.checkinDate,
                checkoutDate: selectedRoomsData[0].roomDetails.checkoutDate,
                dateBooking:  new Date(),
                items: selectedRoomsData.map((room) => {
                    // Tính số đêm
                    const checkIn = new Date(room.roomDetails.checkinDate);
                    const checkOut = new Date(room.roomDetails.checkoutDate);
                    const checkInTime = checkIn.getTime();
                    const checkOutTime = checkOut.getTime();
                    const diffTime = checkOutTime - checkInTime; 
                    const night = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))); // Số ngày, tối thiểu là 1
    
                    return {
                        roomId: room.roomId,
                        // price: room.roomDetails.price,
                        quantity: room.count,
                        nights: night,
                    };
                }),
                // amountPaid: parseInt(totalPrice),
            };

            console.log('booking data: ',bookingData)
    
            const response = await fetch(`${API_BASE_URL}/booking/createbooking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });
    
            const result = await response.json();
            console.log('API response status:', response.status);
            console.log('API response data:', result);            if (result.isSuccess) {
                // Track successful booking event
                if (userId && locationId) {
                    trackEvents.book(userId, locationId, {
                        total_price: totalPrice,
                        check_in_date: selectedRoomsData[0].roomDetails.checkinDate.toISOString(),
                        check_out_date: selectedRoomsData[0].roomDetails.checkoutDate.toISOString(),
                        rooms_count: selectedRoomsData.reduce((sum, room) => sum + room.count, 0),
                        booking_id: result.data?._id || 'unknown'
                    });
                    console.log(`Tracked successful booking event for user: ${userId}, location: ${locationId}`);
                }
                
                Alert.alert('Thành công!', 'Đặt chỗ của bạn đã được tạo.');
                navigation.navigate('main-screen', { screen: 'Booking' }); 
            } else {
                Alert.alert('Lỗi!', result.message || 'Không thể tạo đặt chỗ.');
            }
        } catch (error) {
            console.error('Error creating booking:', error);
            Alert.alert('Lỗi!', 'Không thể kết nối với máy chủ.');
        }
    };

    
    

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.arrowleftbutton} onPress={() => navigation.goBack()}>
                <Image source={require('../assets/icons/arrowleft.png')} style={styles.arrowlefticon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Phương Thức Thanh Toán</Text>
            </View>

            <ScrollView>
                <View style={{flexDirection:'row'}}>
                    <View style={styles.imageContainer}>
                        <Image source={require('../assets/images/camping-ho-coc.png')} style={styles.image} />
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
                                <Text style={styles.boxText}>free cancel in 24h</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.container}>
                    <TouchableOpacity onPress={handleGenerateQR}>
                        
                    </TouchableOpacity>
                    {qrImage && (
                        <Image
                            source={{ uri: qrImage }}
                            style={styles.qrImage}
                            resizeMode="contain"
                        />
                    )}
                    <View style={{width:'100%', justifyContent:'center',alignItems:'center', marginTop: 5}}>
                        <TouchableOpacity style={{width:60, flexDirection: 'row', height:20, left: 20, justifyContent:'center'}} onPress={saveQRImageToGallery}>
                            <Text style ={{width:'100%',height:20, justifyContent:'center', alignItems:'center', fontSize:14, fontWeight:'700',}}>Lưu ảnh</Text>
                            <IconButton 
                                icon="download" 
                                size={20}
                                style={{ bottom: 15, right: 20}} 
                            />                        
                        </TouchableOpacity>
                    </View>                   
                </View>

                <View style={styles.imagesRow}>

                    <View style={{justifyContent:'center',alignItems:'center',}}>
                        <TouchableOpacity
                            style={[
                                styles.squareContainer,
                                selectedButton === 'bank' && styles.selectedSquareContainer
                            ]}
                            onPress={() => handlePress('bank')}
                        >
                            <Image source={require('../assets/images/bank.png')} style={styles.smallImage} />
                        </TouchableOpacity>
                        <Text style={{marginTop:10,}}>Bank</Text>
                    </View>

                    <View style={{justifyContent:'center',alignItems:'center',}}>
                        <TouchableOpacity
                            style={[
                                styles.squareContainer,
                                selectedButton === 'momo' && styles.selectedSquareContainer
                            ]}
                            onPress={() => handlePress('momo')}
                        >
                            <Image source={require('../assets/images/momo.png')} style={styles.smallImage} />
                        </TouchableOpacity>
                        <Text style={{marginTop:10,}}>Momo</Text>
                    </View>

                    <View style={{justifyContent:'center',alignItems:'center',}}>
                        <TouchableOpacity
                            style={[
                                styles.squareContainer,
                                selectedButton === 'credit-card' && styles.selectedSquareContainer
                            ]}
                            onPress={() => handlePress('credit-card')}
                        >
                            <Image source={require('../assets/images/credit-card.png')} style={styles.smallImage} />
                        </TouchableOpacity>
                        <Text style={{marginTop:10,}}>Credit-card</Text>
                    </View>
                    
                </View>

                <ScrollView style = {{marginTop:20, marginBottom: 130, height: 300}}>
                {selectedButton === 'bank' && ( 
                    loading ? ( 
                    <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <View style={styles.bankList}>
                            {banks.map((bank) => (
                                <TouchableOpacity
                                    key={bank.appId} 
                                    style={styles.bankItem}
                                    onPress={() => handlePress1(bank)}
                                >
                                    <Image source={{ uri: bank.appLogo }} style={styles.bankLogo} />
                                    <View>
                                        <Text style={styles.bankName}>{bank.bankName}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                    </ScrollView>
                <View style={{position:'absolute',bottom:20,width:'100%'}}>
                    <Text style={{marginLeft:30, fontSize:24, marginBottom:20,}}> Thanh toán {totalPrice} VND</Text>
                    <View style = {{  alignItems:'center', justifyContent:'center',alignContent:'center',width:'100%'}}>
                        
                    <TouchableOpacity
                        style={styles.addpaymentmethod2}
                        onPress={applyAndPay}
                        disabled={isSubmitting} // Vô hiệu hóa nút trong khi xử lý
                    >
                        {isSubmitting ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.boxText3}>Xác Nhận Thanh Toán</Text>
                        )}
                    </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },

    qrImage: {
        marginTop: 20,
        width: '100%',
        height: 200,
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
      width:'120%',
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

    boxText2:{
        color:'white',
        fontWeight:'bold',
        fontSize:16,
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

    imagesRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        top:20,
    },

    squareContainer: {
        width: 70,
        height: 70,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1,
        borderColor: 'transparent',
    },

    smallImage: {
        width: 30,
        height: 30,
        borderRadius: 10,
    },

    selectedSquareContainer: {
        borderColor: '#176FF2', 
    },

    squareContainer2: {
        width: '90%',
        alignContent:'center',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        marginTop:40,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1,
        borderColor: 'transparent',
    },

    bank:{
        marginTop:5,
        flexDirection:'row',
        borderRadius:4,
        backgroundColor: '#0F7B3A',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignContent:'center',
        width:'90%',
        height:60,
    },

    bank2:{
        marginTop:5,
        flexDirection:'row',
        borderRadius:4,
        backgroundColor: '#3F8075',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignContent:'center',
        width:'90%',
        height:60,
    },

    selectedBank: {
        borderColor: '#0000ff',
        borderWidth: 2,
    },

    blankbank:{
        marginTop:5,
        flexDirection:'row',
        borderRadius:4,
        backgroundColor: '#FFFFFF',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent:'center',
        width:'90%',
        height:60,
        borderWidth:0.4,
        marginBottom:5,
        
    },

    boxTextbank:{
        marginLeft:10,
        color:'white',
    },

    account:{
        marginLeft:10,
        color:'white',
        fontSize:16,
    },

    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
  
    bankList: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    bankItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
        width: '90%',
    },
    bankLogo: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    bankName: {
        paddingRight:45,
        flexShrink: 1,
        flexWrap: 'wrap',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
