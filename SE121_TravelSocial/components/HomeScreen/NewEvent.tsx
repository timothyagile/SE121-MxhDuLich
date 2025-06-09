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
import { API_BASE_URL } from '../../constants/config';
import LuckyWheelScreen from '@/screen/LuckyWheelScreen';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width - 30;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + 24;

const eventData = [
    {
      id: '1',
      bannerUrl: 'https://vongquaymayman.co/wp-content/uploads/2024/10/vong-quay-may-man.jpg', // Thay bằng đường dẫn đến banner sự kiện
      title: 'Vòng quay may mắn',
    },
    {
      id: '2',
      bannerUrl: 'https://via.placeholder.com/245x200',
      title: 'Sự kiện 2',
    },
    {
      id: '3',
      bannerUrl: 'https://via.placeholder.com/245x200',
      title: 'Sự kiện 3',
    },
    {
      id: '4',
      bannerUrl: 'https://via.placeholder.com/245x200',
      title: 'Sự kiện 4',
    },
    {
      id: '5',
      bannerUrl: 'https://via.placeholder.com/245x200',
      title: 'Sự kiện 5',
    },
  ];

interface PopularSectionProps {
  categoryId: string | undefined;
  navigation: any;
}

// Đặt cacheRef ngoài component để giữ cache khi SectionList remount
const newEventSectionCacheRef = { data: [] };

const NewEventSection = React.memo(function NewEventSection({ categoryId, navigation }: any) {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const cacheRef = newEventSectionCacheRef;

    useEffect(() => {
        if (cacheRef.data.length > 0) {
            setEvents(cacheRef.data);
            setLoading(false);
            return;
        }
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        // ...fetch API logic...
        // Sau khi fetch thành công:
        // cacheRef.data = data;
        setLoading(false);
    };

  return (
    <View style={{ height: CARD_HEIGHT + 70 }}>
      <Text style={styles.titleText}>sự kiện nổi bật</Text>
      <FlatList
        data={eventData}
        horizontal={true} // Scroll ngang
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={()=> (navigation.navigate('lucky-wheel-screen'))} style={{ marginLeft: 24, marginRight: index === eventData.length - 1 ? 24 : 0 }}>
            <View style={styles.card}>
              <Image style={styles.image} source={{ uri: item.bannerUrl }} />
              <View style={styles.footer}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      
    </View>
  );
});

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
      },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    left: 20,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 5, 
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    padding: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NewEventSection;
