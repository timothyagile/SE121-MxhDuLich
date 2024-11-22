import React, { useEffect, useState } from 'react';
import {Image, View, StyleSheet, TouchableOpacity, Text, Dimensions, ActivityIndicator} from 'react-native';
import locationData from '@/constants/location'
import * as Network from 'expo-network';

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (categoryId) {
            fetchPopularLocations(categoryId);
        }
    }, [categoryId]);

    // const fetchLocations = async () => {
    //     try {
    //         const response = await fetch('http://192.168.1.18:3000/alllocation',
    //         {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json', 
    //                 'Accept': 'application/json',  
    //             }
    //         }); 
    //         const result: any = await response.json();

    //         if (result.isSuccess) {
    //             setLocationData(result.data);
    //         } else {
    //             console.error("Lỗi: Dữ liệu không hợp lệ");
    //         }
    //     } catch (error) {
    //         console.error("Đã xảy ra lỗi khi lấy dữ liệu:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchLocations();
    // }, []);

    const fetchPopularLocations = async (id: string) => {
        try {
            //getIPAddress();
            // const ipAddresss = await NetworkInfo.getIPAddress();
            // console.log('Device IP Addresss:', ipAddresss);
            const ipAddress = await Network.getIpAddressAsync();
            console.log('Device IP Address:', ipAddress);
            const response = await fetch(`http://192.168.1.3:3000/locationbycategory/${id}`);
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

    // Hiển thị vòng quay khi đang tải
    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }


    return (
        <View>
            <Text style = {styles.titleText}>Gợi ý hằng ngày</Text>
            <View style = {styles.container}>
                {locations.map((item, index) => {
                    return (
                    <TouchableOpacity
                        key={item.id}
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