import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import Ticket from '@/components/BookingScreen/Booking'; // Import component Ticket

export default function TicketScreen() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Hàm gọi API lấy danh sách ticket
  const fetchTickets = async () => {
    try {
        
      const response = await fetch('http://192.168.1.6:3000/booking/getall'); // Thay bằng URL API của bạn
      const result = await response.json();

      setTickets(result.data); // Gán dữ liệu từ API
      console.log('ticket: ',tickets)
      if (result.isSuccess && result.data) {
        const ticketWithNames = await Promise.all(
          result.data.map(async (ticket: any) => {
            // Gọi API room để lấy locationId
            const room = await fetchRoomDetails(ticket.roomId);

            // Gọi API location để lấy tên địa điểm
            const location = room && room.locationId ? await fetchLocationDetails(room.locationId) : null;

            return {
              ...ticket,
              locationName: location ? location.name : 'Unknown Location', // Bổ sung tên địa điểm
            };
          })
        );
        setTickets(ticketWithNames);
      } else {
        console.error('API returned an error:', result.error);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } 
  };

  const fetchRoomDetails = async (roomId: string) => {
    try {
      const response = await fetch(`http://192.168.1.6:3000/room/getbyid/${roomId}`);
      const result = await response.json();
      if (result && result.isSuccess) {
        return result.data; // Giả sử API trả về { data: { locationId: "xyz" } }
      }
      return null;
    } catch (error) {
      console.error(`Error fetching room details for roomId: ${roomId}`, error);
      return null;
    }
  };
  
  const fetchLocationDetails = async (locationId: string) => {
    try {
      const response = await fetch(`http://192.168.1.6:3000/locationbyid/${locationId}`);
      const result = await response.json();
      if (result && result.isSuccess) {
        return result.data; // Giả sử API trả về { data: { name: "Location Name" } }
      }
      return null;
    } catch (error) {
      console.error(`Error fetching location details for locationId: ${locationId}`, error);
      return null;
    }
  };

  // Gọi API khi component được render
  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/icons/logo.png')} style={styles.logo} />
      <Text style={styles.collections}>Tất cả Booking</Text>
        <FlatList
            data={tickets}
            keyExtractor={(item) => item._id} // Sử dụng _id làm key
            renderItem={({ item }) => (
                <Ticket
                title={`Room ID: `} // Hiển thị roomId (hoặc tuỳ chỉnh)
                date={`${new Date(item.checkInDate).toLocaleDateString()} - ${new Date(item.checkOutDate).toLocaleDateString()}`}
                status={item.status}
                imageUrl={item.imageUrl || 'https://via.placeholder.com/150'} // Dùng ảnh mặc định nếu thiếu
                onCancel={() => console.log(`Cancel ticket: ${item._id}`)}
                />
            )}
        />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    marginTop: 20,
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  collections: {
    marginTop: 30,
    marginLeft: 25,
    fontSize: 26,
    fontWeight: 'bold',
  },
});
