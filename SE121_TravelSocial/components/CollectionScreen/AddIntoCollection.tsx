// CustomModal.tsx
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';


interface CustomModalProps {
    visible: boolean; 
    onClose: () => void;  
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

const CustomModal: React.FC<CustomModalProps> = ({ visible, onClose }) => {
    const navigation = useNavigation<CollectionScreenNavigationProp>();
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
               
                <View style={styles.modalContent}>
                    <View style ={{width:'50%', alignItems:'center', flexDirection:'column'}}>
                        <TouchableOpacity 
                            style={styles.square} 
                            onPress={() => navigation.navigate('add-new-collection-screen')}>
                            
                            <Image source={require('../../assets/icons/plus.png')} style={styles.iconplus} />
                        </TouchableOpacity>
                        <Text style={{marginTop:10, fontSize: 20,}}>Thêm mới</Text>
                    </View>
                    <TouchableOpacity style={styles.exitButton} onPress={onClose}>
                        <Image source={require('@/assets/icons/exit.png')} style={styles.exitIcon} />
                    </TouchableOpacity>
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
