import React, { useEffect, useRef, useState } from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Text, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import locationData from '@/constants/location'
import * as Network from 'expo-network';
import { API_BASE_URL } from '../../constants/config';

const { width, height } = Dimensions.get('window')
const CARD_WIDTH = width - 240;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + 24;

interface DailySectionProps {
    categoryId: string | undefined; // Nhận categoryId từ HomeScreen
    navigation: any;
}

export default function DailySection({ categoryId, navigation }: DailySectionProps) {

    const [locations, setLocations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    
    useEffect(() => {
        if (categoryId === "all") {
            getAllLocations(1);
            return;
        }
        if (categoryId) {
            fetchPopularLocations(categoryId, 1);
        }
    }, [categoryId]);

    const fetchPopularLocations = async (id: string, pageNumber: number) => {
        if (isFetchingMore || !hasMore) return;

        setIsFetchingMore(true);
        try {
            const response = await fetch(`${API_BASE_URL}/locationbycategory/${id}?page=${pageNumber}&limit=10`);
            const data = await response.json();

            if (data.isSuccess) {
                if (pageNumber === 1) {
                    setLocations(data.data.data);
                } else {
                    setLocations(prev => [...prev, ...data.data.data]);
                }

                setHasMore(data.data.data.length > 0);
                setPage(pageNumber + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setIsFetchingMore(false);
            setLoading(false);
        }
    };

    const getAllLocations = async (pageNumber: number, isLoadMore = false) => {
        try {
            if (isFetchingMore || !hasMore) return;
      
            setIsFetchingMore(true);
      
            const response = await fetch(`${API_BASE_URL}/alllocation?page=${pageNumber}&limit=10`);
            const data = await response.json();
      
            if (data.isSuccess) {
                if (pageNumber === 1) {
                    setLocations(data.data.data);
                } else {
                    const newLocations = data.data.data;
                    setLocations(prev => {
                        const existingIds = new Set(prev.map(item => item._id));
                        const uniqueNewLocations = newLocations.filter((item: { _id: any; }) => !existingIds.has(item._id));
                        return isLoadMore ? [...prev, ...uniqueNewLocations] : newLocations;
                    });
                }
      
                setHasMore(data.data.data.length > 0);
                setPage(pageNumber + 1); 
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsFetchingMore(false);
            setLoading(false);
        }
    };

    const renderItem = ({ item, index }: { item: any, index: number }) => (
        <TouchableOpacity
            style={{
                marginLeft: 24,
                marginRight: index === locations.length - 1 ? 24 : 0,
                marginBottom: 15,
            }}
            onPress={() => navigation.navigate('detail-screen', { id: item._id })}
        >
            <View style={styles.card}>
                <View style={styles.imageBox}>
                    <Image
                        style={styles.image}
                        source={
                            item?.image?.[0]?.url
                                ? { uri: item.image[0].url }
                                : require('../../assets/images/bai-truoc-20.jpg')
                        }
                    />
                </View>
                <View style={styles.footer}>
                    <Text style={[styles.textStyle, { fontSize: 16 }]}>
                        {item?.name || 'Khách sạn mới'}
                    </Text>
                </View>
                <View style={styles.footer}>
                    <Text style={[styles.textStyle, { fontSize: 12 }]}>
                        {item?.province || 'Tỉnh/Thành phố'}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (loading && locations.length === 0) {
        return (
            <View style={{ padding: 20 }}>
                <Text style={styles.titleText}>Gợi ý hằng ngày</Text>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View>
            <Text style={styles.titleText}>Gợi ý hằng ngày</Text>
            <FlatList
                data={locations}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item._id.toString()}
                contentContainerStyle={styles.container}
                renderItem={renderItem}
                numColumns={2}
                onEndReached={() => {
                    if (categoryId === 'all') {
                        getAllLocations(page, true);
                    } else if (categoryId) {
                        fetchPopularLocations(categoryId, page);
                    }
                }}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    isFetchingMore ? (
                        <ActivityIndicator size="small" color="#000" style={{ marginHorizontal: 24 }} />
                    ) : null
                }
                removeClippedSubviews={true}
                maxToRenderPerBatch={10}
                initialNumToRender={6}
                windowSize={10}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingBottom: 20,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        left: 20,
        marginBottom: 10,
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 1,
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
        marginTop: 6,
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