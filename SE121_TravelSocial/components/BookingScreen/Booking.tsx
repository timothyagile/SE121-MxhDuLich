import { RootStackParamList } from '@/types/navigation';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface TicketProps {
  title: string;
  date: string;
  status: string;
  onCancel: () => void;
  imageUrl: string;
  bookingId: string;
  
}

const Ticket: React.FC<TicketProps> = ({ title, date, status, onCancel, imageUrl, bookingId }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleNavigate = () => {
    navigation.navigate('detail-booking-screen', {bookingId}); // Truyền bookingId
  };
  return (
    <TouchableOpacity onPress={handleNavigate}>
      <View style={styles.body}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.title2}>{date}</Text>
            <View style={styles.detailsContainer}>
              <View style={styles.ratingBox}>
                <Text style={{ color: '#666', fontSize: 14 }}>Trạng thái: </Text>
                <Text style={styles.stateText}>{status}</Text>
              </View>
              <TouchableOpacity style={styles.featureBox} onPress={onCancel}>
                <Text style={styles.boxText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
  body: {
    marginTop: 20,
  },
  imageContainer: {
    marginLeft: 20,
    width: 130,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  stateText: {
    color: '#F8D675',
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  title2: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: '300',
    flexShrink: 1,
    flexWrap: 'wrap',
    marginLeft: 2,
  },
  detailsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
  },
  ratingBox: {
    flexDirection: 'row',
    backgroundColor: '#F1F1F1',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureBox: {
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: '#F1F1F1',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    fontWeight: '600',
    color: '#F00',
  },
});

export default Ticket;
