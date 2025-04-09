import {useEffect, useState} from 'react';
import React from 'react';
import {View, Text, StyleSheet, TextInput, FlatList, ScrollView, TouchableOpacity, Image, ImageBackground, Modal} from 'react-native'

import CategoryItem from "@/components/HomeScreen/CategoryItem";
import categoryData from '@/constants/category';

import PopularSection from '@/components/HomeScreen/PopularSection';
import RecommendedSection from '@/components/HomeScreen/RecommendedSection';
import DailySection from '@/components/HomeScreen/DailySection';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import styles from '../StyleSheet/HomeScreenStyles'; 
import axios from 'axios';
import { API_BASE_URL } from '@/constants/config';
import FilterLocation from '@/components/HomeScreen/FilterLocation';
import NewEventSection from '@/components/HomeScreen/NewEvent';

interface props {
    setFilterLocations: (filterLocations: any) => void;
}

export default function HomeScreen ({navigation} : {navigation : NativeStackNavigatorProps})
{
    
    
    const [selectedCategory, setSelectedCategory] = useState(categoryData.at(0));
    const [locations, setLocations] = useState([]);
    const [filterLocations, setFilterLocations] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    const handleSetCategory = (category: typeof categoryData[0]) => {
        setSelectedCategory(category); 
    };

    const fetchLocations = async (searchQuery:string) => {
        if (!searchQuery) {
            setFilterLocations([]);  // Nếu không có từ khóa tìm kiếm, xóa danh sách kết quả
            return;
        }
        // setIsLoading(true);  // Bắt đầu loading
        try {
            const response = await axios.get(`${API_BASE_URL}/locationbyname?name=${searchQuery}`);
            setFilterLocations(response.data);  // Cập nhật danh sách địa điểm
            setError(null);
            return response.data;  // Xóa lỗi nếu có
        } catch (err) {
            setError('Failed to fetch locations');
            return filterLocations;
        } 
    };

    

    const handleTextChange =(text:string) => {
        setQuery(text.replace(/\s+/g, '-'));
        if (!query){
            setModalVisible(true);
        }
    }

    const handleSelectLocation = (location: any) => {
        navigation.navigate('detail-screen', { id: location._id})
      };

    
    
    return (
    <ImageBackground
      source={require('../assets/icons/logo.png')}
      style={styles.backgroundImage} 
    >
        <View style = {styles.container}>
            <View style = {{alignItems:'center', width:'100%'}}>
                <View style={styles.search}>
                    <TouchableOpacity >
                        <Image source={require('../assets/icons/Search.png')} style={styles.icon} />
                    </TouchableOpacity>                   
                    <TextInput
                        style={styles.input}
                        placeholder="Tìm kiếm"
                        value={query}
                        onChangeText={(text) => handleTextChange(text)}
                        placeholderTextColor="#000000"
                    />
                    <Image source={require('../assets/icons/logoblue.png')} style={styles.logo}/>
                    {query &&  (
                        <View style={styles.dropdownContainer}>
                        <FilterLocation
                            query={query}
                            onSelect={handleSelectLocation}
                        />
                        </View>
                    )}
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
                    <RecommendedSection categoryId={selectedCategory?.id} navigation = {navigation}/>
                    <NewEventSection categoryId={selectedCategory?.id} navigation = {navigation}/>
                    {/* <DailySection categoryId={selectedCategory?.id} navigation={navigation}/> */}
                    <Image style={{width:'100%', height:200}} source={require('../assets/images/banner.png')}/>
            </ScrollView>
            
        </View>
    </ImageBackground>
    )
}


