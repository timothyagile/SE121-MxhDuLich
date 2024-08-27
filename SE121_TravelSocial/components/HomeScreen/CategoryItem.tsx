import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import * as React from 'react'

interface item {
    id: string,
    name: string
}
interface props {
    item: item,
    selectedCategory: any,
    setSelectedCategory: any
}

export default function CategoryItem({item, selectedCategory, setSelectedCategory} : props) {
    return (
        <TouchableOpacity 
            onPress={() => {setSelectedCategory(item)}}>
            <Text style = {[styles.text, 
                selectedCategory == item ? styles.selectedItemText : null
            ]}>{item.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        
    },
    selectedItemText: {

        backgroundColor: '#e6f7ff',
        color: '#196EEE',
        fontWeight: 'bold'
    },
    text: {
        fontSize: 20,
        borderWidth:1,
        borderRadius: 33,
        margin: 10,
        paddingHorizontal: 15,
        paddingVertical: 6
    }
})
    
