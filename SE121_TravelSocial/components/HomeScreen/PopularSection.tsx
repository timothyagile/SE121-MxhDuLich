import {Text, View, FlatList, Dimensions, TouchableOpacity, StyleSheet, Image} from 'react-native'
import locationData from '@/constants/location';
import React from 'react';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';

const {width, height} = Dimensions.get('window')
const CARD_WIDTH = 240;
const CARD_HEIGHT = height - 600;
const CARD_WIDTH_SPACING = CARD_WIDTH + 24;

export default function PopularSection({navigation} : NativeStackNavigatorProps) {
    return (

        <View>
            <Text style = {styles.titleText}>Popular</Text>
        <FlatList
        data={locationData}
        
        horizontal
        snapToInterval={CARD_WIDTH_SPACING}
        decelerationRate={"fast"}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
            return (
                <TouchableOpacity 
                style = {{
                    marginLeft: 24,
                    marginRight:  index === locationData.length - 1 ? 24 : 0}}
                onPress={() => navigation.navigate('detail-screen')}>
                        <View style = {styles.card}>
                            <View style = {styles.imageBox}>
                                <Image source={require('@/assets/images/bai-truoc-20.jpg')}
                                style = {styles.image}/>
                            </View>
                            <View style = {styles.titleBox}>
                                <View style = {styles.textBox}>
                                    <Text style = {[styles.textStyle, {fontSize: 20}]}>{item.name}</Text>
                                </View>
                                <View style = {[styles.textBox, {top: 10, width: 70}]}>
                                    <Image source={require('@/assets/icons/star.png')}
                                    style = {styles.star}></Image>
                                    <Text style = {[styles.textStyle, {fontSize: 15}]}>{item.rating}</Text>
                                </View>
                            </View>
                        </View>

                </TouchableOpacity>                            )
        }
        }>

        </FlatList>
    </View>
    )
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        left: 20
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        marginVertical: 10,
    },
    imageBox: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 16,
        overflow: 'hidden',
    },
    image: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        resizeMode: 'cover',

    },
    titleBox: {
        position: 'absolute',
        top: CARD_HEIGHT - 90,
        left: 16
    },
    textBox: {
        flexDirection: 'row',
        backgroundColor: '#4D5652',
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    star: {
        width: 24,
        height: 24,
        left: 10
    },
    textStyle: {
        fontWeight: 'medium',
        color: 'white',
        marginHorizontal: 20,
        marginVertical: 5
    }
})