// Example React Native component to integrate with the recommendation system
// This file should be placed in the travel app's component folder

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { API_URL, saveEvent } from '../../constants/recommendation';
import { Colors } from '../../constants/Colors';

type Recommendation = {
  location_id: number;
  name?: string;
  province?: string;
  rating?: number;
  image_url?: string;
  [key: string]: any;
};
type RootStackParamList = {
  'detail-screen': { id: string }; 
};
const RecommendationCard = ({ item, onPress }: { item: Recommendation; onPress: (item: Recommendation) => void }) => {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => onPress(item)}
    >
      <Image 
        source={item.image_url ? { uri: item.image_url } : require('../../assets/no-photo.jpg')} 
        style={styles.image} 
      />
      <View style={styles.cardContent}>
        <Text style={styles.locationName}>{item.name || 'Location'}</Text>
        <Text style={styles.province}>{item.province || 'Unknown'}</Text>
        {item.rating && (
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {item.rating.toFixed(1)}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const RecommendationList = ({ userId, currentLocationId = null }: any) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
const navigation = useNavigation<NavigationProp<RootStackParamList>>();  
  // Fetch recommendations when component mounts or userId/currentLocationId changes
  useEffect(() => {
    fetchRecommendations();
  }, [userId, currentLocationId]);
  
  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      
      let url = `${API_URL}/api/recommend?user_id=${userId}&case=hybrid`;
      if (currentLocationId) {
        url += `&location_id=${currentLocationId}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success && data.recommendations) {
        setRecommendations(data.recommendations);
      } else {
        setRecommendations([]);
        console.warn('No recommendations received', data);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleLocationPress = async (location: any) => {
    try {
      // Save view event to recommendation system
      await saveEvent({
        user_id: userId,
        location_id: location.location_id,
        event_type: 'view',
        data: { source: 'recommendation' }
      });
      
      // Navigate to location detail screen
      navigation.navigate('detail-screen', { id: location.location_id });
    } catch (error) {
      console.error('Error tracking view event:', error);
    }
  };
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading recommendations...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended for You</Text>
      {recommendations.length > 0 ? (
        <FlatList
          data={recommendations}
          keyExtractor={item => item?.location_id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <RecommendationCard 
              item={item} 
              onPress={handleLocationPress}
            />
          )}
        />
      ) : (
        <Text style={styles.noData}>No recommendations available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginLeft: 16,
  },
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
  },
  noData: {
    padding: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  card: {
    width: 180,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  province: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: '#FF9800',
    fontWeight: 'bold',
  },
});

export default RecommendationList;
