import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { RouteProp, useRoute, useFocusEffect } from '@react-navigation/native';
import { useUser } from '@/context/UserContext';
import { navigate } from 'expo-router/build/global-state/routing';
import {API_BASE_URL} from '../constants/config';

interface User {
    userName: string;
    userEmail: string;
}

export default function ProfileScreen({ navigation }: { navigation: NativeStackNavigatorProps }) {
    const { userId } = useUser();
    const [userData, setUserData] = useState<any>(null);
    const [image, setImage] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets[0].uri) {
            setImage(result.assets[0].uri);
            // Tự động upload avatar khi người dùng chọn ảnh
            uploadAvatar(result.assets[0].uri);
        }
    };

    const getFilename = (uri: string) => {
        const uriParts = uri.split("/");
        const name = uriParts[uriParts.length - 1];
        const fileTypeParts = name.split(".");
        const fileType = fileTypeParts[fileTypeParts.length - 1];
        return { name, fileType };
      };

    const uploadAvatar = async (imageUri: string) => {
        try {
            setUploading(true);
            console.log("Starting avatar upload...");
            
            // 1. Đầu tiên, tải ảnh lên server
            const formData = new FormData();
            const fileInfo = getFilename(imageUri); // Sử dụng imageUri thay vì image
            
            formData.append("files", {
                uri: imageUri,
                type: `image/${fileInfo.fileType}`,
                name: fileInfo.name,
            } as any);
            
            console.log("FormData prepared, sending to server...");
            
            // Upload ảnh lên Cloudinary thông qua API
            const uploadResponse = await fetch(`${API_BASE_URL}/upload`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                credentials: 'include',
            });
            
            console.log("Upload response status:", uploadResponse.status);
            
            const uploadResponseText = await uploadResponse.text();
            console.log("Raw response:", uploadResponseText);
            
            if (!uploadResponse.ok) {
                throw new Error(`Không thể tải ảnh lên: ${uploadResponseText}`);
            }
            
            const uploadResult = JSON.parse(uploadResponseText);
            console.log('Upload result:', uploadResult);
            
            if (!uploadResult.isSuccess) {
                throw new Error(uploadResult.error || "Lỗi không xác định khi tải ảnh");
            }
            
            // Lấy thông tin ảnh từ mảng kết quả
            const imageData = uploadResult.data[0];
            console.log("Image data:", imageData);
            
            // 2. Sau khi tải lên thành công, cập nhật avatar user
            const updateResponse = await fetch(`${API_BASE_URL}/user/avt`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userAvatar: {
                        url: imageData.url,
                        publicId: imageData.publicId,
                    }
                }),
                credentials: 'include',
            });
            
            const updateResponseText = await updateResponse.text();
            console.log("Update avatar response:", updateResponseText);
            
            if (!updateResponse.ok) {
                throw new Error(`Không thể cập nhật avatar: ${updateResponseText}`);
            }
            
            const updateResult = JSON.parse(updateResponseText);
            console.log('Avatar update result:', updateResult);
            
            // Cập nhật dữ liệu người dùng trong state
            setUserData((prev: any) => ({
                ...prev,
                userAvatar: {
                    url: imageData.url,
                    publicId: imageData.publicId,
                }
            }));
            
            // Cập nhật ảnh hiển thị với timestamp để tránh cache
            setImage(imageData.url + '?cache=' + new Date().getTime());
            
            Alert.alert('Thành công', 'Đã cập nhật ảnh đại diện');
            
        } catch (error) {
            console.error('Error uploading avatar:', error);
            Alert.alert('Lỗi', 'Không thể cập nhật ảnh đại diện. Vui lòng thử lại.');
        } finally {
            setUploading(false);
        }
    };

    const logout = async () => {
        console.log('da dang xuat')
        try {
            const response = await fetch(`${API_BASE_URL}/logout`, {
                method: 'GET',
                credentials: 'include', 
            });

            if (response.ok) {
                
                navigation.navigate('login');
            } else {
                Alert.alert("Lỗi", "Không thể đăng xuất. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Lỗi", "Đã xảy ra sự cố khi đăng xuất.");
        }
    };

    const fetchUserData = async () => {
        try {
            console.log('Fetching user data for ID:', userId);
            const response = await fetch(`${API_BASE_URL}/user/getbyid/${userId}`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User data fetched successfully:', data.data);
                setUserData(data.data); 
                if (data.data?.userAvatar?.url) {
                    setImage(data.data?.userAvatar?.url + '?cache=' + new Date().getTime());
                }
            } else {
                console.error('Failed to fetch user data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // Thêm useFocusEffect để tải lại dữ liệu khi màn hình được focus
    useFocusEffect(
        useCallback(() => {
            console.log('Profile Screen Focused - Refreshing user data');
            if (userId) {
                fetchUserData();
            }
            return () => {
                // Cleanup nếu cần
            };
        }, [userId])
    );

    // Vẫn giữ useEffect để tải dữ liệu ban đầu khi component được mount
    useEffect(() => {
        if (userId) fetchUserData();
    }, [userId]);

    if (!userId) {
        return (
            <View>
                <Text>Bạn cần đăng nhập để xem trang này.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.profile}>Profile</Text>
                <TouchableOpacity style={styles.bellIcon} onPress={()=> navigation.navigate('notifications-screen')}>
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
                <TouchableOpacity style={styles.addButton} onPress={pickImage} disabled={uploading}>
                    {uploading ? (
                        <ActivityIndicator size="small" color="#0000ff" />
                    ) : (
                        <Image source={require('../assets/icons/changeavt.png')}></Image>
                    )}
                </TouchableOpacity>
                <Text style = {styles.name}>{userData?.userName}</Text>
                <Text style = {styles.email}>{userData?.userEmail}</Text>
                 
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
                    <TouchableOpacity style={styles.personalInfoContainer} onPress={()=>navigation.navigate('voucher-screen')}>
                        <Text style={styles.personalInfoText}>Voucher cho bạn</Text>
                        <Image source={require('../assets/icons/arrowright.png')} style={styles.arrowIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.personalInfoContainer} onPress={()=>navigation.navigate('Booking')}>
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
                    onPress={logout}>
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
