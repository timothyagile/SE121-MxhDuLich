

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
  ActivityIndicator,
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

// Mẫu dữ liệu sự kiện dự phòng khi API lỗi
const dummyEventData = [
    {
      id: '1',
      bannerUrl: 'https://vongquaymayman.co/wp-content/uploads/2024/10/vong-quay-may-man.jpg',
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
];

interface Event {
  _id: string;
  title: string;
  description?: string;
  bannerUrl: string;
  startDate: string;
  endDate: string;
  type: 'normal' | 'featured' | 'limited';
  isActive: boolean;
  linkToEvent?: string;
  createdAt: string;
  updatedAt: string;
}

interface PopularSectionProps {
  categoryId: string | undefined;
  navigation: any;
}

export default function NewEventSection({ categoryId, navigation }: PopularSectionProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/events/featured?limit=5`);
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setEvents(data);
        } else if (data && Array.isArray(data.results)) {
          setEvents(data.results);
        } else {
          console.log('Dữ liệu không đúng định dạng:', data);
          // Sử dụng dữ liệu mẫu nếu không lấy được từ API
          setEvents(dummyEventData.map(item => ({
            _id: item.id,
            title: item.title,
            bannerUrl: item.bannerUrl,
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            type: 'featured',
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })));
        }
        setError(null);
      } catch (err) {
        console.error('Lỗi khi tải sự kiện:', err);
        setError('Không thể tải sự kiện');
        // Sử dụng dữ liệu mẫu nếu API lỗi
        setEvents(dummyEventData.map(item => ({
          _id: item.id,
          title: item.title,
          bannerUrl: item.bannerUrl,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          type: 'featured',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })));
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Xử lý điều hướng phụ thuộc vào loại sự kiện
  const handleEventPress = (event: Event) => {
    if (event.linkToEvent) {
      // Nếu có link cụ thể, điều hướng đến trang đó
      if (event.linkToEvent === 'lucky-wheel') {
        navigation.navigate('lucky-wheel-screen');
      } else {
        // Xử lý các loại liên kết khác nếu có
        navigation.navigate(event.linkToEvent);
      }
    } else {
      // Mặc định điều hướng đến màn hình chi tiết sự kiện
      navigation.navigate('lucky-wheel-screen');
    }
  };
  return (
    <View style={{ height: CARD_HEIGHT + 70 }}>
      <Text style={styles.titleText}>sự kiện nổi bật</Text>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={events}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.container}
          renderItem={({ item, index }) => (
            <TouchableOpacity 
              onPress={() => handleEventPress(item)} 
              style={{ marginLeft: 24, marginRight: index === events.length - 1 ? 24 : 0 }}
            >
              <View style={styles.card}>
                <Image style={styles.image} source={{ uri: item.bannerUrl }} />
                {/* Hiển thị nhãn "SẮP HẾT HẠN" nếu ngày kết thúc sắp đến */}
                {new Date(item.endDate).getTime() - new Date().getTime() < 3 * 24 * 60 * 60 * 1000 && (
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>SẮP HẾT HẠN</Text>
                  </View>
                )}
                <View style={styles.footer}>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
      },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    left: 20,
  },  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  badgeContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ff4757',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
