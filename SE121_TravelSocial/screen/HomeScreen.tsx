import {useState} from 'react';
import React from 'react';
import {View, Text, StyleSheet, TextInput, FlatList, ScrollView, TouchableOpacity, Image} from 'react-native'

import CategoryItem from "@/components/HomeScreen/CategoryItem"
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
    

    return (
        <View style = {styles.container}>
            {/* <Image source={require('../assets/icons/logo.png')} style={styles.logo} /> */}
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
                </View>
            </View>
            <View style  = {styles.categoryContainer}>
                    <FlatList
                    data= {categoryData}
                    renderItem={({item}) => <CategoryItem 
                        item = {item}
                        selectedCategory = {selectedCategory}
                        setSelectedCategory = {setSelectedCategory}/>}

                    horizontal
                    showsHorizontalScrollIndicator = {false}
                    style = {styles.flatList}>
                    </FlatList>
                </View>
           

            <ScrollView style = {{}}>
                    <PopularSection navigation = {navigation}/>
                    <RecommendedSection/>
                    <DailySection/>
            </ScrollView>
        </View>
    )
}
