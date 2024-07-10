import React from 'react'
import {View, StyleSheet, Image, useWindowDimensions} from 'react-native'

interface props {
    id: string,
    title: string,
    description: string, 
    image: any
}

export default function WelcomeItem({id, title, description, image} : props) {
    const {width} = useWindowDimensions()

    return (
        <View style = {[styles.containter, {width}]}>
            <Image 
            source =  {image}
            style = {[styles.image, {width}]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        resizeMode: "cover"
    }
})