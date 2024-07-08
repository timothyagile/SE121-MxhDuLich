import {Button, Text, View,  StyleSheet, Image, TouchableOpacity} from 'react-native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';


export default function RegisterScreen ({navigation}: {navigation: NativeStackNavigatorProps}) {
    return (
        <View style={styles.container}>
            <Text style={styles.textwelcome}>Welcome</Text>
            <Text style={styles.text1}>Please login or signup to start</Text>
            <Image source={require('../../assets/images/Traveling-rafiki 1.png')} style={styles.image} />
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
        width: '65%', 
        left: 30,
    },
    text4: {
        fontSize:18,
        top:90,
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