import React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native'
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';


export default function TicketScreen ({ navigation }: {navigation: NativeStackNavigatorProps})
{
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
                        placeholder="Tìm kiếm"
                        placeholderTextColor="#000000"
                    />
                </View>
            </View>

            <Text style={styles.collections }>Tất cả Booking</Text>

            <View style = {styles.body}>
                <View style={{flexDirection:'row'}}>
                    <View style={styles.imageContainer}>
                        <Image source={require('../assets/images/camping-ho-coc.png')} style={styles.image} />
                    </View>
                    <View style ={styles.textContainer}>
                        <Text style= {styles.title}>Ho Coc camping Vung Tau </Text>
                        <Text style= {styles.title2}>26/6 - 27/6 </Text>
                        <View style={styles.detailsContainer}>
                            <View style={styles.ratingBox}>
                                <Text style={{color:'black', fontSize:16}}>Trạng thái: </Text>
                                <Text style={styles.stateText}>Chờ duyệt</Text>
                            </View>
                            <TouchableOpacity style={styles.featureBox}>
                                <Text style={styles.boxText}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
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

    body:{
        marginTop: 20,
    },
    imageContainer: {
        marginLeft:20,
        width: 130,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    collections:{
        marginTop: 30,
        marginLeft: 25,
        fontSize:26,
        fontWeight:'bold',
      },


    textContainer: {
        flex: 1,
        marginLeft: 10,
    },

    stateText:{
        color:'#F8D675',
        fontWeight:'600'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        flexShrink: 1,
        flexWrap: 'wrap',
    },
    title2: {
        fontSize: 16,
        fontWeight: '300',
        flexShrink: 1,
        flexWrap: 'wrap',
    },

    detailsContainer: {
        position:'absolute',
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
        flexDirection:'row',
        borderRadius:20,
        backgroundColor: '#F1F1F1',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    boxText:{

    },
})