import {View, Text, StyleSheet} from 'react-native'
import React from 'react'

interface props {
    facilityType: string
}
export default function Facility ({facilityType} : props) {
    return (
        <View style = {styles.container}>
            <Text>{facilityType}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A8CCF0',
        opacity: 0.4,
        borderRadius: 10,
        width: 75,
        height: 75
    }
})