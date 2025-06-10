import {Text, View, FlatList, Dimensions, TouchableOpacity, StyleSheet, Image, ActivityIndicator} from 'react-native'
import locationData from '@/constants/location';
import React, { useEffect, useState } from 'react';
import * as Network from 'expo-network';
import {API_BASE_URL, API_RCM_URL} from '../../constants/config';

const {width, height} = Dimensions.get('window')
const CARD_WIDTH =  width - 190;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + 24;
type LikedItems = {
    [key: string]: boolean; 
};

interface PopularSectionProps {
    navigation: any;
    locationId: string;
  }

export default function Recommendation({ navigation, locationId }: PopularSectionProps) {
    const [likedItems, setLikedItems] = useState<LikedItems>({});
    const [locations, setLocations] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
      const [page, setPage] = useState(1);
      const [hasMore, setHasMore] = useState(true);
      const [isFetchingMore, setIsFetchingMore] = useState(false);

    const handlePress = (id: string) => {
        setLikedItems((prevState) => ({
            ...prevState,
            [id]: !prevState[id] 
        }));
    };

    // Hàm fetch có timeout
const fetchWithTimeout = (url: string, options = {}, timeout = 10000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timeout')), timeout)
        )
    ]);
};

const getContentBasedRecommendations = async (pageNumber: number) => {
  try {
    setLoading(true);
    setIsFetchingMore(true);
    // Gọi API content_based recommendation với product_id
    const response = await fetchWithTimeout(`${API_RCM_URL}/recommend_legacy/?case=content_based&product_id=${locationId}`, {}, 10000); // 10s timeout
    // Đảm bảo response là Response trước khi gọi .json()
    if (!(response instanceof Response)) {
      throw new Error('Không nhận được phản hồi hợp lệ từ máy chủ.');
    }
    let data = null;
    let isJson = false;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      try {
        data = await response.json();
        isJson = true;
      } catch (jsonErr) {
        // JSON parse error
        const text = await response.text().catch(() => '');
        console.log('Recommend API JSON parse error:', jsonErr, text);
        setHasMore(false);
        setLoading(false);
        setIsFetchingMore(false);
        return;
      }
    } else {
      // Not JSON
      const text = await response.text();
      console.error('Recommend API response not ok:', text);
      setHasMore(false);
      setLoading(false);
      setIsFetchingMore(false);
      return;
    }
    if (isJson && data && data.recommendations) {
      if (pageNumber === 1) {
        setLocations(data.recommendations);
      } else {
        // Tránh trùng lặp
        const newItems = data.recommendations;
        setLocations(prev => {
          const existingIds = new Set(prev.map(item => item._id || item.location_id));
          const uniqueNewItems = newItems.filter((item: any) => !existingIds.has(item._id || item.location_id));
          return [...prev, ...uniqueNewItems];
        });
      }
      setHasMore(data.recommendations.length > 0);
      setPage(pageNumber + 1);
    } else {
      setHasMore(false);
    }
  } catch (error: any) {
    setHasMore(false);
    if (error instanceof TypeError && String(error).includes('Network request failed')) {
      console.error('Content-based Recommend API error:', error);
    } else if (error.message === 'Request timeout') {
      console.error('Content-based Recommend API error: Request timeout');
    } else {
      console.error('Content-based Recommend API error:', error);
    }
  } finally {
    setIsFetchingMore(false);
    setLoading(false);
  }
};

    useEffect(() => {
        getContentBasedRecommendations(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locationId]);
      

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />; // Hiển thị loading indicator
    }

    return (

        <View style={{height:CARD_HEIGHT+50}}>
            <Text style = {styles.titleText}>Có thể bạn sẽ thích</Text>
            <FlatList
            data={locations}
            
            horizontal
            snapToInterval={CARD_WIDTH_SPACING}
            decelerationRate={"fast"}
            keyExtractor={item => item?._id || item?.location_id}
            onEndReached={() => {
                if (hasMore) {
                  getContentBasedRecommendations(page);
                } 
              }}
              onEndReachedThreshold={0.5}
            renderItem={({item, index}) => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate('detail-screen', { id: item?._id })} style = {[
                        styles.cardContainer,
                        {
                        marginLeft: 24,
                        marginRight:  index === locationData.length - 1 ? 24 : 0}]}>
                        <View style={{width: 224}}>
                            <View style = {[styles.imageBox, ]}>
                            <Image
                            source={
                            item?.image
                                ? { uri: item?.image?.[0]?.url}
                                : require('@/assets/images/bai-truoc-20.jpg') // Hình ảnh mặc định
                            }
                            
                            style={styles.image}
                            /> 
                                <View style= {styles.titleBox}>
                                    <View style = {[styles.textBox, {top: 10, width: 70}]}>
                                        <Image source={require('@/assets/icons/star.png')}
                                        style = {styles.star}></Image>
                                        <Text style = {[styles.textrating, {fontSize: 15}]}>{item?.rating}</Text>
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
                            <View style = {[styles.footer,{}]}>
                                <View style ={{ width:150}}>
                                    <Text style = {[styles.textStyle, {fontSize: 14}]}>{item?.name}</Text>
                                </View>
                                <View style = {[styles.textBox,{borderWidth:3, borderColor:'white',}]}>
                                    <Text style = {[styles.textStyle2, {marginHorizontal: 5, color: 'white' }]}>hot deal</Text>
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
        marginBottom: 20,
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT-70,
        marginVertical: 10,
    },
    imageBox: {
        width: CARD_WIDTH - 13,
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