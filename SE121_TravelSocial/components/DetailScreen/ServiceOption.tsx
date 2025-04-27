import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Modal, Pressable } from 'react-native';

const { width } = Dimensions.get('window');

// Định nghĩa một đối tượng ánh xạ các tên icon với các tệp ảnh trong thư mục assets
const iconMapping: Record<string, any> = {
  bicycle: require('../../assets/services/bicycle.png'),
  car: require('../../assets/services/car.png'),
  tshirt: require('../../assets/services/tshirt.png'),
  camera: require('../../assets/services/camera.png'),
  paw: require('../../assets/services/pet.png'),
  motorcycle: require('../../assets/services/motobike.png'),
  spa: require('../../assets/services/spa.png'),
  carSide: require('../../assets/services/carside.png'),
  ship: require('../../assets/services/ship.png'),
  cleanroom: require('../../assets/services/clean-room.png'),
  massage: require('../../assets/services/massage.png'),
  washingmachine: require('../../assets/services/washing-machine.png'),
};

// Mảng chứa các dịch vụ
const services = [
  { icon: 'bicycle', text: 'Thuê xe đạp giá rẻ' },
  { icon: 'car', text: 'Xe đưa rước tận nơi' },
  { icon: 'tshirt', text: 'Dịch vụ giặt là giá rẻ' },
  { icon: 'camera', text: 'Thuê máy ảnh giá rẻ' },
  { icon: 'pet', text: 'Dịch vụ chăm sóc thú cưng' },
  { icon: 'motobike', text: 'Dịch vụ cho thuê xe máy' },
  { icon: 'spa', text: 'Dịch vụ chăm sóc sắc đẹp' },
  { icon: 'carside', text: 'Dịch vụ cho thuê xe hơi' },
  { icon: 'ship', text: 'Dịch vụ cho thuê thuyền' },
];

interface Service {
  icon: string;
  name: string;
  description?: string;
  price: number;
  unit?: string;
}

interface ServiceOptionProps {
  services: Service[];
}

const ServiceOption: React.FC<ServiceOptionProps> = ({ services }) => {

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = (service: Service) => {
    setSelectedService(service);
    setModalVisible(true);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dịch vụ kèm theo (tùy chọn)</Text>
      <View style={styles.services}>
        {services?.map((service, index) => (
          <TouchableOpacity onPress={() => handlePress(service)} key={index} style={styles.service}>
            {/* Sử dụng đối tượng ánh xạ để lấy icon */}
            <Image source={iconMapping[service.icon]} style={styles.icon} />
            <Text style={styles.serviceText}>{service.name}</Text>
            {/* <Text style={styles.serviceText}>{service.description}</Text> */}
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {selectedService && (
              <>
                <Image
                  source={iconMapping[selectedService.icon]}
                  style={{ width: 50, height: 50, marginBottom: 10 }}
                />
                <Text style={styles.modalText}>{selectedService.name}</Text>
                <View>
                  <Text style={{color: "green", fontSize: 20, fontWeight:"600", marginBottom: 20}}>Giá: {selectedService.price.toLocaleString('vi-VN')}đ/{selectedService.unit}</Text>
                </View>
                <Text style={styles.modalText}>{selectedService.description}</Text>
              </>
            )}
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={{ color: 'white' }}>Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4ff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  services: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  service: {
    backgroundColor: '#e6f0ff',
    borderRadius: 10,
    padding: 5,
    width: (width - 90) / 2, 
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  serviceText: {
    fontSize: 12,
    color: '#007bff',
    marginTop: 10,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    elevation: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});

export default ServiceOption;
