import {Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, Linking} from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import Facility from '@/components/HomeScreen/Facility';
import axios from 'axios';

const {width, height} = Dimensions.get('window')
const CARD_WIDTH = 0.9 * width;
const CARD_HEIGHT = 0.4 * height;

const LATITUDE = 10.411379;
const LONGITUDE = 107.000000;


const GOOGLE_MAPS_API_KEY = 'AIzaSyBeCTs9sMcGjsjlIIIiML2TXrLqOZSEY6s';
const ADDRESS = 'FFXQ+X94, Bung Riềng, Xuyên Mộc, Bà Rịa - Vũng Tàu, Vietnam';


export default function DetailScreen1 ({navigation} : {navigation : NativeStackNavigatorProps}) {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    
    
        // Hàm để chuyển đổi địa chỉ thành tọa độ
        const getCoordinatesFromAddress = async (address: string) => {
            const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;
    
            try {
                const response = await axios.get(url);
                if (response.data.status === 'OK') {
                    const location = response.data.results[0].geometry.location;
                    setLatitude(location.lat);
                    setLongitude(location.lng);
                } else {
                    console.log('Không thể lấy tọa độ:', response.data.status);
                }
            } catch (error) {
                console.error('Lỗi khi gọi Geocoding API:', error);
            }
        };
    
        // Gọi hàm lấy tọa độ khi component được render
        useEffect(() => {
            getCoordinatesFromAddress(ADDRESS);
        }, []);

        const openMap = () => {
            if (latitude && longitude) {
                const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
                Linking.openURL(url).catch(err => console.error("Không thể mở Google Maps", err));
            } else {
                console.log('Tọa độ không khả dụng');
            }
        };

    // const openMap = () => {
    //     const url = `https://www.google.com/maps/search/?api=1&query=${LATITUDE},${LONGITUDE}`;
    //     Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    // };
    return (
        <View style = {styles.container}>
            <View style = {styles.contentContainer}>
                <View style = {styles.header}>
                    <TouchableOpacity 
                    style = {styles.goBackButton}
                    onPress={() => navigation.goBack()}>
                        <Text>Go Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style = {styles.goBackButton}
                    >
                        {/* <Text>Message</Text> */}
                    </TouchableOpacity>
                </View>
                <View style = {styles.imageBox}>
                        <Image 
                        style = {styles.image}
                        source = {require('@/assets/images/bai-truoc-20.jpg')}>
                        </Image>
                </View>

                <View style = {styles.infoSection}>
                        <View style = {styles.header}>
                            <Text style = {styles.locationName}>Vung Tau</Text>
                            <TouchableOpacity onPress={openMap}>
                                <Text style = {styles.showMap}>Show map</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.rating}>
                            <Image source = {require('@/assets/icons/star.png')}></Image>
                            <Text>4.1 (365 Reviews)</Text>
                        </View>
                        <View style = {styles.description}>
                            <Text>Vung tau ...............................................</Text>
                            <TouchableOpacity>
                                <Text style = {[styles.showMap, {marginHorizontal: '0%'}]}>Read more</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.facilitySection}>
                            <Text style = {styles.locationName}>Facilities</Text>
                            <View style = {styles.facility}>
                                <Facility facilityType='1 Heater'/>
                                <Facility facilityType='Dinner'/>
                                <Facility facilityType='1 Tub'/>
                                <Facility facilityType='1 Pool'/>
                            </View>
                        </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    contentContainer: {
        marginHorizontal: '5%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        alignItems: 'center',
    },
    goBackButton: {
    },
    imageBox: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1
    },
    image: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        resizeMode: 'cover',

    },
    infoSection: {
        borderWidth: 1
    },
    locationName: { 
        fontSize: 24,
        fontWeight: 'bold',

    },
    showMap: { 
        fontSize: 16,
        color: 'blue',
        fontWeight: 'bold',
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    description: {
    },
    facilitySection: {
    },
    facility: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})