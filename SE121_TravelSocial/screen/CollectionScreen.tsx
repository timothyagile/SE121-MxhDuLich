import { useNavigation } from '@react-navigation/native';
import React,{ useState, useEffect } from 'react'
import {Button, Text, View,  StyleSheet, Image, TouchableOpacity, TextInput,Modal, Dimensions} from 'react-native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';


const { height } = Dimensions.get('window');

export default function CollectionScreen ({navigation}: {navigation: NativeStackNavigatorProps})

{
    const [modalVisible, setModalVisible] = useState(true);
    useEffect(() => {
        setModalVisible(true);
      }, []);

    return (
        <View style = {styles.container}>
            <Image source={require('../assets/icons/logo.png')} style={styles.logo} />
            <View style = {{alignItems:'center', width:'100%'}}>
                <View style={styles.search}>
                    <TouchableOpacity onPress={() => console.log('Search icon pressed')}>
                        <Image source={require('../assets/icons/Search.png')} style={styles.icon} />
                    </TouchableOpacity>                   
                    <TextInput
                        style={styles.input}
                        placeholder="Find things to do"
                        placeholderTextColor="#000000"
                    />
                </View>
            </View>
            <Text style={styles.collections }>Collections</Text>
            <View style={styles.list}>
                <View style ={{width:'50%', alignItems:'center', flexDirection:'column'}}>
                    <TouchableOpacity style={styles.square} onPress={() => navigation.navigate('add-collection-screen')}>
                        <Image source={require('../assets/icons/plus.png')} style={styles.iconplus} />
                    </TouchableOpacity>
                    <Text style={{marginTop:10, fontSize: 20,}}>Add new</Text>
                </View>
                
                <View style ={{width:'50%',alignItems:'center'}}>
                    <TouchableOpacity style={styles.square} onPress={() => navigation.navigate('add-collection-screen')}>
                        <Image source={require('../assets/icons/plus.png')} style={styles.iconplus} />
                    </TouchableOpacity>
                    <Text style={{marginTop:10, fontSize: 20,}}>Add new</Text>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.exitButton}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Image source={require('../assets/icons/exit.png')} style={styles.exitIcon} />
                        </TouchableOpacity>
                        <Image source={require('../assets/images/collectionstart.png')}></Image>
                        <Text style={styles.modalText}>Save your favorites in one place</Text>
                        <Text style={styles.modalText2}>Tap the heart icon in anywhere to save and enjoy your favorites list</Text>
                        <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.closeButtonText}>I got it</Text>
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
        alignItems: 'flex-start',
        backgroundColor: 'white',
    },

    logo:{
        marginTop: 20,
        width:50,
        height:50,
        marginLeft: 10,
    },

    search: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 24,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#F3F8FE',
        width: '90%',
      },
    icon: {
        width: 20, 
        height: 20, 
        marginRight: 10,
        color:'black',
      },
    input: {
        flex: 1,
        height: 40,
        color: '#000000',
      },

    collections:{
        marginTop: 30,
        marginLeft: 25,
        fontSize:26,
        fontWeight:'bold',
      },

    list: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        
        width:'100%',
      },
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
        height: height * 0.6,
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
});