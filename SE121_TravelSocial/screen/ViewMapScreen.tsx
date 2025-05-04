import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, Image } from 'react-native';

import MapView, {Marker} from 'react-native-maps';
import Header2 from '@/components/Header2';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import haversine from 'haversine';

export default function ViewMapScreen() {
  const navigation = useNavigation();
  const [locationDetails, setLocationDetails] = useState<any>(null);
  useEffect(() => {
    getStoredLocationDetails().then((data) => {
      if (data) {
        setLocationDetails(data);
        console.log('Loaded location details from storage:', data);
      }
    });
  }, []);

    // const getAllLocations = async (pageNumber: number) => {
    //   try {
    //     if (isFetchingMore || !hasMore) return;
    
    //     setIsFetchingMore(true);
    
    //     const response = await fetch(`${API_BASE_URL}/alllocation?page=${pageNumber}&limit=10`);
    //     const data = await response.json();
    
    //     if (data.isSuccess) {
    //       if (pageNumber === 1) {
    //         setLocations(data.data.data);
    //         console.log('all location: ', data.data);
    //       } else {
    //         setLocations(prev => [...prev, ...data.data.data]);
    //       }
    
    //       setHasMore(data.data.data.length > 0);
    //       setPage(pageNumber + 1); 
    //     } else {
    //       console.error(data.error);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   } finally {
    //     setIsFetchingMore(false);
    //     setLoading(false);
    //   }
    // };
  
  return (
    <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.arrowleftbutton} onPress={() => navigation.goBack()}>
                <Image source={require('../assets/icons/arrowleft.png')} style={styles.arrowlefticon} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Xem trên bản đồ</Text>
            </View>
            {/* MAP VIEW */}
            <MapView
        style={styles.map}
        initialRegion={{
          latitude: locationDetails?.latitude,
          longitude: locationDetails?.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* MARKER */}
        <Marker
          coordinate={{
            latitude: locationDetails?.latitude,
            longitude: locationDetails?.longitude,
          }}
          title="Vị trí của bạn"
          description="Đây là vị trí bạn đã chọn"
        >
          <Image source={require('../assets/icons/marker.png')} style={styles.markerIcon} />
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  header: {
    top: 40, // tránh status bar
    left: 0,
    right: 0,
    zIndex: 999,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'transparent',
    position: 'absolute',
    paddingHorizontal: 100,

    
    // paddingVertical: 40,

  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  arrowleftbutton: {
    position: 'absolute',
    left: 10,
  },
  arrowlefticon: {
    width: 40,
    height: 40,
  },
  markerIcon: {
    width: 40,
    height: 30,
    resizeMode: 'contain',
  },
});
const getStoredLocationDetails = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@location_details');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error reading location details:', e);
    return null;
  }
};


