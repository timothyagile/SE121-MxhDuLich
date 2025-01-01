import React, { useEffect, useState } from 'react';
import {Image, View, StyleSheet, TouchableOpacity, Text, Dimensions, ActivityIndicator} from 'react-native';
import locationData from '@/constants/location'
import * as Network from 'expo-network';
import {API_BASE_URL} from '../../constants/config';

const {width, height} = Dimensions.get('window')
const CARD_WIDTH =  width - 240;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + 24;

interface DailySectionProps {
    categoryId: string | undefined; // Nhận categoryId từ HomeScreen
    navigation: any; 
}

export default function DailySection({ categoryId }: DailySectionProps) {

    const [locations, setLocations] = useState<any[]>([]);
    const [RCM, setRCM] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('category: ',categoryId)
    if (categoryId === "all") {
      getAllLocations();
      return;
    }
    if (categoryId) {
      fetchPopularLocations(categoryId);
    }
    fetchRecommendedLocations();
}, [categoryId]);  

    const fetchPopularLocations = async (id: string) => {
        try {
            const ipAddress = await Network.getIpAddressAsync();
            console.log('Device IP Address:', ipAddress);
            const response = await fetch(`${API_BASE_URL}/locationbycategory/${id}`);
            const data = await response.json();
            if (data.isSuccess) {
                setLocations(data.data);
            } else {
                console.error("Error fetching popular locations:", data.error);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
        finally {
            setLoading(false);
        }
    };

    const fetchRecommendedLocations = async () => {
        try {
            // Fetch danh sách các location được đề xuất
            const response = await fetch(`${API_BASE_URL}/recommend`);
            const data = await response.json();
    
            // if (data.isSuccess) {
                console.log('RCM: ',data.recommendations);

                // Duyệt qua từng location id và gọi API getlocationbyid để lấy thông tin chi tiết
                    const locationDetailsPromises = data.recommendations.map(async (location:any) => {
                        console.log('location id:', location.id);
                        const locationResponse = await fetch(`${API_BASE_URL}/locationbyid/${location.id}`);
                        const locationData = await locationResponse.json();
                        console.log('location data: ', locationData);
                        return locationData;
                    });
    
                // Đợi tất cả các lời hứa (promises) hoàn thành và lấy dữ liệu chi tiết của tất cả các location
                const locationsWithDetails = await Promise.all(locationDetailsPromises);

                console.log('BCCCC',locationsWithDetails)
    
                // Lưu dữ liệu chi tiết vào state
                setRCM(locationsWithDetails);
            // } 
            // else {
            //     console.error("Error fetching popular locations:", data.error);
            // }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };


    
    



    const getAllLocations = async () => {
        try {
            const ipAddress = await Network.getIpAddressAsync();
            console.log('Device IP Address:', ipAddress);
            const response = await fetch(`${API_BASE_URL}/alllocation`); 
            
            const data = await response.json();

            if (data.isSuccess) {
                setLocations(data.data); 
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    // Hiển thị vòng quay khi đang tải
    // if (loading) {
    //     return <ActivityIndicator size="large" color="#0000ff" />;
    // }


    return (
        <View>
            <Text style = {styles.titleText}>Gợi ý hằng ngày</Text>
            <View style = {styles.container}>
                {locations.map((item, index) => {
                    return (
                    <TouchableOpacity
                        key={index}
                        style = {{
                        marginLeft: 24,
                        marginRight:  index === locations.length - 1 ? 24 : 0}}>
                        <View style={[styles.card]}>
                            <View style={styles.imageBox}>
                                <Image style={styles.image} source={item.image} />
                            </View>
                            <View style={styles.footer}>
                                <View>
                                    <Text style={[styles.textStyle, {fontSize: 20}]}>{item.name}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        left: 20
        
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 1
    },
    imageBox: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT - 60,
        borderRadius: 24,
        overflow: 'hidden',    
    },
    image: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT - 60,
        resizeMode: 'cover',

    },
    textBox: {
        flexDirection: 'row',
        backgroundColor: '#4D5652',
        borderRadius: 20,
        alignItems: 'center',
        height: 30,
    },
    textStyle: {
        fontWeight: 'medium',
        color: 'black',
        marginLeft: 5,
        marginVertical: 2,
    },
    footer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
    }
})