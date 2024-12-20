

import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  Animated,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import locationData from '@/constants/location';
import CustomModal from '../CollectionScreen/AddIntoCollection';
import * as Network from 'expo-network';
import { NetworkInfo } from 'react-native-network-info';
import {API_BASE_URL} from '../../constants/config';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = 245;
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
  const [locations, setLocations] = useState<any[]>([
    // Example data for testing
    { id: '1', name: 'Location 1', rating: 4.5, _id: '1' },
    { id: '2', name: 'Location 2', rating: 3.5, _id: '2' },
    { id: '3', name: 'Location 3', rating: 5.0, _id: '3' },
  ]);

    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

  const scrollX = useRef(new Animated.Value(0)).current;

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

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH_SPACING,
      index * CARD_WIDTH_SPACING,
      (index + 1) * CARD_WIDTH_SPACING,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8], 
      extrapolate: 'clamp',
    });

    const shadowOpacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.1, 0.3, 0.1], 
      extrapolate: 'clamp',
    });   

    return (
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ scale }],
            shadowOpacity,
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.navigate('detail-screen', { id: item._id })}>
          <View style={styles.imageBox}>
            <Image
              source={require('@/assets/images/bai-truoc-20.jpg')}
              style={styles.image}
            />
          </View>
          <View style={styles.titleBox}>
            <View style = {styles.textBox}>
                <Text style={[styles.textStyle, { fontSize: 12 }]}>{item.name}</Text>
            </View>
            <View style={{flexDirection:'row', marginTop: 2}}>
                <View style={styles.textBox}>
                <Image
                    source={require('@/assets/icons/star.png')}
                    style={styles.star}
                />
                <Text style={[styles.textStyle, { fontSize: 12 }]}>{item.rating}</Text>
                </View>
                <TouchableOpacity
                onPress={() => handlePress(item._id.toString())}
                style={{ position:'absolute', right: 0, }}
                >
                <Image
                    source={require('@/assets/icons/heart.png')}
                    style={[
                    styles.heart,
                    { tintColor: likedItems[item._id] ? 'red' : 'white' },
                    ]}
                />
                </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={{height:CARD_HEIGHT+70}}>
      <Text style={styles.titleText}>Phổ biến</Text>
      <Animated.FlatList
        data={locations}
        horizontal
        snapToInterval={CARD_WIDTH_SPACING}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        keyExtractor={(item, index) => item._id}
        renderItem={renderItem}
      />
      <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)} ></CustomModal>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    left: 20,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginVertical: 10,
    marginHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, 
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
    bottom: 10,
    left: 10,
    right: 10,
  },
  textBox: {
    flexDirection: 'row',
    backgroundColor: '#4D5652',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textStyle: {
    fontWeight: 'bold',
    color: 'white',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  star: {
    width: 16,
    height: 16,
    marginRight: 2,
    left:5,
  },
  heart: {
    width: 30,
    height: 30,
  },
});
