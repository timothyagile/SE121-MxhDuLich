import {Text, View, FlatList, Dimensions, TouchableOpacity, StyleSheet, Image} from 'react-native'
import locationData from '@/constants/location';
import React from 'react';

const {width, height} = Dimensions.get('window')
const CARD_WIDTH =  width - 190;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + 24;

export default function RecommendedSection() {
    return (

        <View>
            <Text style = {styles.titleText}>Recommended</Text>
            <FlatList
            data={locationData}
            
            horizontal
            snapToInterval={CARD_WIDTH_SPACING}
            decelerationRate={"fast"}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
                return (
                    <TouchableOpacity style = {{
                        marginLeft: 24,
                        marginRight:  index === locationData.length - 1 ? 24 : 0}}>
                        <View>
                            <View style = {styles.imageBox}>
                                <Image source={require('@/assets/images/bai-truoc-20.jpg')}
                                style={styles.image}></Image>
                            </View>
                            <View style = {styles.footer}>
                                <View>
                                    <Text style = {[styles.textStyle, {fontSize: 20}]}>{item.name}</Text>
                                    <Text style = {styles.textStyle}>Hot deal</Text>
                                </View>
                                <View style = {styles.textBox}>
                                    <Text style = {[styles.textStyle, {marginHorizontal: 5, color: 'white'}]}>{item.long}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>                            
                )}
            }></FlatList>
            
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
        height: CARD_HEIGHT - 60,
        borderRadius: 24,
        overflow: 'hidden',    
    },
    image: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT - 60,
        resizeMode: 'cover',

    },
    titleBox: {
        top: 0,
        left: 16
    },
    textBox: {
        flexDirection: 'row',
        backgroundColor: '#4D5652',
        borderRadius: 20,
        alignItems: 'center',
        height: 30,
        marginVertical: 5
    },
    star: {
        width: 24,
        height: 24,
        left: 10
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