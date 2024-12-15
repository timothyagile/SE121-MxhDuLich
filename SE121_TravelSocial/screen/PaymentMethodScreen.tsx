import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert, Platform, Linking, ActivityIndicator } from 'react-native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParamList } from '@/types/navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import {API_BASE_URL} from '../constants/config';

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
    const { locationId, totalPrice } = route.params;
    const [selectedButton, setSelectedButton] = useState<string | null>(null);
    const [locationDetails, setLocationDetails] = useState<any>(null);
    const [banks, setBanks] = useState<Bank[]>([]);
    const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
    const [loading, setLoading] = useState(true);

    const handlePress = (button: string) => {
        setSelectedButton(button);
        if (button === 'bank') {
            fetchBanks();
        }
        handleMomoPayment();
    };

    const handleMomoPayment = async () => {
        const partnerCode = "MOMOXXXX"; 
        const totalPrice = 50000; 
        const orderId = "order12345"; 
        const description = "Thanh toán TravelSocial";
    
        const deeplink = `momo://?action=payWithApp&amount=${totalPrice}&orderId=${orderId}&description=${description}`;
        try {
            await Linking.openURL(deeplink);
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể mở ứng dụng MoMo.');
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

    const applyAndPay = () => {
        if (selectedBank) {
            Linking.openURL(selectedBank.deeplink).catch(err => 
                Alert.alert('Error', 'Không thể mở ứng dụng ngân hàng.')
            );
        } else {
            Alert.alert('Error', 'Vui lòng chọn một ngân hàng trước khi thanh toán.');
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

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.arrowleftbutton} onPress={() => navigation.goBack()}>
                <Image source={require('../assets/icons/arrowleft.png')} style={styles.arrowlefticon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Phương Thức Thanh Toán</Text>
            </View>

            <View style={{flexDirection:'row'}}>
                <View style={styles.imageContainer}>
                    <Image source={require('../assets/images/camping-ho-coc.png')} style={styles.image} />
                </View>
                <View style ={styles.textContainer}>
                    <Text style= {styles.title}>{locationDetails?.name || 'Tên địa điểm'}</Text>

                    <View style={styles.detailsContainer}>
                        <View style={styles.ratingBox}>
                            <Image source = {require('../assets/icons/star.png')} style={{height:20, width:20, marginRight:3,}}></Image>
                            <Text style={styles.boxText}>{locationDetails?.rating || 0}</Text>
                        </View>
                        <View style={styles.featureBox}>
                            <Image source={require('../assets/icons/clock.png')} style ={{marginRight:3,}}></Image>
                            <Text style={styles.boxText}>free cancel in 24h</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* <View style={{marginLeft:20, marginTop:25,}}>
                <TouchableOpacity style={styles.addpaymentmethod} onPress={() => navigation.navigate('add-new-payment-method-screen')}>
                        <Text style={styles.boxText2}>Thêm phương thức thanh toán</Text>
                </TouchableOpacity>
            </View> */}
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

            <ScrollView style = {{marginTop:20, marginBottom: 130,}}>
            {selectedButton === 'bank' && ( // Kiểm tra trạng thái selectedButton
                loading ? ( // Hiển thị trạng thái loading khi đang tải danh sách ngân hàng
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

            {/* <View style={{width:'100%', alignItems:'center',}}>
                <View style={styles.squareContainer2}>
                    <TouchableOpacity 
                    style={styles.bank} 
                    onPress={() => handlePress1({appId: 'vcb', appLogo: 'https://play-lh.googleusercontent.com/SD4lUzWCqLq6nqURm8abnazm8sC0h_hkikryHyODrVpI0g3xMjeuaVs379jUCKrd0vk', appName: 'BIDV SmartBanking', bankName: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam', deeplink: 'https://dl.vietqr.io/pay?app=vcb&ba=122555743434234@ocb'})}
                    >
                        <Image source={require('../assets/icons/VCB.png')} style={{width:40, height:40,}}></Image>
                        <View>
                            <Text style={styles.boxTextbank}>Vietcomabank</Text>
                            <Text style={styles.account}>To Hoang Huy - 9386441295</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.bank2}
                    onPress={() => handlePress1({appId: 'bidv', appLogo: 'https://play-lh.googleusercontent.com/SD4lUzWCqLq6nqURm8abnazm8sC0h_hkikryHyODrVpI0g3xMjeuaVs379jUCKrd0vk', appName: 'BIDV SmartBanking', bankName: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam', deeplink: 'https://dl.vietqr.io/pay?app=bidv'})}
                    >
                        <Image source={require('../assets/icons/VCB.png')} style={{width:40, height:40,}}></Image>
                        <View>
                            <Text style={styles.boxTextbank}>BIDV</Text>
                            <Text style={styles.account}>To Hoang Huy - 9386441295</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.blankbank} onPress={() => navigation.navigate('add-new-payment-method-screen')}>
                        <Image style={{width:40, height:40,}}  source ={require('../assets/icons/plus-black.png')}></Image>
                    </TouchableOpacity>
                </View>

                
            </View> */}
            <View style={{position:'absolute',bottom:20,width:'100%'}}>
                <Text style={{marginLeft:30, fontSize:24, marginBottom:20,}}> Thanh toán {totalPrice} VND</Text>
                <View style = {{  alignItems:'center', justifyContent:'center',alignContent:'center',width:'100%'}}>
                    
                    <TouchableOpacity style={styles.addpaymentmethod2} onPress={applyAndPay}>
                            <Text style={styles.boxText3}>Xác Nhận Thanh Toán</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            
        </View>
);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
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
