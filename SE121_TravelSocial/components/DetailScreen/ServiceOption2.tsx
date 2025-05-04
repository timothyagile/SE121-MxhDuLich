import React, { useEffect, useState } from 'react';
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

interface SelectedService {
  service: Service;
  quantity: number;
}

interface ServiceOptionProps {
  services: Service[];
  selectedServicess: SelectedService[];
  onChangeSelectedServices?: (selected: SelectedService[]) => void;
}

const ServiceOption2: React.FC<ServiceOptionProps> = ({ services, selectedServicess, onChangeSelectedServices }) => {

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(selectedServicess || []);

  const [modalVisible, setModalVisible] = useState(false);
  const [quantities, setQuantities] = useState<{ [serviceName: string]: number }>({});

  useEffect(() => {
    setSelectedServices(selectedServicess);
  }, [selectedServicess]);

  useEffect(() => {
    if (onChangeSelectedServices) {
      onChangeSelectedServices(selectedServices);
    }
  }, [selectedServices, onChangeSelectedServices]);

  const getQuantity = (serviceName: string) => {
    const found = selectedServices.find(item => item.service.name === serviceName);
    return found ? found.quantity : 0;
  };

  const increaseQuantity = (service: Service) => {
    setSelectedServices(prev => {
      const existing = prev.find(item => item.service.name === service.name);
      if (existing) {
        return prev.map(item =>
          item.service.name === service.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { service, quantity: 1 }];
      }
    });
  };

  const decreaseQuantity = (service: Service) => {
    setSelectedServices(prev => {
      const existing = prev.find(item => item.service.name === service.name);
      if (!existing) return prev;

      if (existing.quantity === 1) {
        return prev.filter(item => item.service.name !== service.name);
      } else {
        return prev.map(item =>
          item.service.name === service.name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  const calculateTotal = () => {
    return selectedServices.reduce((total, item) => {
      return total + item.quantity * item.service.price;
    }, 0);
  };


  const handlePressService = (service: Service) => {
    setSelectedService(service);
    setModalVisible(true);
  };


  
  return (
    <View style={styles.container}>
      <View style={styles.services}>
        {services.map((service, index) => (
          <TouchableOpacity onPress={() => handlePressService(service)} key={index} style={styles.serviceRow}>
            {/* Cột bên trái */}
            <View style={styles.serviceInfo}>
              <Image source={iconMapping[service.icon]} style={styles.icon} />
              <Text style={styles.serviceText}>{service.name}</Text>
            </View>

            {/* Cột bên phải */}
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.button} onPress={() => decreaseQuantity(service)}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <View style={styles.quantityBox}>
                <Text style={styles.quantityText}>{getQuantity(service.name)}</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => increaseQuantity(service)}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
        <Text style={{ fontSize: 22, color: 'green', marginTop: 10, textAlign: 'center', fontWeight: 'bold' }}>
          Tổng tiền: {calculateTotal().toLocaleString('vi-VN')}đ
        </Text>
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
    //height: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  services: {
    //flexDirection: 'row',
    //flexWrap: 'wrap',
    //justifyContent: 'space-between',
    width: 320,
    height: '100%',
  },
  service: {
    backgroundColor: '#e6f0ff',
    borderRadius: 10,
    padding: 5,
    width:'100%',
    // width: (width - 90), 
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
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e6f0ff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  quantityBox: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ServiceOption2;
