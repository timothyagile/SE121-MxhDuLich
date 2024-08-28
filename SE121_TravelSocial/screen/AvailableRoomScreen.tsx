import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert, Platform, Modal } from 'react-native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';

export default function AvailableRoomScreen({ navigation }: {navigation: NativeStackNavigatorProps}) {

    const [isModalVisible, setModalVisible] = useState(false);
    const [roomCount, setRoomCount] = useState(0);
    const [selectedRooms, setSelectedRooms] = useState(0);
    const [buttonText, setButtonText] = useState("Select");
    

    const handleApply = () => {
        if (roomCount > 0) {
            setSelectedRooms(roomCount); 
            setButtonText(`Selected ${roomCount} Room${roomCount > 1 ? 's' : ''}`);
        }


        if(roomCount===0){
            setSelectedRooms(roomCount); 
            setButtonText('Select');
        }
        setModalVisible(false);
    };
    

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const incrementRoomCount = () => {
        setRoomCount(prevCount => prevCount + 1);
       
    };

    const decrementRoomCount = () => {
        if (roomCount > 0) {
            setRoomCount(prevCount => prevCount - 1);
            
        }
    };

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.arrowleftbutton} onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/icons/arrowleft.png')} style={styles.arrowlefticon} />
                </TouchableOpacity>
                <View style ={{flexDirection:'row', alignItems:'center', alignContent:'center',justifyContent:'center', }}>
                    <View>
                        <Text style={{fontSize:18,fontWeight:'bold',}}>Available Room</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.body}>
                    <View style={styles.roomcontainer}>
                        <Text style={styles.title}>Room for two people</Text>

                        <View style={styles.bedandarea} >
                            <Image source={require('../assets/icons/bed.png')}></Image>
                            <Text style ={styles.bed}>1 double - bed</Text>
                            <View style={styles.areacontainer}>
                                <Text style={styles.area}>area: </Text>
                                <Text style={styles.area}>16m2</Text>
                            </View>
                        </View>

                        <View style={styles.servicecontainer}>
                            <View style = {styles.bedandarea}>
                                <Image source={require('../assets/icons/service.png')}></Image>
                                <Text style={styles.area}>   Service:</Text>
                            </View>

                            <View style={styles.featureContainer}>
                                <View style={styles.backgroundBox}>
                                    <Image source = {require('../assets/icons/clock.png')} style={{height:20, width:20, marginRight:3,}}></Image>
                                    <Text style={styles.boxText}> free cancle in 24h</Text>
                                </View>

                                <View style={styles.backgroundBox}>
                                    <Image source = {require('../assets/icons/wifi.png')} style={{height:20, width:20, marginRight:3,}}></Image>
                                    <Text style={styles.boxText}> free wifi</Text>
                                </View>

                                <View style={styles.backgroundBox}>
                                    <Image source = {require('../assets/icons/tub.png')} style={{height:20, width:20, marginRight:3,}}></Image>
                                    <Text style={styles.boxText}> tub</Text>
                                </View>

                                <View style={styles.backgroundBox}>
                                    <Image source = {require('../assets/icons/airconditioner.png')} style={{height:20, width:20, marginRight:3,}}></Image>
                                    <Text style={styles.boxText}> air conditioner</Text>
                                </View>

                                <View style={styles.backgroundBox}>
                                    <Image source = {require('../assets/icons/unsound.png')} style={{height:20, width:20, marginRight:3,}}></Image>
                                    <Text style={styles.boxText}> soundproofing system</Text>
                                </View>
                            </View>

                            <View style={styles.state}>
                                <Text style={styles.area}>State: </Text>
                                <Text style={styles.statetext}> 5 </Text>
                                <Text style={styles.statetext}>room lefts</Text>
                            </View>
                            
                        </View>

                        <View style ={styles.endcontainer}>
                            <View style={{flex:1}}>
                                <Text style={styles.area}>Price</Text>
                                <Text style={styles.pricetext}>$50</Text>
                            </View>
                            <View style={{flex:5, justifyContent:'center', alignItems:'center',}}>
                                <TouchableOpacity style={styles.choosebutton} onPress={toggleModal}>
                                <Text style={styles.choosetext}>{buttonText}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.roomcontainer}>
                        <Text style={styles.title}>Room for two people</Text>

                        <View style={styles.bedandarea} >
                            <Image source={require('../assets/icons/bed.png')}></Image>
                            <Text style ={styles.bed}>1 double - bed</Text>
                            <View style={styles.areacontainer}>
                                <Text style={styles.area}>area: </Text>
                                <Text style={styles.area}>16m2</Text>
                            </View>
                        </View>

                        <View style={styles.servicecontainer}>
                            <View style = {styles.bedandarea}>
                                <Image source={require('../assets/icons/service.png')}></Image>
                                <Text style={styles.area}>   Service:</Text>
                            </View>

                            <View style={styles.featureContainer}>
                                <View style={styles.backgroundBox}>
                                    <Image source = {require('../assets/icons/clock.png')} style={{height:20, width:20, marginRight:3,}}></Image>
                                    <Text style={styles.boxText}> free cancle in 24h</Text>
                                </View>

                                <View style={styles.backgroundBox}>
                                    <Image source = {require('../assets/icons/wifi.png')} style={{height:20, width:20, marginRight:3,}}></Image>
                                    <Text style={styles.boxText}> free wifi</Text>
                                </View>

                                <View style={styles.backgroundBox}>
                                    <Image source = {require('../assets/icons/tub.png')} style={{height:20, width:20, marginRight:3,}}></Image>
                                    <Text style={styles.boxText}> tub</Text>
                                </View>

                                <View style={styles.backgroundBox}>
                                    <Image source = {require('../assets/icons/airconditioner.png')} style={{height:20, width:20, marginRight:3,}}></Image>
                                    <Text style={styles.boxText}> air conditioner</Text>
                                </View>

                                <View style={styles.backgroundBox}>
                                    <Image source = {require('../assets/icons/unsound.png')} style={{height:20, width:20, marginRight:3,}}></Image>
                                    <Text style={styles.boxText}> soundproofing system</Text>
                                </View>
                            </View>

                            <View style={styles.state}>
                                <Text style={styles.area}>State: </Text>
                                <Text style={styles.statetext}> 5 </Text>
                                <Text style={styles.statetext}>room lefts</Text>
                            </View>
                            
                        </View>

                        <View style ={styles.endcontainer}>
                            <View style={{flex:1}}>
                                <Text style={styles.area}>Price</Text>
                                <Text style={styles.pricetext}>$50</Text>
                            </View>
                            <View style={{flex:5, justifyContent:'center', alignItems:'center',}}>
                                <TouchableOpacity style={styles.choosebutton} onPress={toggleModal}>
                                <Text style={styles.choosetext}>{buttonText}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    
                    
            </ScrollView>


            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Select number of rooms</Text>
                        <View style={styles.modalBody}>
                            <Text style={styles.modalText}>Number of rooms</Text>
                            <View style={styles.counterContainer}>
                                <TouchableOpacity onPress={decrementRoomCount} style={styles.counterButton}>
                                    <Text style={styles.counterButtonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.counterValue}>{roomCount}</Text>
                                <TouchableOpacity onPress={incrementRoomCount} style={styles.counterButton}>
                                    <Text style={styles.counterButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                            <Text style={styles.applyButtonText}>Apply</Text>
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

    
});



