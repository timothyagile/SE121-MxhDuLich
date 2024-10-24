import React, { useState } from 'react';
import {Button, Text, View,  StyleSheet, Image, TouchableOpacity, TextInput, NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';
//import CheckBox from '@react-native-community/checkbox';
import Checkbox from 'expo-checkbox';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';


export default function LoginScreen ({navigation}: {navigation: NativeStackNavigatorProps}) {

    const [email, setEmail] = useState('');
    const [emailVerify, setEmailVerify] = useState(false)
    const [password, setPassword] = useState('');
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const handleSignUp = () => {
        console.log('Email:', email);
        console.log('Password:', password);
        navigation.navigate('login');
    };

    const handleCheckBox = () => {
        setToggleCheckBox(!toggleCheckBox);
    };

    const isValidEmail = (email: string): boolean => {
        // Biểu thức chính quy kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmail = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setEmailVerify(false);
        const emailVar = e.nativeEvent.text;
        setEmail(emailVar);
        if(isValidEmail(emailVar))
            setEmailVerify(true);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textsignup}>Login Now</Text>
            <Text style={styles.text1}>Please login to continue using our app</Text>
            <Text style={styles.text2}>Login with</Text>

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
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => handleEmail(e)}
                />
            </View>

            {/* {emailVerify ? (
                <View>
                    <Text>Dung</Text>
                </View>
            ) : (
                <View>
                    <Text>Sai</Text>
                </View>
            )} */}
            
            <View style ={styles.backgroundinput}>
                <TextInput
                    style={styles.input2}
                    placeholder="Enter your password"
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

            <View style={styles.checkboxContainer}>
                <TouchableOpacity onPress={handleCheckBox}>
                    <Text style={styles.checkboxText}>forgot password?</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.signupButton}
                onPress={() => navigation.navigate('main-screen')}
            >
                <Text style={styles.signupButtonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.buttonRow}>
            <Text style={styles.text3}>Don't have an account </Text>
            <TouchableOpacity
                style={styles.text4}
                onPress={() => navigation.navigate('register2')}
            >
                <Text style = {{fontSize:18,fontWeight:'bold',color:'#196EEE'}}> Sign up</Text>
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
        marginTop:115, 
    },

    text1:{
        marginTop:5,
        textAlign:'left',
        width: '100%', 
        fontSize:18,
        left: 30,
        
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
        backgroundColor: '#f0f0f0', 
        marginTop: 20,  
        left: 100,
    },

    circleButtonFacebook: {
        width: 60,  
        height: 60,  
        borderRadius: 30,  
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', 
        marginTop: 20,  
        right: 100,
    },

    buttonIcon: {
        width: 120, 
        height: 120,  
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
        justifyContent:'flex-end',
        flexDirection: 'row',
        marginTop: 20,
        width:'100%',
        marginRight: 60,
        
    },
    checkbox: {
        
        alignSelf: 'center',
        color:'red',
    },
    checkboxText: {
        marginLeft: 10,
        fontSize: 15,
    },
    
});