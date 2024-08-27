import {Text, View, FlatList, Dimensions, TouchableOpacity, StyleSheet, Image} from 'react-native'
import locationData from '@/constants/location';
import React from 'react';

const {width, height} = Dimensions.get('window')
const CARD_WIDTH = 240;
const CARD_HEIGHT = height - 600;
const CARD_WIDTH_SPACING = CARD_WIDTH + 24;

export default function PopularSection() {
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
                <TouchableOpacity style = {{
                    marginLeft: 24,
                    marginRight:  index === locationData.length - 1 ? 24 : 0}}>
                        <View style = {styles.card}>
                            <View style = {styles.imageBox}>
                                <Image source={require('@/assets/images/bai-truoc-20.jpg')}
                                style = {styles.image}/>
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
        fontSize: 20,
        fontWeight: 'bold'
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

    }
})