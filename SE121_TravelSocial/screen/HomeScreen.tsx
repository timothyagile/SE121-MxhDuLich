import {useEffect, useState} from 'react';
import React from 'react';
import {View, Text, StyleSheet, TextInput, FlatList, ScrollView, TouchableOpacity, Image, ImageBackground} from 'react-native'

import CategoryItem from "@/components/HomeScreen/CategoryItem";
import categoryData from '@/constants/category';

import PopularSection from '@/components/HomeScreen/PopularSection';
import RecommendedSection from '@/components/HomeScreen/RecommendedSection';
import DailySection from '@/components/HomeScreen/DailySection';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import styles from '../StyleSheet/HomeScreenStyles'; 

export default function HomeScreen ({navigation} : {navigation : NativeStackNavigatorProps})
{
    
    const [findContent, setFindContent] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(categoryData.at(0));
    const [locations, setLocations] = useState([]);


    const handleSetCategory = (category: typeof categoryData[0]) => {
        setSelectedCategory(category); 
    };

    
    return (
    <ImageBackground
      source={require('../assets/icons/logo.png')} // Đường dẫn đến ảnh logo
      style={styles.backgroundImage} // Định nghĩa kiểu dáng cho nền
      // Đảm bảo ảnh bao phủ toàn bộ màn hình
    >
        <View style = {styles.container}>
            <View style = {{alignItems:'center', width:'100%'}}>
                <View style={styles.search}>
                    <TouchableOpacity onPress={() => console.log('Search icon pressed')}>
                        <Image source={require('../assets/icons/Search.png')} style={styles.icon} />
                    </TouchableOpacity>                   
                    <TextInput
                        style={styles.input}
                        placeholder="Tìm kiếm"
                        placeholderTextColor="#000000"
                    />
                        <Image source={require('../assets/icons/logoblue.png')} style={styles.logo}/>
                </View>
            </View>
            <View style  = {styles.categoryContainer}>
                    <FlatList
                    data= {categoryData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (<CategoryItem 
                        item = {item}
                        selectedCategory = {selectedCategory}
                        setSelectedCategory = {setSelectedCategory}
                        setLocations={setLocations}/>)}

                    horizontal
                    showsHorizontalScrollIndicator = {false}
                    style = {styles.flatList}>
                    </FlatList>
                </View>
           

            <ScrollView style = {{}}>
                    <PopularSection categoryId={selectedCategory?.id} navigation = {navigation}/>
                    <RecommendedSection/>
                    <DailySection categoryId={selectedCategory?.id} navigation={undefined}/>
            </ScrollView>
        </View>
    </ImageBackground>
    )
}
