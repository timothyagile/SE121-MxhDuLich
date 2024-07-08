import React, { useState } from 'react';
import {Button, Text, View,  StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';


export default function RegisterScreen ({navigation}: {navigation: NativeStackNavigatorProps}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    const handleSignUp = () => {
        console.log('Email:', email);
        console.log('Password:', password);
        navigation.navigate('login');
    };

    const handleCheckBox = () => {
        setToggleCheckBox(!toggleCheckBox);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textsignup}>Sign Up</Text>
            <Text style={styles.text1}>Please registration with email and sign up to continue using our app</Text>
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
                    onChangeText={setEmail}
                />
            </View>
            
            <View style ={styles.backgroundinput}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
            </View>

            {/* <View style={styles.checkboxContainer}>
                <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={handleCheckBox}
                    style={styles.checkbox}
                />
                <TouchableOpacity onPress={handleCheckBox}>
                    <Text style={styles.checkboxText}>I agree with policy</Text>
                </TouchableOpacity>
            </View> */}

            <TouchableOpacity
                style={styles.signupButton}
                onPress={() => navigation.navigate('login')}
            >
                <Text style={styles.signupButtonText}>Sign up</Text>
            </TouchableOpacity>
            <View style={styles.buttonRow}>
            <Text style={styles.text3}>You already have an account? </Text>
            <TouchableOpacity
                style={styles.text4}
                onPress={() => navigation.navigate('login')}
            >
                <Text style = {{fontSize:18,fontWeight:'bold',color:'#196EEE'}}> Login</Text>
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
        marginTop:135, 
    },

    text1:{
        textAlign:'left',
        width: '100%', 
        fontSize:18,
        left: 30,
        
        fontWeight:'bold'
    },

    text2: {
        marginTop:20,
        marginBottom: 20,
        fontSize:18,
    },

    text3: {
        fontSize:18,
        marginTop:20,
        textAlign:'left',
        width: '65%', 
        left: 30,
    },
    text4: {
        fontSize:18,
        marginTop:20,
        color: '#196EEE',
        fontWeight:'bold',
        textAlign:'left',
        width: '35%',
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

    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    checkbox: {
        alignSelf: 'center',
    },
    checkboxText: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#196EEE',
    },
    
});