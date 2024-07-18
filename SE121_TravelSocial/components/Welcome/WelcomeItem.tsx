import {View, StyleSheet, Image, useWindowDimensions, Text, ImageBackground} from 'react-native'
import * as Font from 'expo-font'
import {useState, useEffect} from 'react'
import React from 'react'

interface props {
    id: string,
    title: string,
    description: string, 
    image: any
}

export default function WelcomeItem({id, title, description, image} : props) {
    const {width} = useWindowDimensions()
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Hiatus': require('@/assets/fonts/Hiatus.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
    }, []);

    if (!fontsLoaded) {
        return null; // or a loading indicator
    }

    return (
        <View style = {[styles.containter, {width}]}>
            <ImageBackground 
            source =  {image}
            style = {[{flex: 1}, {width}]}
            >
                <View>
                <Text style = {{
                    fontFamily: 'Hiatus',
                    fontSize: 116,
                    color: 'white',
                    textAlign: 'center',
                    marginTop: "30%"}}>Aspen</Text>
                <View style = {styles.textContainer}>
                    <Text style = {[styles.text, {fontSize: 24}]}>Plan your</Text>
                    <Text style = {[styles.text, {fontSize: 48}]}>Luxurious</Text>
                    <Text style = {[styles.text, {fontSize: 48}]}>Vacation</Text>
                </View>
                </View>
            </ImageBackground>
                
        </View>
    )
}

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"
    },
    textContainer: {
        marginTop: "75%",
        marginLeft: "5%"
    },
    text: {
        color: 'white'
    }
})