import {useState} from 'react';
import React from 'react';
import {View, Text, StyleSheet, TextInput, FlatList, ScrollView} from 'react-native'

import CategoryItem from "@/components/HomeScreen/CategoryItem"
import categoryData from '@/constants/category';

import PopularSection from '@/components/HomeScreen/PopularSection';

export default function HomeScreen ()
{
    
    const [findContent, setFindContent] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(categoryData.at(0));
    

    return (
        <View style = {styles.container}>
            <View style = {styles.header}>
                {/*Text header */}
                <View style = {styles.text_container}>
                    <View>
                        <Text style = {styles.text1}>Explore</Text>
                        <Text style = {styles.text2}>Aspen</Text>
                    </View>
                    <View>
                        <Text style = {styles.text3}>HCM, VN</Text>
                    </View>
                </View>

                {/*Search bar */}
                <View style = {styles.textInputContainer}>
                    <TextInput 
                    placeholder='Find things to do'
                    placeholderTextColor={'black'}
                    value={findContent}
                    onChangeText={setFindContent}
                    style = {styles.textInput}/>
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

            </View>

            <View style = {styles.body}>
                <ScrollView>
                    <PopularSection/>


            

                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        borderWidth: 1,
        height: 250
    },
    text_container: {
        flexDirection: 'row',
        //borderWidth: 1,
        justifyContent: 'space-between',
    },
    text1: {
        fontSize: 18,
        fontFamily: '',
        marginLeft: "12%"
    },
    text2: {
        fontSize: 36,
        fontFamily: '',
        marginLeft: "12%",
        fontWeight: 'medium'
    },
    text3: {
        fontSize: 14,
        fontFamily: '',
        marginRight: "10%"
    },
    textInputContainer: {
        marginTop: 20,
        marginHorizontal: '5%',
        ////borderWidth: 1,
        borderRadius: 24,
        backgroundColor: '#A8CCF0',
        opacity: 0.2,
        height: '25%', 
        padding: 20
    },
    textInput: {
        fontSize: 14,
        
    },
    categoryContainer: {
        //borderWidth: 1
    },
    flatList: {
        marginTop: 10
    },
    body: {
        flex: 1,
        borderWidth: 1
    },
    
    popularList: {

        
    }
    
})