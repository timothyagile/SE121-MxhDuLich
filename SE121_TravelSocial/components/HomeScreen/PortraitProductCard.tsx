import {Text, View, StyleSheet, ImageBackground} from 'react-native'
import * as React from 'react'

export default function PortraitProductCard() {
    return (
        <View style = {styles.container}>
            <ImageBackground 
            source={require('@/assets/images/bai-truoc-20.jpg')}
            style = {styles.img}
            >
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 188,
        height: 240
    },
    img: {
        width: null,
        height: '100%',
        aspectRatio: 1350/899
    }
})