// const RoomContainer = ({ room, onSelectRoom }) => {
//     const [isModalVisible, setModalVisible] = useState(false);
//     const [roomCount, setRoomCount] = useState(room.selectedRooms);
//     const [buttonText, setButtonText] = useState(room.buttonText);

//     const handleApply = () => {
//         if (roomCount > 0) {
//             setButtonText(`Selected ${roomCount} Room${roomCount > 1 ? 's' : ''}`);
//         } else {
//             setButtonText("Select");
//         }
//         onSelectRoom(room.id, roomCount, buttonText);
//         setModalVisible(false);
//     };

//     const toggleModal = () => {
//         setModalVisible(!isModalVisible);
//     };

//     const incrementRoomCount = () => {
//         setRoomCount(prevCount => prevCount + 1);
//     };

//     const decrementRoomCount = () => {
//         if (roomCount > 0) {
//             setRoomCount(prevCount => prevCount - 1);
//         }
//     };

//     return (
//         <View style={styles.roomcontainer}>
//             <Text style={styles.title}>{room.title}</Text>
//             <View style={styles.bedandarea}>
//                 <Image source={require('../assets/icons/bed.png')} />
//                 <Text style={styles.bed}>1 double - bed</Text>
//                 <View style={styles.areacontainer}>
//                     <Text style={styles.area}>area: </Text>
//                     <Text style={styles.area}>16m2</Text>
//                 </View>
//             </View>
//             <View style={styles.servicecontainer}>
//                 <View style={styles.bedandarea}>
//                     <Image source={require('../assets/icons/service.png')} />
//                     <Text style={styles.area}>Service:</Text>
//                 </View>
//                 <View style={styles.featureContainer}>
//                     <View style={styles.backgroundBox}>
//                         <Image source={require('../assets/icons/clock.png')} style={{ height: 20, width: 20, marginRight: 3 }} />
//                         <Text style={styles.boxText}> free cancel in 24h</Text>
//                     </View>
//                     <View style={styles.backgroundBox}>
//                         <Image source={require('../assets/icons/wifi.png')} style={{ height: 20, width: 20, marginRight: 3 }} />
//                         <Text style={styles.boxText}> free wifi</Text>
//                     </View>
//                     <View style={styles.backgroundBox}>
//                         <Image source={require('../assets/icons/tub.png')} style={{ height: 20, width: 20, marginRight: 3 }} />
//                         <Text style={styles.boxText}> tub</Text>
//                     </View>
//                     <View style={styles.backgroundBox}>
//                         <Image source={require('../assets/icons/airconditioner.png')} style={{ height: 20, width: 20, marginRight: 3 }} />
//                         <Text style={styles.boxText}> air conditioner</Text>
//                     </View>
//                     <View style={styles.backgroundBox}>
//                         <Image source={require('../assets/icons/unsound.png')} style={{ height: 20, width: 20, marginRight: 3 }} />
//                         <Text style={styles.boxText}> soundproofing system</Text>
//                     </View>
//                 </View>
//                 <View style={styles.state}>
//                     <Text style={styles.area}>State: </Text>
//                     <Text style={styles.statetext}> 5 </Text>
//                     <Text style={styles.statetext}>room left</Text>
//                 </View>
//             </View>
//             <View style={styles.endcontainer}>
//                 <View style={{ flex: 1 }}>
//                     <Text style={styles.area}>Price</Text>
//                     <Text style={styles.pricetext}>${room.price}</Text>
//                 </View>
//                 <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
//                     <TouchableOpacity style={styles.choosebutton} onPress={toggleModal}>
//                         <Text style={styles.choosetext}>{buttonText}</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>

