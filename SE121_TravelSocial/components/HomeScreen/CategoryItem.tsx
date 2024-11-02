import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import * as React from 'react'
import { Button } from 'react-native-paper'

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
            // style = {{borderRadius:10,
            //     borderWidth:1,
            // }}
            onPress={() => {setSelectedCategory(item)}}>
            <Button style = {[styles.text, 
                selectedCategory == item ? styles.selectedItemText : null
            ]}
            labelStyle={{ 
                color: selectedCategory === item ? '#196EEE' : '#000' // Đổi màu chữ khi được chọn
            }}>{item.name}</Button>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        borderRadius:20,
        
    },
    selectedItemText: {

        backgroundColor: '#e6f7ff',
        color: '#196EEE',
        fontWeight: 'bold',
        borderRadius: 20,
    },
    text: {
        fontSize: 20,
        borderWidth:1,
        borderRadius:20,
        margin: 10,
        
        paddingHorizontal: 15,
        paddingVertical: 6
    }
})
    
