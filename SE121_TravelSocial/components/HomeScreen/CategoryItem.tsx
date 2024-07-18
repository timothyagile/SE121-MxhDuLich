import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import * as React from 'react'

interface props {
    id: string
    name: string
}

export default function CategoryItem({id, name} : props) {
    return (
        <TouchableOpacity style = {styles.container}>
            <Text style = {styles.text}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        borderWidth:1,
        borderRadius: 33,
        margin: 10
    },
    text: {
        fontSize: 20,
        marginHorizontal: 25,
        marginVertical: 10
    }
})
    
