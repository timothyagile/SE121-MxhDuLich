// CustomModal.tsx
import { API_BASE_URL } from '@/constants/config';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView, ActivityIndicator, FlatList, Alert } from 'react-native';
import { useUser } from '@/context/UserContext';
import image1 from '../../assets/collectionavts/image1.png';
import image2 from '../../assets/collectionavts/Collecting-pana.png'
import image3 from '../../assets/collectionavts/Collecting-rafiki.png'
import image4 from '../../assets/collectionavts/Collection-amico.png'
import image5 from '../../assets/collectionavts/Collection-pana.png'
import image6 from '../../assets/collectionavts/Online connection-pana.png'
import image7 from '../../assets/collectionavts/Trip-bro.png'

const images = [image1, image2, image3, image4, image5, image6, image7];

interface CustomModalProps {
    visible: boolean; 
    //collections: any[];
    onClose: () => void;  
    onSelectCollection: (collectionId: string ) => void;
    selectedLocationId: string | null;
}
const { height } = Dimensions.get('window');

type RootStackParamList = {
    'add-new-collection-screen': undefined;
    register: undefined;
  };

type CollectionScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'add-new-collection-screen'
>;

const CustomModal: React.FC<CustomModalProps> = ({ visible, onClose, onSelectCollection, selectedLocationId }) => {
    const navigation = useNavigation<CollectionScreenNavigationProp>();
    const [collections, setCollections] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const { userId } = useUser();

    useEffect(() => {
      if (visible) {
        fetchUserCollections();
      }
    }, [visible]);

    const fetchUserCollections = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/collection/getbyuserid/${userId}`);
        const data = await response.json();
        if (data.isSuccess) {
          // Add previewImageUrl like CollectionScreen
          const updatedCollections = data.data.map((collection: any) => {
            const firstLocation = collection.item?.[0];
            const previewImageUrl = firstLocation?.image?.[0]?.url || null;
            return {
              ...collection,
              previewImageUrl,
            };
          });
          setCollections(updatedCollections);
        } else {
          console.error("Error fetching collections:", data.error);
        }
      } catch (error) {
        console.error("Fetch collections error:", error);
      } finally {
        setLoading(false);
      }
    };

    const handleCollectionClick = async (collectionId: string) => {
      try {
        const response = await fetch(`${API_BASE_URL}/collection/createitem/${collectionId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            locationId: selectedLocationId, // Truyền ID địa điểm đã chọn
          }),
        });
    
        const data = await response.json();
    
        if (data.isSuccess) {
          Alert.alert("Thành công", "Địa điểm đã được thêm vào bộ sưu tập.");
        } else {
          console.error("Lỗi khi thêm vào bộ sưu tập:", data.error);
          Alert.alert("Thông báo", "Địa điểm đã tồn tại trong bộ sưu tập!");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        Alert.alert("Lỗi", "Có lỗi xảy ra trong quá trình thêm địa điểm.");
      } finally {
        onClose(); // Đóng modal sau khi thực hiện
      }
    };
    
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.exitButton} onPress={onClose}>
                        <Image source={require('@/assets/icons/exit.png')} style={styles.exitIcon} />
                    </TouchableOpacity>

                    <View style={styles.modalHeader}>
                      <Text style={styles.headerText}>Chọn bộ sưu tập</Text>
                    </View>
                    <View style={styles.list}>
                      {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                      ) : (
                        <FlatList
                          data={[...collections, { _id: "add-new", name: "Thêm mới", isAddNew: true }]}
                          keyExtractor={(item) => item._id}
                          renderItem={({ item, index }) =>
                            item.isAddNew ? (
                              // Giao diện ô "Thêm mới"
                              <View style={{ width: "50%", alignItems: "center", marginVertical: 10 }}>
                                <TouchableOpacity
                                  style={styles.square}
                                  onPress={() => {navigation.navigate("add-new-collection-screen");
                                  onClose();
                                  }}
                                >
                                  <Image
                                    source={require("../../assets/icons/plus.png")}
                                    style={styles.iconplus}
                                  />
                                </TouchableOpacity>
                                <Text style={{ marginTop: 10, fontSize: 20 }}>{item.name}</Text>
                              </View>
                            ) : (
                              // Giao diện collections thông thường
                              <View style={{ width: "50%", alignItems: "center", marginVertical: 10 }}>
                                <TouchableOpacity
                                  style={styles.square}
                                  onPress={() => handleCollectionClick(item._id)}
                                >
                                  <Image
                                    source={
                                      item.previewImageUrl
                                        ? { uri: item.previewImageUrl }
                                        : require("../../assets/images/defaultlocation.png")
                                    }
                                    style={{ width: 150, height: 150, borderRadius: 20 }}
                                  />
                                </TouchableOpacity>
                                <Text style={{ marginTop: 10, fontSize: 20 }}>{item.name}</Text>
                              </View>
                            )
                          }
                          numColumns={2}
                        />
                      )}
                    </View> 
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({

    square: {
        width: 150,
        height: 150,
        backgroundColor: '#D2D2D2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
        
      },
      iconplus: {
        width: 40,
        height: 40,
      },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems:'flex-start',
        alignContent:'flex-start',
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      modalContent: {
        width: '100%',
        height: height * 0.8,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      modalHeader: {
        marginBottom: 20,
      },
      headerText: {
        fontSize: 18,
        fontWeight: "bold",
      },

      list: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        //width:'100%',
      },

      collectionList: {
        width: "100%",
      },
      collectionItem: {
        padding: 15,
        backgroundColor: "#f7f7f7",
        marginVertical: 5,
        borderRadius: 8,
      },
      collectionName: {
        fontSize: 16,
      },
      modalText: {
        fontSize: 18,
        marginBottom: 10,
      },
      modalText2:{
        fontSize: 14,
        marginBottom: 20,
        textAlign:'center',
      },
      closeButton: {
        width:'90%',
        marginTop: 30,
        backgroundColor: '#196EEE',
        borderRadius: 18,
        padding: 10,
        elevation: 2,
      },
      closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize:18,
        paddingHorizontal:5,
        paddingVertical:5,
      },
    
      exitButton: {
        position: 'absolute',
        top: 10,
        left: 10,
      },
      exitIcon: {
        width: 20,
        height: 20,
      },
      image: {
        height: 40,
        width:40,
      }
});

export default CustomModal;
