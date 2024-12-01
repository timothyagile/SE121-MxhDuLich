import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert, Platform, Linking, ActivityIndicator } from 'react-native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';



interface Bank {
    
    appId: string;
    appLogo: string;
    appName: string;
    bankName: string;
    deeplink: string;
}

//const supportedBanks = ['icb', 'mb', 'bidv', 'vcb', 'tcb','acb',];

export default function AddNewPaymentMethodScreen({ navigation }: {navigation: NativeStackNavigatorProps}) {

    const [selectedButton, setSelectedButton] = useState<string | null>(null);
    const [banks, setBanks] = useState<Bank[]>([]);
    const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
    const [loading, setLoading] = useState(true);

    const handlePress = (button: string) => {
        setSelectedButton(button);
        if (button === 'bank') {
            fetchBanks();
        }
    };

    const fetchBanks = async () => {
        
        try {
            const response = await fetch('https://api.vietqr.io/v2/android-app-deeplinks');
            const data = await response.json();
            if (data && data.apps && Array.isArray(data.apps)) {
                setBanks(data.apps);
            } else {
                Alert.alert('Lỗi', 'Dữ liệu ngân hàng không hợp lệ.');
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể tải danh sách ngân hàng.');
        } 
    };
    
    

    useEffect(() => {
        fetch('https://api.vietqr.io/v2/android-app-deeplinks')
            .then(response => response.json())
            .then(data => {
                setBanks(data.apps);
                setLoading(false);
            })
            .catch(error => {
                Alert.alert('Error', 'Không thể tải danh sách ngân hàng.');
                //setLoading(false);
            });
    }, []);

    const handlePress1 = (bank: Bank) => {
        setSelectedBank(bank);
    };

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.arrowleftbutton} onPress={() => navigation.goBack()}>
                <Image source={require('../assets/icons/arrowleft.png')} style={styles.arrowlefticon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Thêm Phương Thức Mới</Text>
            </View>

            <Text style = {{marginLeft:30, fontSize:18, fontWeight:'500',}}>chọn phương thức thanh toán</Text>
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

            {selectedButton === 'bank' && (
                <ScrollView style = {{marginTop:20, marginBottom: 130,}}>
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
                </ScrollView>
            )}

            
            <View style={{position:'absolute',bottom:20,width:'100%'}}>
                
                <View style = {{  alignItems:'center', justifyContent:'center',alignContent:'center',width:'100%'}}>
                    
                    <TouchableOpacity style={styles.addpaymentmethod2} onPress={() => navigation.navigate('payment-method-screen')} >
                            <Text style={styles.boxText3}>Lưu</Text>
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
      paddingHorizontal:80,
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
