import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert, Platform } from 'react-native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';

export default function ChatBoardScreen({ navigation }: {navigation: NativeStackNavigatorProps}) {
    return (

        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.arrowleftbutton} onPress={() => navigation.goBack()}>
              <Image source={require('../assets/icons/exit.png')} style={styles.arrowlefticon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Chat</Text>
          </View>

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

            <TouchableOpacity onPress={()=>navigation.navigate('chat-screen')} style ={{flexDirection:'row', alignItems:'center', alignContent:'center',justifyContent:'center', marginTop:20,}}>

                <View style={styles.avatarContainer}>
                    <Image source={require('../assets/images/avt.png')} style={styles.avatar} />
                </View>
                <View style={{width:'60%'}}>
                    <Text style={{fontSize:18,fontWeight:'bold',}}>Ho Coc camping Vung Tau</Text>
                    <Text style={{opacity:0.8,marginTop:5,}} numberOfLines={1} ellipsizeMode='tail'>Địa điểm rất tuyệt vời, sdsdsdfsdf tôi rất thích, cảm ơn rất nhiều.</Text>
                </View>
                <View style={{marginLeft:20,}}>
                    <Text style ={{opacity:0.8,}}>26/3</Text>
                    <View style={styles.numberCircle}>
                        <Text style={{color:'white'}}>1</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
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
        width: 20,
        height: 20,
        marginLeft:10,
      },

    search: {
        marginTop: 0,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 24,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#F3F8FE',
        width: '90%',
    },

    input: {
        flex: 1,
        height: 40,
        color: '#000000',
    },

    icon: {
        width: 20, 
        height: 20, 
        marginRight: 10,
        color:'black',
      },

    avatarContainer: {

        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight:20,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F8FE', 
    },
    avatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', 
    },

    numberCircle: {
        width: 20,
        height: 20,
        borderRadius: 25,
        backgroundColor: '#196EEE', 
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5, 
    },
});
