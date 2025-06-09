import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { API_BASE_URL } from '../constants/config';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
export default function FriendsListScreen({ navigation }: any) {
  const route = useRoute();
  const { userId } = route.params as { userId: string };
  const [friends, setFriends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/friends?type=accept&userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setFriends(Array.isArray(data.data) ? data.data : []);
        }
      } catch (e) {
        setFriends([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, [userId]);

  // Hủy kết bạn
  const handleUnfriend = async (friendId: string) => {
    // Thêm xác nhận trước khi gọi API
    if (!window.confirm) {
      // Nếu không có window.confirm (React Native), dùng Alert
      // @ts-ignore
      
      Alert.alert(
        'Xác nhận',
        'Bạn có chắc chắn muốn hủy kết bạn với người này?',
        [
          { text: 'Hủy', style: 'cancel' },
          {
            text: 'Đồng ý',
            style: 'destructive',
            onPress: () => doUnfriend(friendId),
          },
        ]
      );
      return;
    }
    // Nếu có window.confirm (web), dùng confirm
    if (window.confirm('Bạn có chắc chắn muốn hủy kết bạn với người này?')) {
      doUnfriend(friendId);
    }
  };

  // Hàm thực hiện gọi API hủy kết bạn
  const doUnfriend = async (friendId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/unfriend/${friendId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok && data.isSuccess) {
        setFriends((prev) => prev.filter((f) => f.userId !== friendId));
      } else {
        alert('Hủy kết bạn thất bại!');
      }
    } catch (e) {
      alert('Có lỗi xảy ra!');
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <Image source={{ uri: item.userAvatar?.url }} style={styles.avatar} />
      <Text style={styles.name}>{item.userName}</Text>
      <TouchableOpacity style={styles.unfriendBtn} onPress={() => handleUnfriend(item.userId)}>
        <Text style={styles.unfriendText}>Hủy kết bạn</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.header}>Danh sách bạn bè</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={friends}
          keyExtractor={(item) => item.userId}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.empty}>Không có bạn bè nào.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#eee' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12, backgroundColor: '#eee' },
  name: { fontSize: 16 },
  empty: { textAlign: 'center', marginTop: 40, color: '#888' },
  unfriendBtn: { marginLeft: 'auto', backgroundColor: '#eee', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  unfriendText: { color: '#d00', fontWeight: 'bold', fontSize: 13 },
});
