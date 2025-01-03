import React, { useState } from 'react';
import {KeyboardAvoidingView, Button, Text, View,  StyleSheet, Image, TouchableOpacity, TextInput, Alert, Platform} from 'react-native';
//import CheckBox from '@react-native-community/checkbox';
import Checkbox from 'expo-checkbox';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import {API_BASE_URL} from '../../constants/config';

export default function RegisterScreen2 ({navigation}: {navigation: NativeStackNavigatorProps}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [secureTextEntry2, setSecureTextEntry2] = useState(true);

    const handleSignUp = async () => {
        if (!email || !password) {
            Alert.alert('Lỗi', 'Vui lòng nhập email và mật khẩu.');
            return;
        }

        console.log('Email:', email);
        console.log('Password:', password);

        try {
            const response = await fetch(`${API_BASE_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail: email,
                    userPassword: password,
                }),
            });

            const data = await response.json();

            console.log('Response:', data);
            if (response.ok) {
                Alert.alert('Thành công', 'Tạo tài khoản thành công.');
                //navigation.navigate('login'); // Chuyển hướng đến trang đăng nhập
            } else {
                Alert.alert('Lỗi', data.error || 'Có lỗi xảy ra.');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Lỗi', 'Không thể kết nối với máy chủ. Vui lòng thử lại.');
        }
    };

    const handleCheckBox = () => {
        setToggleCheckBox(!toggleCheckBox);
    };

    

    return (
        
            <View style={styles.container}>
                <Text style={styles.textsignup}>Đăng ký</Text>
                <Text style={styles.text1}>Đăng ký bằng email và đăng nhập để tiếp tục sử dụng ứng dụng</Text>
                <Text style={styles.text2}>Đăng ký với</Text>

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.circleButtonGoogle}
                        onPress={() => navigation.navigate('main-screen')}
                    >
                        <Image source={require('../../assets/icons/icongoogle.png')} style={styles.buttonIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.circleButtonFacebook}
                        onPress={() => navigation.navigate('main-screen')}
                    >
                        <Image source={require('../../assets/icons/iconfacebook.png')} style={styles.buttonIcon} />
                    </TouchableOpacity>
                </View>
                <View style ={styles.backgroundinput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập email"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                
                <View style ={styles.backgroundinput}>
                    <TextInput
                        style={styles.input2}
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={secureTextEntry}
                    />

                    <TouchableOpacity
                    style={styles.icon}
                    onPress={() => setSecureTextEntry(!secureTextEntry)}
                    >
                    <Image
                        source={secureTextEntry ? require('../../assets/icons/closedeye.png'):require('../../assets/icons/openeye.png') }
                        // style={styles.iconImage}
                    />
                    </TouchableOpacity>
                </View>

                <View style ={styles.backgroundinput}>
                    <TextInput
                        style={styles.input2}
                        placeholder="Nhập lại mật khẩu"
                        value={repassword}
                        onChangeText={setRePassword}
                        secureTextEntry={secureTextEntry2}
                    />

                    <TouchableOpacity
                    style={styles.icon}
                    onPress={() => setSecureTextEntry2(!secureTextEntry2)}
                    >
                    <Image
                        source={secureTextEntry2 ? require('../../assets/icons/closedeye.png'):require('../../assets/icons/openeye.png') }
                        // style={styles.iconImage}
                    />
                    </TouchableOpacity>
                </View>

                <View style={styles.checkboxContainer}>
                    <Checkbox
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={handleCheckBox}
                        style={styles.checkbox}
                        color ={toggleCheckBox?'#196EEE' : undefined}
                    />
                    <TouchableOpacity onPress={handleCheckBox}>
                        <Text style={styles.checkboxText}>Tôi đồng ý với chính sách</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.signupButton}
                    onPress={handleSignUp}
                >
                    <Text style={styles.signupButtonText}>Đăng ký</Text>
                </TouchableOpacity>
                <View style={styles.buttonRow}>
                <Text style={styles.text3}>Bạn đã có tài khoản? </Text>
                <TouchableOpacity
                    style={styles.text4}
                    onPress={() => navigation.navigate('register')}
                >
                    <Text style = {{fontSize:18,fontWeight:'bold',color:'#196EEE'}}> Đăng nhập</Text>
                </TouchableOpacity>
                
                </View>

            </View>
        
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },

    textsignup: {
        fontSize:40,
        color: '#196EEE',
        fontWeight:'bold',
        textAlign:'left',
        width: '100%', 
        left: 30,
        marginTop:30, 
    },

    text1:{
        
        textAlign:'left',
        width: '90%', 
        fontSize:18,
        marginLeft:20,
        
        fontWeight:'bold'
    },

    text2: {
        marginTop: 25,
        marginBottom: 20,
        fontSize:18,
    },

    text3: {
        fontSize:18,
        marginTop:20,
        textAlign:'left',
        width: '50%', 
        left: 30,
    },
    text4: {
        fontSize:18,
        marginTop:20,
        color: '#196EEE',
        fontWeight:'bold',
        textAlign:'left',
        width: '50%',
    },

    image: {
        width: 283,
        height: 186,
        marginBottom: 20,
        bottom: 40,
    },

    buttonRow: {
        flexDirection: 'row', 
        marginTop: 20,
        marginBottom: 30,
    },

    circleButtonGoogle: {
        width: 60,  
        height: 60,  
        borderRadius: 30,  
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white', 
        marginTop: 20,  
        left: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },

    circleButtonFacebook: {
        width: 60,  
        height: 60,  
        borderRadius: 30,  
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white', 
        marginTop: 20,  
        right: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },

    buttonIcon: {
        width: 40, 
        height: 40,  
    },

    signupButton: {
        marginTop: 40,
        paddingVertical: 20,
        paddingHorizontal: 140,
        backgroundColor: '#196EEE',
        borderRadius: 16,
    },
    signupButtonText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },

    backgroundinput:{
        flexDirection:'row',
        marginTop:20,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff', 
        borderRadius:8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    input: {
        width: '100%',
        height: 50,
        borderRadius: 8,
        paddingHorizontal: 10,
        
    },
    input2: {
        width: '95%',
        height: 50,
        borderRadius: 8,
        paddingHorizontal: 10,
        
    },

    icon:{
        width:'5%',
        right: 15,
    },

    checkboxContainer: {
        justifyContent:'flex-start',
        flexDirection: 'row',
        marginTop: 20,
        textAlign:'left',
        width:'100%',
        left:40,
        
    },
    checkbox: {
        
        alignSelf: 'center',
        color:'red',
    },
    checkboxText: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#196EEE',
    },
    
});