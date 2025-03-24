import { API_BASE_URL } from '@/constants/config';
import { RootStackParamList } from '@/types/navigation';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { Icon } from 'react-native-paper';

interface TicketProps {
  title: string;
  date: string;
  status: string;
  onCancel: () => void;
  imageUrl: string;
  bookingId: string;
  locationId: string;
}

const Ticket: React.FC<TicketProps> = ({ title, date, status, onCancel, imageUrl, bookingId, locationId }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');

  const handleNavigate = () => {
    navigation.navigate('detail-booking-screen', {bookingId ,title, status}); 
    console.log(bookingId)// Truyền bookingId
    console.log(title)
    console.log(status)
  };

  const handleSubmitBooking = async () => {
    try {
      // Gọi API để gửi đánh giá
      const response = await fetch(`${API_BASE_URL}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          locationId,
          rating,
          review,
        }),
      });

      const result = await response.json();
      console.log(response.json);
      if (result.isSuccess) {
        alert('Đánh giá đã được gửi!');
        setModalVisible(false); // Đóng modal sau khi gửi thành công
      } else {
        alert(result.message || 'Không thể gửi đánh giá.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Lỗi khi gửi đánh giá.');
    }
  };

  const handleRateBooking = () =>{
    setModalVisible(true)
  }

  const handleRebook = () => {
    // navigation.navigate('rebook-screen', { bookingId }); // Điều hướng tới màn hình đặt lại
  };

  const handleStarPress = (value:any) => {
    setRating(value);
  };

  const handleCancelBooking = () => {
    Alert.alert(
      'Xác nhận hủy',
      'Bạn có chắc chắn muốn hủy booking này?',
      [
        {
          text: 'Không',
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: async () => {
            try {
              const response = await fetch(`${API_BASE_URL}/booking/update/${bookingId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'canceled' }), // Truyền trạng thái mới
              });
  
              const result = await response.json();
  
              if (result.isSuccess) {
                Alert.alert('Thành công', 'Booking đã được hủy.');
                onCancel(); // Cập nhật danh sách sau khi hủy
              } else {
                Alert.alert('Lỗi', result.message || 'Không thể hủy booking.');
              }
            } catch (error) {
              console.error('Error canceling booking:', error);
              Alert.alert('Lỗi', 'Không thể kết nối với máy chủ.');
            }
          },
        },
      ],
      { cancelable: true } // Cho phép hủy bỏ thông báo bằng cách nhấn ra ngoài
    );
  };
  

  let statusText = '';
  let statusColor = '#000';
  let buttonText = '';
  let buttonAction: () => void = handleNavigate;
  let buttonColor = '#000';

  switch (status) {
    case 'pending':
      statusText = 'Chờ duyệt';
      statusColor = '#F4C726';
      buttonText = 'Hủy';
      buttonColor = '#F45B69';
      buttonAction = handleCancelBooking;
      break;
    case 'confirm':
      statusText = 'Đã xác nhận';
      statusColor = '#F4C726';
      buttonText = 'Hủy';
      buttonColor = '#F45B69';
      buttonAction = handleCancelBooking;
      break;
    case 'complete':
      statusText = 'Hoàn tất';
      statusColor = '#3FC28A';
      buttonText = 'Đánh giá';
      buttonColor = '#007AFF'; // Xanh dương đậm
      buttonAction = handleRateBooking;
      break;
    case 'canceled':
      statusText = 'Đã hủy';
      statusColor = '#F45B69';
      buttonText = 'Đặt lại';
      buttonColor = '#007AFF';
      buttonAction = handleRebook;
      break;
    default:
      statusText = 'Không xác định';
      statusColor = '#666';
      buttonText = '';
      buttonAction = () => {};
      buttonColor = '#666';
      break;
  }
  
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
                <Text  style={[styles.stateText, { color: statusColor }]}>{statusText}</Text>
              </View>
              <TouchableOpacity style={[styles.featureBox]} onPress={buttonAction}>
                <Text style={[styles.boxText, {color:buttonColor}]}>{buttonText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Viết đánh giá</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập đánh giá"
              value={review}
              onChangeText={setReview}
              multiline
            />
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                   <Image
                    source={
                      star <= parseFloat(rating)
                        ? require('../../assets/icons/star.png') // Ngôi sao đầy
                        : require('../../assets/icons/emptystar.png') // Ngôi sao rỗng
                    }
                    style={styles.star}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmitBooking}>
                <Text style={styles.buttonText}>Gửi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  star: {
    width:40,
    height:40,
    marginHorizontal: 5,
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
  rateButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  rateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#196EEE',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Ticket;
