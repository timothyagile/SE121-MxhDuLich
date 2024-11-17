import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import * as React from 'react'
import { Button } from 'react-native-paper'

interface item {
    id: string,
    name: string
}
interface props {
    item: item,
    selectedCategory: item | undefined; 
    setSelectedCategory: (category: item) => void;
    setLocations: (locations: any) => void;
}

export default function CategoryItem({item, selectedCategory, setSelectedCategory,setLocations } : props) {

    const handlePress = async () => {
        setSelectedCategory(item);
        try {
            console.log(item.id);
            const response = await fetch(`http://192.168.1.18:3000/locationbycategory/${item.id}`);
            const data = await response.json();
            if (data.isSuccess) {
                setLocations(data.data); 
                console.log(data);
            } else {
                console.error('API error:', data.error);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <TouchableOpacity 
            onPress={handlePress}>
            <Button style = {[styles.text, 
                selectedCategory?.id == item.id ? styles.selectedItemText : null
            ]}
            labelStyle={{ 
                color: selectedCategory?.id === item.id ? '#196EEE' : '#000' // Đổi màu chữ khi được chọn
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
    
