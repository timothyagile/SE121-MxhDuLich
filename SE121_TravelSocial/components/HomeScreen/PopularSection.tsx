import {Text, View, FlatList, Dimensions, TouchableOpacity, StyleSheet, Image, Modal, } from 'react-native';

import locationData from '@/constants/location';
import React, { useEffect, useState } from 'react';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import CustomModal from '../CollectionScreen/AddIntoCollection';
import * as Network from 'expo-network';
import { NetworkInfo } from 'react-native-network-info';
import {API_BASE_URL} from '../../constants/config';

const {width, height} = Dimensions.get('window')
const CARD_WIDTH = 240;
const CARD_HEIGHT = height - 600;
const CARD_WIDTH_SPACING = CARD_WIDTH + 24;

type LikedItems = {
    [key: string]: boolean;
};

interface PopularSectionProps {
    categoryId: string | undefined;
    navigation: any; 
}

export default function PopularSection({ categoryId, navigation }: PopularSectionProps) {
    const [likedItems, setLikedItems] = useState<LikedItems>({});
    const [locations, setLocations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const handlePress = (id: string) => {
        setLikedItems((prevState) => ({
            ...prevState,
            [id]: !prevState[id], 
        }));

        setModalVisible(true); 
    };

    useEffect(() => {
        if (categoryId) {
            fetchPopularLocations(categoryId);
        }
    }, [categoryId]);
    
    const getIPAddress = async () => {
        const ipAddress = await NetworkInfo.getIPAddress();
        console.log('Device IP Addresss:', ipAddress);
        return ipAddress;
    };

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
    };
    
    

    return (

        <View>
            <Text style = {styles.titleText}>Phổ biến</Text>
        <FlatList
        data={locations}
        
        horizontal
        snapToInterval={CARD_WIDTH_SPACING}
        decelerationRate={"fast"}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
            return (
                <TouchableOpacity 
                style = {{
                    marginLeft: 24,
                    marginRight:  index === locationData.length - 1 ? 24 : 0}}
                onPress={() => navigation.navigate('detail-screen', {id: item._id})}>
                        <View style = {styles.card}>
                            <View style = {styles.imageBox}>
                                <Image source={require('@/assets/images/bai-truoc-20.jpg')}
                                style = {styles.image}/>
                            </View>
                            <View style = {styles.titleBox}>
                                <View style = {styles.textBox}>
                                    <Text style = {[styles.textStyle, {fontSize: 12}]}>{item.name}</Text>
                                </View>
                                <View>
                                    <View style = {[styles.textBox, {top: 10, width: 70}]}>
                                        <Image source={require('@/assets/icons/star.png')}
                                        style = {styles.star}></Image>
                                        <Text style = {[styles.textStyle, {fontSize: 12}]}>{item.rating}</Text>
                                    </View>
                                    
                                    <TouchableOpacity onPress={()=>handlePress(item._id.toString())} style= {{left:175, bottom: 15,}}>
                                        <Image source={require('@/assets/icons/heart.png')}
                                        style={[
                                        styles.heart, 
                                        { tintColor: likedItems[item._id] ? 'red' : 'white' } 
                                    ]}></Image>
                                    </TouchableOpacity>
                                    
                                </View>
                                
                            </View>
                        </View>

                </TouchableOpacity>
            )}
        }>

        </FlatList>
        <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)} ></CustomModal>
    </View>
    )
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        left: 20
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        marginVertical: 10,
    },
    imageBox: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 16,
        overflow: 'hidden',
    },
    image: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        resizeMode: 'cover',

    },
    titleBox: {
        position: 'absolute',
        top: CARD_HEIGHT - 90,
        left: 16
    },
    textBox: {
        flexDirection: 'row',
        backgroundColor: '#4D5652',
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    star: {
        width: 16,
        height: 16,
        left: 5
    },

    heart: {
        width: 30,
        height:30,
        
    },
    textStyle: {
        fontWeight: 'medium',
        color: 'white',
        marginHorizontal: 10,
        marginVertical: 5
    }
})