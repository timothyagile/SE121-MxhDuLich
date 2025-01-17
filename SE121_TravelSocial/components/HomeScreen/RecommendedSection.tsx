import {Text, View, FlatList, Dimensions, TouchableOpacity, StyleSheet, Image, ActivityIndicator} from 'react-native'
import locationData from '@/constants/location';
import React, { useEffect, useState } from 'react';
import * as Network from 'expo-network';
import {API_BASE_URL} from '../../constants/config';

const {width, height} = Dimensions.get('window')
const CARD_WIDTH =  width - 190;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + 24;
type LikedItems = {
    [key: string]: boolean; 
};

interface PopularSectionProps {
    categoryId: string | undefined;
    navigation: any;
  }


export default function RecommendedSection({ categoryId, navigation }: PopularSectionProps) {
    const [likedItems, setLikedItems] = useState<LikedItems>({});
    const [locations, setLocations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const handlePress = (id: string) => {
        setLikedItems((prevState) => ({
            ...prevState,
            [id]: !prevState[id] 
        }));
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

    useEffect(() => {
        getAllLocations();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />; // Hiển thị loading indicator
    }

    return (

        <View style={{height:CARD_HEIGHT+50}}>
            <Text style = {styles.titleText}>Phổ biến</Text>
            <FlatList
            data={locations}
            
            horizontal
            snapToInterval={CARD_WIDTH_SPACING}
            decelerationRate={"fast"}
            keyExtractor={item => item._id}
            renderItem={({item, index}) => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate('detail-screen', { id: item._id })} style = {[
                        styles.cardContainer,
                        {
                        marginLeft: 24,
                        marginRight:  index === locationData.length - 1 ? 24 : 0}]}>
                        <View>
                            <View style = {[styles.imageBox, ]}>
                            <Image
                            source={
                            item?.image?.[0]?.url
                                ? { uri: item.image[0].url }
                                : require('@/assets/images/bai-truoc-20.jpg') // Hình ảnh mặc định
                            }
                            
                            style={styles.image}
                            /> 
                                <View style= {styles.titleBox}>
                                    <View style = {[styles.textBox, {top: 10, width: 70}]}>
                                        <Image source={require('@/assets/icons/star.png')}
                                        style = {styles.star}></Image>
                                        <Text style = {[styles.textrating, {fontSize: 15}]}>{item.rating}</Text>
                                    </View>
                                    
                                    <TouchableOpacity onPress={()=>handlePress(item._id.toString())} style= {[styles.textBox2,{ bottom: 25,}]}>
                                        <Image source={require('@/assets/icons/heart.png')}
                                        style={[
                                        styles.heart, 
                                        { tintColor: likedItems[item._id] ? 'red' : 'white' } 
                                    ]}></Image>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style = {styles.footer}>
                                <View>
                                    <Text style = {[styles.textStyle, {fontSize: 14}]}>{item.name}</Text>
                                </View>
                                <View style = {[styles.textBox,{borderWidth:3, borderColor:'white'}]}>
                                    <Text style = {[styles.textStyle2, {marginHorizontal: 5, color: 'white'}]}>hot deal</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>                            
                )}
            }></FlatList>
            
        </View>
    )
}

const styles = StyleSheet.create({

    cardContainer: {
        borderWidth: 2, // Viền trắng
        borderColor: 'white',
        borderRadius: 24, // Bo góc
        shadowColor: '#000', // Màu bóng
        shadowOffset: {
          width: 0,
          height: 10, // Đổ bóng theo chiều dọc
        },
        shadowOpacity: 0.1, // Độ mờ của bóng
        shadowRadius: 10, // Bán kính bóng
        elevation: 5, // Đổ bóng trên Android
        backgroundColor: 'white', // Nền trắng
        height: CARD_HEIGHT-20,
      },
    
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        left: 20,
        marginBottom:10,

    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT-70,
        marginVertical: 10,
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
    titleBox: {
        position: 'absolute',
        top: CARD_HEIGHT - 120,
        left: 6
    },
    textBox: {
        flexDirection: 'row',
        backgroundColor: '#4D5652',
        borderRadius: 20,
        alignItems: 'center',
        height: 30,
        marginVertical: 5,
        left:3,
        // borderWidth:3,
        // borderColor:'white',
        bottom:20,
    },
    textBox2: {
        alignItems: 'center',
        height: 30,
        left:140,
        // borderWidth:3,
        // borderColor:'white',
        bottom:25,
    },
    star: {
        width: 18,
        height: 18,
        left: 10
    },
    heart: {
        width: 30,
        height: 30,
        left: 10
    },
    textStyle: {
        fontWeight: 'medium',
        color: 'black',
        marginLeft: 5,
        left:7,
        top:2,
        marginVertical: 2,
    },
    textrating: {
        fontWeight: 'medium',
        color: 'white',
        marginLeft: 5,
        left:7,
        top:2,
        marginVertical: 2,
    },
    textStyle2: {
        fontWeight: 'medium',
        color: 'black',
        marginLeft: 5,
        
    },
    footer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
    }
})