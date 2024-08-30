import {Text, View, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native'
import React from 'react'
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';

const {width, height} = Dimensions.get('window')
const CARD_WIDTH = 0.9 * width;
const CARD_HEIGHT = 0.4 * height;

export default function DetailScreen ({navigation} : {navigation : NativeStackNavigatorProps}) {
    return (
        <View style = {styles.container}>
           <View style = {styles.header}>
                <TouchableOpacity 
                style = {styles.goBackButton}
                onPress={() => navigation.goBack()}>
                    <Text>Go Back</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style = {styles.goBackButton}
                >
                    <Text>Message</Text>
                </TouchableOpacity>
           </View>
           <View style = {styles.imageBox}>
                <Image 
                style = {styles.image}
                source = {require('@/assets/images/bai-truoc-20.jpg')}>
                </Image>
           </View>

           <View style = {styles.infoSection}>
                <View style = {styles.header}>
                    <Text style = {styles.locationName}>Vung Tau</Text>
                    <TouchableOpacity>
                        <Text style = {styles.showMap}>Show map</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.rating}>
                    <Image source = {require('@/assets/icons/star.png')}></Image>
                    <Text>4.1 (365 Reviews)</Text>
                </View>
                <View style = {styles.description}>
                    <Text>Vung tau ...............................................</Text>
                    <TouchableOpacity>
                        <Text style = {[styles.showMap, {marginHorizontal: '0%'}]}>Read more</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.facility}>
                    <Text style = {styles.locationName}>Facilities</Text>
                </View>
           </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: '5%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        alignItems: 'center',
    },
    goBackButton: {
    },
    imageBox: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1
    },
    image: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        resizeMode: 'cover',

    },
    infoSection: {
        borderWidth: 1
    },
    locationName: { 
        fontSize: 24,
        fontWeight: 'bold',

    },
    showMap: { 
        fontSize: 16,
        color: 'blue',
        fontWeight: 'bold',
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    description: {
    },
    facility: {
    }
})