//             <Modal visible={isModalVisible} animationType="slide" transparent={true}>
//                 <View style={styles.modalOverlay}>
//                     <View style={styles.modalContent}>
//                         <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
//                             <Text style={styles.closeButtonText}>X</Text>
//                         </TouchableOpacity>
//                         <Text style={styles.modalTitle}>Select number of rooms</Text>
//                         <View style={styles.modalBody}>
//                             <Text style={styles.modalText}>Number of rooms</Text>
//                             <View style={styles.counterContainer}>
//                                 <TouchableOpacity onPress={decrementRoomCount} style={styles.counterButton}>
//                                     <Text style={styles.counterButtonText}>-</Text>
//                                 </TouchableOpacity>
//                                 <Text style={styles.counterValue}>{roomCount}</Text>
//                                 <TouchableOpacity onPress={incrementRoomCount} style={styles.counterButton}>
//                                     <Text style={styles.counterButtonText}>+</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                         <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
//                             <Text style={styles.applyButtonText}>Apply</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </Modal>
//         </View>
//     );
// };

// export default function AvailableRoomScreen({ navigation }: { navigation: NativeStackNavigatorProps }) {
//     const [rooms, setRooms] = useState([
//         { id: 1, title: "Room for two people", price: 50, selectedRooms: 0, buttonText: "Select" },
//         { id: 2, title: "Room for three people", price: 75, selectedRooms: 0, buttonText: "Select" }
//     ]);

//     const handleSelectRoom = (roomId, selectedRooms, buttonText) => {
//         setRooms(prevRooms => prevRooms.map(room =>
//             room.id === roomId ? { ...room, selectedRooms, buttonText } : room
//         ));
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <TouchableOpacity style={styles.arrowleftbutton} onPress={() => navigation.goBack()}>
//                     <Image source={require('../assets/icons/arrowleft.png')} style={styles.arrowlefticon} />
//                 </TouchableOpacity>
//                 <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
//                     <View>
//                         <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Available Room</Text>
//                     </View>
//                 </View>
//             </View>

//             <ScrollView style={styles.body}>
//                 {rooms.map(room => (
//                     <RoomContainer key={room.id} room={room} onSelectRoom={handleSelectRoom} />
//                 ))}
//             </ScrollView>
//         </View>
//     );
// }

