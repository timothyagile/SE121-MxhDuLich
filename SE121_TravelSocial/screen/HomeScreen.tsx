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

    // useEffect(() => {
    //     // Giả lập thời gian tải dữ liệu
    //     const loadData = async () => {
    //         try {
    //             // Thực hiện các tác vụ tải dữ liệu (ví dụ: gọi API)
    //             await new Promise((resolve) => setTimeout(resolve, 0)); // Giả lập 2 giây chờ
    //         } catch (error) {
    //             console.error('Error loading data:', error);
    //         } finally {
    //             setIsLoading(false); // Sau khi tải xong, thay đổi trạng thái
    //         }
    //     };

    //     loadData();
    // }, []); // useEffect chỉ chạy một lần khi component mount

    // // Nếu đang tải dữ liệu, hiển thị một component loading
    // if (isLoading) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //             <Text>Đang tải...</Text>
    //         </View>
    //     );
    // }

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
            console.log(query);
            console.log(filterLocations);
            return response.data;  // Xóa lỗi nếu có
        } catch (err) {
            setError('Failed to fetch locations');
            return filterLocations;
        } 
    };

    
    useEffect(() => {
        console.log(query);
         //fetchLocations(query);
    }, [query]);

    const handleTextChange =(text:string) => {
        setQuery(text.replace(/\s+/g, '-'));
        if (!query){
            setModalVisible(true);
        }
    }

    const handleSelectLocation = (location: any) => {
        console.log('Selected locationn:', location);
        navigation.navigate('detail-screen', { id: location._id})
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
                    <DailySection categoryId={selectedCategory?.id} navigation={undefined}/>
            </ScrollView>
        </View>
    </ImageBackground>
    )
}


