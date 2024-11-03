import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert, Platform } from 'react-native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';

export default function ChatScreen({ navigation }: {navigation: NativeStackNavigatorProps}) {
    return (

        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.arrowleftbutton} onPress={() => navigation.goBack()}>
              <Image source={require('../assets/icons/arrowleft.png')} style={styles.arrowlefticon} />
            </TouchableOpacity>
            <View style ={{flexDirection:'row', alignItems:'center', alignContent:'center',justifyContent:'center', }}>
                <View style={styles.avatarContainer}>
                    <Image source={require('../assets/images/avt.png')} style={styles.avatar} />
                </View>
                <View>
                    <Text style={{fontSize:18,fontWeight:'bold',}}>Ho Coc camping Vung Tau</Text>
                </View>
            </View>
          </View>

          <View style={styles.textInputContainer}>
                <TextInput
                    style={[styles.textInput]}
                    placeholder="Nhập tin nhắn"
                    placeholderTextColor="#000000"
                    
                />
                <TouchableOpacity style={styles.sendButton} onPress={() => console.log('Send icon pressed')}>
                    <Image source={require('../assets/icons/send.png')} style={styles.sendIcon} />
                </TouchableOpacity>
          </View>
         
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
        width: 40,
        height: 40,
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

        width: 50,
        height: 50,
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

    textInputContainer: {
      flexDirection: 'row',
      position:'absolute',
      bottom:30,
      width:'100%',
      justifyContent:'flex-start',
      
      paddingHorizontal: 20,
      paddingVertical: 10,
  },
  textInput: {
      width:'87%',
      height: 47,
      fontSize:17,
      borderRadius: 24,
      paddingHorizontal: 10,
      backgroundColor: '#E5F1FF',
      color: '#000000',
      opacity:1,
      
  },

  sendButton: {
      position:'absolute',
      right:35,
      marginTop:20,
  },
  sendIcon: {
      width: 30,
      height: 30,
  },
});
