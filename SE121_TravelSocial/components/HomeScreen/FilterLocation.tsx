import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList
} from 'react-native';
import { API_BASE_URL } from '@/constants/config';
import * as Network from 'expo-network';

interface Location {
  _id: string;
  name: string;
  rating: number;
  image:{
    url: string;
    publicId: string;
  } [];
}

interface FilterLocationProps {
  query: string;
  onSelect: (location: Location) => void;
}

const FilterLocation: React.FC<FilterLocationProps> = ({ query, onSelect }) => {
  const [filterLocations, setFilterLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Call API to fetch locations based on query
  useEffect(() => {
    const fetchLocations = async () => {
      if (!query) {
        setFilterLocations([]);
        return;
      }

      try {
        const ipAddress = await Network.getIpAddressAsync();
        console.log('Device IP Address:', ipAddress);

        const response = await fetch(`${API_BASE_URL}/locationbyname?name=${query}`);
        const data = await response.json();
        if (data.isSuccess) {
          setFilterLocations(data.data);  // Update locations
        } else {
          //sconsole.error('Error fetching locations:', data.error);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Failed to fetch locations');
      }
      setLoading(false);
    };

    fetchLocations(); // Call fetch when query changes
  }, [query]);

  const renderItem = ({ item }: { item: Location }) => {
    return (
      <TouchableOpacity onPress={() => onSelect(item)} style={styles.locationItem}>
        <View style={styles.imageContainer}>
          <Image source={{  uri: item.image?.[0]?.url }} style={styles.locationImage} />
        </View>
        <View style={styles.content}>
            <Text style={styles.locationName}>{item.name}</Text>
            <View style={styles.ratingframe}>
                <Image source={require('@/assets/icons/star.png')} style = {styles.star}></Image>
                <Text style={styles.locationRating}>{`${item.rating}`}</Text>
            </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : filterLocations.length > 0 ? (
        <FlatList
          data={filterLocations}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      ) : (
        <Text>Không tìm thấy địa điểm nào</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
  },
  content: {
    justifyContent: 'space-between',
  },
  locationItem: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  imageContainer: {
    marginRight: 10,
  },
  locationImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingframe: {
    flexDirection: 'row',
  },
  star: {
    width: 24,
    height: 24,
    
    },
  locationRating: {
    marginLeft: 10,
    marginTop: 5,
    fontSize: 14,
    color: '#888',
  },
});

export default FilterLocation;
