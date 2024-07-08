import {Animated, Button, FlatList, StatusBar, StyleSheet, View, useWindowDimensions} from 'react-native';
import { useState, useRef } from 'react';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';


import WelcomeItem from '@/components/Welcome/WelcomeItem';
import welcomeSlides from '@/constants/welcome-slides';


export default function WelcomeScreen1 ({navigation}: {navigation: NativeStackNavigatorProps}) {

    const scrollX = useRef(new Animated.Value(0)).current
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    

    return (
        <View style = {{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <StatusBar 
            backgroundColor={"black"}
            barStyle={"light-content"}/>

            <FlatList 
            data = {welcomeSlides}
            renderItem={({item}) => <WelcomeItem {...item}/>}
            keyExtractor={item => item.id}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            bounces= {false}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: {x: scrollX } } }], {
                useNativeDriver: false,
            })}
            >
            </FlatList>
            <View style = {styles.threeDot}>
                    <View style = {styles.dot}></View>
                    <View style = {styles.dot}></View>
                    <View style = {styles.dot}></View>
                </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    dot: {
        width: 20,
        height: 20,
        backgroundColor: "red",
        borderRadius: 50
    },
    threeDot:
    {
        flexDirection: "row",
        justifyContent: "space-between",
    }
})