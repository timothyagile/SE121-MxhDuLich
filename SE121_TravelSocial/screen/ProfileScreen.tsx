import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function ProfileScreen({ navigation }: { navigation: NativeStackNavigatorProps }) {
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets[0].uri) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.profile}>Profile</Text>
                <TouchableOpacity style={styles.bellIcon}>
                    <Image source={require('../assets/icons/bell.png')}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <View style={styles.imagePlaceholderContainer}>
                    </View>
                )}
                <TouchableOpacity style={styles.addButton}onPress={pickImage}>
                    <Image source={require('../assets/icons/changeavt.png')}></Image>
                </TouchableOpacity>
                <Text style = {styles.name}>To Hoang Huy</Text>
                <Text style = {styles.email}>22520573@gm.uit.edu.vn</Text>
                 
            </View>
            <View style = {styles.body}>
                <View>
                    <Text style={styles.accsetting}>Cài đặt tài khoản</Text>
                    <TouchableOpacity style={styles.personalInfoContainer} onPress={()=>navigation.navigate('personal-information-screen')}>
                        <Text style={styles.personalInfoText}>Thông tin cá nhân</Text>
                        <Image source={require('../assets/icons/arrowright.png')} style={styles.arrowIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.personalInfoContainer} onPress={()=>navigation.navigate('notifications-screen')}>
                        <Text style={styles.personalInfoText}>Thông báo</Text>
                        <Image source={require('../assets/icons/arrowright.png')} style={styles.arrowIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.personalInfoContainer}>
                        <Text style={styles.personalInfoText}>Lịch sử booking</Text>
                        <Image source={require('../assets/icons/arrowright.png')} style={styles.arrowIcon} />
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.accsetting}>Giúp đỡ & Hỗ trợ</Text>
                    <TouchableOpacity style={styles.personalInfoContainer}>
                        <Text style={styles.personalInfoText}>Chính sách bảo mật</Text>
                        <Image source={require('../assets/icons/arrowright.png')} style={styles.arrowIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.personalInfoContainer}>
                        <Text style={styles.personalInfoText}>Điều khoản và điều kiện</Text>
                        <Image source={require('../assets/icons/arrowright.png')} style={styles.arrowIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.personalInfoContainer}>
                        <Text style={styles.personalInfoText}>FAQ & Giúp đỡ</Text>
                        <Image source={require('../assets/icons/arrowright.png')} style={styles.arrowIcon} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('login')}>
                    <Text style ={styles.textlogout}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    accsetting:{
        marginTop:20,
        marginLeft:20,
        marginBottom:15,
        fontSize:18,
        opacity:0.6,
    },

    personalInfoContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop:5,
    },

    personalInfoText:{
        fontSize:18,
        marginLeft:20,
    },

    arrowIcon:{
        marginRight:10,
    },

    textlogout:{
        marginLeft:20,
        color:'#FF0F0F',
        marginTop:20,
        fontSize:22,
        fontWeight:'bold',
    },

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    profile: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    bellIcon: {
       width:20,
       height:20,
    },
    imageContainer: {
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        position: 'relative', 
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    
    imagePlaceholderContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
       //position:'absolute',
    },
    imagePlaceholder: {
        color: '#888',
    },
    addButton: {
        //position: 'absolute',
        bottom:15,
        right: 0,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#AEEBFF', 
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    name:{
        fontWeight:'bold',
        fontSize:20,
    },

    email:{
        fontStyle:'normal',
        fontSize:20,
        marginTop:5,
        opacity:0.4,
    },

    body:{

    }
});
