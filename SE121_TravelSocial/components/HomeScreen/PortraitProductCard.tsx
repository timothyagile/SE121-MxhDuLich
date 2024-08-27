import {Text, View, StyleSheet, Image, TouchableWithoutFeedback, useWindowDimensions, Dimensions, Touchable} from 'react-native'
import * as React from 'react'

interface props {
    id: string,
    imgSource: string
}
export default function PortraitProductCard({id, imgSource} : props, index: any) {
    
    return (
        <TouchableWithoutFeedback style = {{marginLeft: 24,
            marginRight:  id === 5 - 1 ? 24 : 0}}>
            <View style = {styles.container}>
                <Image 
                source={require('@/assets/images/bai-truoc-20.jpg')}
                style = {styles.img}
                >
                </Image>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    Touchable: {
        
    },
    container: {
        height: 240,
        width: 188
    },
    img: {
        resizeMode: 'contain'
    }
})