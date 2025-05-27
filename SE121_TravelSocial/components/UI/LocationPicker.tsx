import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  StyleSheet, 
  Modal, 
  ActivityIndicator,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { API_BASE_URL } from '../../constants/config';
import { GlobalStyles } from '../../constants/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Location {
  _id: string;
  name: string;
  image?: {
    url: string;
    publicId: string;
  }[];
  address?: string;
}

interface LocationPickerProps {
  selectedLocationId: string;
  onLocationSelect: (locationId: string, locationName: string) => void;
}

const LocationPicker = ({ selectedLocationId, onLocationSelect }: LocationPickerProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (modalVisible) {
      fetchLocations();
    }
  }, [modalVisible]);

  useEffect(() => {
    // Tìm và đặt thông tin địa điểm đã chọn nếu có locationId
    if (selectedLocationId && locations.length > 0) {
      const location = locations.find(loc => loc._id === selectedLocationId);
      if (location) {
        setSelectedLocation(location);
      }
    }
  }, [selectedLocationId, locations]);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem('userId');
      
      // Thử lấy các địa điểm từ booking của người dùng
      const bookingResponse = await fetch(`${API_BASE_URL}/booking/user/${userId}`, {
        method: 'GET',
        credentials: 'include',
      });
      
      if (bookingResponse.ok) {
        const bookingData = await bookingResponse.json();
        
        if (bookingData.isSuccess && bookingData.data.length > 0) {
          // Trích xuất locationIds từ bookings
          const locationIds = new Set();
          const uniqueLocations: Location[] = [];
          
          // Trích xuất thông tin địa điểm từ bookings
          for (const booking of bookingData.data) {
            if (booking.items && booking.items.length > 0) {
              for (const item of booking.items) {
                if (item.roomDetails?.locationId && !locationIds.has(item.roomDetails.locationId)) {
                  locationIds.add(item.roomDetails.locationId);
                  
                  // Lấy thông tin chi tiết về địa điểm
                  const locationResponse = await fetch(`${API_BASE_URL}/locationbyid/${item.roomDetails.locationId}`, {
                    credentials: 'include',
                  });
                  
                  if (locationResponse.ok) {
                    const locationData = await locationResponse.json();
                    if (locationData.isSuccess) {
                      uniqueLocations.push(locationData.data);
                    }
                  }
                }
              }
            }
          }
          
          setLocations(uniqueLocations);
        }
      }
      
      // Nếu không lấy được từ bookings, lấy tất cả các địa điểm
      if (locations.length === 0) {
        const allLocationsResponse = await fetch(`${API_BASE_URL}/alllocation?page=1&limit=10`, {
          credentials: 'include',
        });
        
        if (allLocationsResponse.ok) {
          const allLocationsData = await allLocationsResponse.json();
          if (allLocationsData.isSuccess) {
            setLocations(allLocationsData.data.data);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    onLocationSelect(location._id, location.name);
    setModalVisible(false);
  };

  const filteredLocations = searchTerm.length > 0
    ? locations.filter(location => 
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (location.address && location.address.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : locations;

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.pickerButton} 
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.selectedLocationContainer}>
          <Ionicons name="location" size={20} color={GlobalStyles.colors.purple} />
          <Text style={styles.selectedLocationText}>
            {selectedLocation ? selectedLocation.name : 'Chọn địa điểm'}
          </Text>
        </View>
        <Ionicons name="chevron-down" size={20} color={GlobalStyles.colors.gray} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chọn địa điểm</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={GlobalStyles.colors.gray} />
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color={GlobalStyles.colors.gray} />
              <TextInput
                style={styles.searchInput}
                placeholder="Tìm kiếm địa điểm..."
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
              {searchTerm.length > 0 && (
                <TouchableOpacity onPress={() => setSearchTerm('')}>
                  <Ionicons name="close-circle" size={20} color={GlobalStyles.colors.gray} />
                </TouchableOpacity>
              )}
            </View>

            {loading ? (
              <ActivityIndicator size="large" color={GlobalStyles.colors.blue} style={styles.loader} />
            ) : filteredLocations.length > 0 ? (
              <FlatList
                data={filteredLocations}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={[
                      styles.locationItem, 
                      selectedLocationId === item._id && styles.selectedItem
                    ]}
                    onPress={() => handleLocationSelect(item)}
                  >
                    <Image 
                      source={
                        item.image && item.image.length > 0 
                          ? { uri: item.image[0].url } 
                          : require('../../assets/no-photo.jpg')
                      } 
                      style={styles.locationImage} 
                    />
                    <View style={styles.locationDetails}>
                      <Text style={styles.locationName}>{item.name}</Text>
                      {item.address && (
                        <Text style={styles.locationAddress} numberOfLines={1}>
                          {item.address}
                        </Text>
                      )}
                    </View>
                    {selectedLocationId === item._id && (
                      <Ionicons name="checkmark-circle" size={24} color={GlobalStyles.colors.blue} />
                    )}
                  </TouchableOpacity>
                )}
                contentContainerStyle={styles.listContainer}
              />
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Không tìm thấy địa điểm</Text>
                <TouchableOpacity style={styles.refreshButton} onPress={fetchLocations}>
                  <Text style={styles.refreshText}>Làm mới</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: '100%',
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: GlobalStyles.colors.primary200,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary600,
  },
  selectedLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedLocationText: {
    fontSize: 16,
    marginLeft: 8,
    color: 'black',
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: GlobalStyles.colors.primary200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: 'black',
  },
  loader: {
    marginTop: 50,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.primary300,
  },
  selectedItem: {
    backgroundColor: 'rgba(0, 112, 243, 0.1)',
  },
  locationImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  locationDetails: {
    flex: 1,
    marginLeft: 15,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  locationAddress: {
    fontSize: 14,
    color: 'black',
    marginTop: 3,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: GlobalStyles.colors.gray,
    marginBottom: 15,
  },
  refreshButton: {
    backgroundColor: GlobalStyles.colors.blue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  refreshText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LocationPicker;