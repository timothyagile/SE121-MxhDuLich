import React from 'react';
import {Button, Text, View,  StyleSheet, Image, TouchableOpacity} from 'react-native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';


export default function RegisterScreen ({navigation}: {navigation: NativeStackNavigatorProps}) {
    return (
        <View style={styles.container}>
            <Text style={styles.textwelcome}>Xin Chào </Text>
            <Text style={styles.text1}>Đăng nhập hoặc đăng ký để bắt đầu</Text>
            <Image source={require('../../assets/images/Traveling-rafiki 1.png')} style={styles.image} />
            <Text style={styles.text2}>Đăng nhập với</Text>

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

            <TouchableOpacity
                style={styles.signupButton}
                onPress={() => navigation.navigate('register2')}
            >
                <Text style={styles.signupButtonText}>Đăng ký</Text>
            </TouchableOpacity>
            <View style={styles.buttonRow}>
            <Text style={styles.text3}>Bạn đã có tài khoản? </Text>
            <TouchableOpacity
                style={styles.text4}
                onPress={() => navigation.navigate('login')}
            >
                <Text style = {{fontSize:18,fontWeight:'bold',color:'#196EEE'}}>Đăng nhập</Text>
            </TouchableOpacity>
            
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },

    textwelcome: {
        fontSize:40,
        color: '#196EEE',
        fontWeight:'bold',
        textAlign:'left',
        width: '100%', 
        left: 30,
        bottom: 100,
    },

    text1:{
        textAlign:'left',
        width: '100%', 
        fontSize:18,
        left: 30,
        bottom: 100,
        fontWeight:'bold'
    },

    text2: {

        marginBottom: 20,
        fontSize:18,
    },

    text3: {
        fontSize:18,
        top:90,
        textAlign:'left',
        width: '50%', 
        left: 30,
    },
    text4: {
        fontSize:18,
        top:90,
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
        top:80,
        marginTop: 0,
        paddingVertical: 20,
        paddingHorizontal: 140,
        backgroundColor: '#196EEE',
        borderRadius: 16,
        
    },
    signupButtonText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    }
    
});