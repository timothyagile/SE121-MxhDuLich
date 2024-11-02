import React from 'react';
import {Image, View, StyleSheet, TouchableOpacity, Text, Dimensions} from 'react-native';
import locationData from '@/constants/location'

const {width, height} = Dimensions.get('window')
const CARD_WIDTH =  width - 240;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + 24;

export default function DailySection() {
    return (
        <View>
            <Text style = {styles.titleText}>Gợi ý hằng ngày</Text>
            <View style = {styles.container}>
                {locationData.map((item, index) => {
                    return (
                    <TouchableOpacity style = {{
                        marginLeft: 24,
                        marginRight:  index === locationData.length - 1 ? 24 : 0}}>
                        <View style={[styles.card]} key = {item.key}>
                            <View style={styles.imageBox}>
                                <Image style={styles.image} source={item.imgSource} />
                            </View>
                            <View style={styles.footer}>
                                <View>
                                    <Text style={[styles.textStyle, {fontSize: 20}]}>{item.name}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    );
                })}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        left: 20
        
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 1
    },
    imageBox: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT - 60,
        borderRadius: 24,
        overflow: 'hidden',    
    },
    image: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT - 60,
        resizeMode: 'cover',

    },
    textBox: {
        flexDirection: 'row',
        backgroundColor: '#4D5652',
        borderRadius: 20,
        alignItems: 'center',
        height: 30,
    },
    textStyle: {
        fontWeight: 'medium',
        color: 'black',
        marginLeft: 5,
        marginVertical: 2,
    },
    footer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
    }
})