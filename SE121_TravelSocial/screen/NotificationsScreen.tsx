import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert, Platform } from 'react-native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';

export default function NotificationsScreen({ navigation }: {navigation: NativeStackNavigatorProps}) {
    return (

        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.arrowleftbutton} onPress={() => navigation.goBack()}>
              <Image source={require('../assets/icons/arrowleft.png')} style={styles.arrowlefticon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Thông báo</Text>
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
});
