import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert, Platform, Modal } from 'react-native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import {iconMapping} from '../constants/icon'




type RootStackParamList = {
    'room-screen': { id: string }; 
  };

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'room-screen'>;

interface Room {
    _id: string;
    name: string;
    bedType: string;
    area: number; 
    quantity: number; 
    price: number; 
    facility: {
        name: string; 
        description?: string; 
        icon: string;
    }[];
    bed: {
        category: string;
        icon: string;
        quantity: number;
    }[];
}

export default function AvailableRoomScreen({ navigation }: {navigation: NativeStackNavigatorProps}) {
    const route = useRoute<DetailScreenRouteProp>();
    const { id } = route.params; 
    const [rooms, setRooms] = useState<Room[]>([]);
    const [services, setServices] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [roomCount, setRoomCount] = useState(0);
    const [selectedRooms, setSelectedRooms] = useState(0);
    const [selectedRoomCounts, setSelectedRoomCounts] = useState<Record<string, number>>({});
    const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
    const [buttonText, setButtonText] = useState("Chọn");
    // const baseUrl = "http://localhost:3000/"; // URL trỏ đến thư mục assets
    // const fullUrl = `${baseUrl}${icon}`;
    

    const getIcon = (iconName: string) => {
        return iconMapping[iconName] || iconMapping["default.png"];
    };
    
    useEffect(() => {
        const fetchRooms = async (id: string) => {
            try {
                console.log('idd: ',id);
                const response = await fetch(`http://192.168.1.3:3000/room/getbylocationid/${id}`); // Thay đổi URL theo API của bạn
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (Array.isArray(data.data)) {
                    setRooms(data.data);
                    
                } else {
                    console.error('Expected data to be an array, but got:', data);
                }
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms(id);
    }, [id]);

    const handleApply = () => {
        // if (roomCount > 0) {
        //     setSelectedRooms(roomCount); 
        //     setButtonText(`Đã chọn ${roomCount} phòng `);
        // }
        {selectedRoomCounts[currentRoomId!] ? `Đã chọn ${selectedRoomCounts[currentRoomId!]} phòng` : "Chọn"}


        // if(roomCount===0){
        //     setSelectedRooms(roomCount); 
        //     setButtonText('Chọn');
        // }
        setModalVisible(false);
    };
    

    
    const toggleModal = (roomId?: string) => {
        setCurrentRoomId(roomId || null);
        setModalVisible(!isModalVisible);
    };


    const incrementRoomCount = (roomId: string) => {
        setSelectedRoomCounts(prevCounts => ({
            ...prevCounts,
            [roomId]: (prevCounts[roomId] || 0) + 1, // Tăng số lượng phòng đã chọn cho roomId
        }));
    };

    const decrementRoomCount = (roomId: string) => {
        setSelectedRoomCounts(prevCounts => {
            const currentCount = prevCounts[roomId] || 0;
            if (currentCount > 0) {
                return {
                    ...prevCounts,
                    [roomId]: currentCount - 1, // Giảm số lượng phòng đã chọn cho roomId
                };
            }
            return prevCounts;
        });
    };

    
    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.arrowleftbutton} onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/icons/arrowleft.png')} style={styles.arrowlefticon} />
                </TouchableOpacity>
                <View style ={{flexDirection:'row', alignItems:'center', alignContent:'center',justifyContent:'center', }}>
                    <View>
                        <Text style={{fontSize:18,fontWeight:'bold',}}>Phòng có sẵn</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.createButton}
                    onPress={() => console.log('Create button pressed')}
                    >
                    <Text style={styles.createButtonText}>Xác nhận</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.body}>


                <View style={styles.container}>
            

            <View style={styles.body}>
                {rooms.map((room, index) => (
                    <View key={index} style={styles.roomcontainer}>
                        <Text style={styles.title}>{room?.name || ''}</Text>
                        <View style={styles.bedandarea}>
                            
                            {room.bed.map((bed, index) => (
                                <View key={index} style={styles.backgroundBox}>
                                    
                                        <Image source={getIcon(bed.icon)}/>
                                        <Text style={styles.bed}>{bed.category} : {bed.quantity} </Text>
                                    
                                </View>
                            ))}
                            
                            <View style={styles.areacontainer}>
                                <Text style={styles.area}>Diện tích: </Text>
                                <Text style={styles.area}>{room.area} m²</Text>
                            </View>
                        </View>

                        <View style = {styles.bedandarea}>
                            <Image source={require('../assets/icons/service.png')}></Image>
                            <Text style={styles.area}>   Dịch vụ:</Text>
                        </View>

                        <View style={styles.featureContainer}>
                        
                            {room.facility.map((facility, index) => (
                                
                                <View key={index} style={styles.backgroundBox}>
                                    <Image
                                        
                                        source={getIcon(facility.icon)}
                                        style={{height:20, width:20, marginRight:3,}}
                                    />
                                    <Text style={styles.area}>{facility.name}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={styles.servicecontainer}>
                            <View style={styles.state}>
                                <Text style={styles.area}>Trạng thái: </Text>
                                <Text style={styles.statetext}>{room.quantity}</Text>
                                <Text style={styles.statetext}> phòng</Text>
                            </View>
                        </View>

                        <View style={styles.endcontainer}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.area}>Giá</Text>
                                <Text style={styles.pricetext}>{room.price} VND</Text>
                            </View>
                            <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>    
                                <TouchableOpacity style={styles.choosebutton} onPress={() => toggleModal(room._id)}>
                                    <Text style={styles.choosetext}>
                                        {selectedRoomCounts[room._id] ? `Đã chọn ${selectedRoomCounts[room._id]} phòng` : "Chọn"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
                <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                    {/* Modal Code */}
                </Modal>
            </View>
                    
                    
            </ScrollView>


            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={()=>toggleModal()} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Chọn số lượng phòng</Text>
                        <View style={styles.modalBody}>
                            <Text style={styles.modalText}>Số lượng phòng</Text>
                            <View style={styles.counterContainer}>
                                <TouchableOpacity onPress={()=>decrementRoomCount(currentRoomId!)} style={styles.counterButton}>
                                    <Text style={styles.counterButtonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.counterValue}>{selectedRoomCounts[currentRoomId!] || 0}</Text>
                                <TouchableOpacity onPress={()=>incrementRoomCount(currentRoomId!)} style={styles.counterButton}>
                                    <Text style={styles.counterButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                            <Text style={styles.applyButtonText}>Xác nhận</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
            </Modal>
         

        
        </View>

        
);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E7E9F3',
    },

    body:{
        

    },

    roomcontainer:{
        backgroundColor:'#FFFFFF',
        borderRadius:8,
        
        marginHorizontal:10,
        marginVertical:0,
        marginBottom:20,
    },

    title:{
        fontSize:20,
        fontWeight:'bold',
        marginLeft:20,
        marginTop:10,
    },

    bedandarea:{
        flexDirection: 'row',
        marginLeft:20,
        marginTop:20,
    },

    bed:{
        fontSize:18,
        marginLeft:10,
    },

    areacontainer:{
        flexDirection:'row',
        position:'absolute',
        right:20,
    },

    area:{
        fontSize:18,
    },

    servicecontainer:{

    },

    featureContainer: {
        marginTop:10,
        marginLeft:10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    backgroundBox: {
        
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        padding: 5,
        margin: 5,
    },

    state:{
        width:170,
        marginTop:20,
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 5,
        margin: 5,
        shadowColor: '#196EEE',
        shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 2,
          shadowRadius: 4,
          elevation: 20,
    },

    statetext:{
        fontSize:18,
        color:'#196EEE',
        shadowColor: '#196EEE',
        shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 2,
          shadowRadius: 5,
          elevation: 10,
    },

    endcontainer:{
        marginTop:10,
        flexDirection:'row',
        marginLeft:20,
        marginBottom:20,
    },

    choosebutton:{
        borderRadius:10,
        backgroundColor: '#176FF2',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent:'center',
        width:250,
        height:50,
    },

    choosetext:{
        color:'white',
        fontSize: 22,
        fontWeight:'600',
    },

    pricetext:{
        color:'#2DD7A4',
        fontSize: 22 ,
        fontWeight:'600',
    },
    
    boxText:{

    },

    header: {
      
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
      width:'100%',
      position: 'relative',
      backgroundColor: '#ffffff', 
      paddingHorizontal:100,
      paddingVertical:40,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 2,
      shadowRadius: 4,
      elevation: 20,
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

      modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    modalBody: {
        width: '100%',
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        marginVertical: 10,
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    counterButton: {
        backgroundColor: '#E7E9F3',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    counterButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    counterValue: {
        fontSize: 18,
        marginHorizontal: 10,
    },
    applyButton: {
        backgroundColor: '#176FF2',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    applyButtonText: {
        color: 'white',
        fontSize: 18,
    },

    createButton: {
        position: 'absolute',
        right: 10,
      },
      createButtonText: {
        color: '#196EEE',
        fontWeight: 'bold',
        fontSize: 16,
      }, 
});



