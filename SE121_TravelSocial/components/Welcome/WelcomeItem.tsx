import {View, StyleSheet, Image, useWindowDimensions, Text, ImageBackground} from 'react-native'

interface props {
    id: string,
    title: string,
    description: string, 
    image: any
}

export default function WelcomeItem({id, title, description, image} : props) {
    const {width} = useWindowDimensions()

    return (
        <View style = {[styles.containter, {width}]}>
            <ImageBackground 
            source =  {image}
            style = {[{flex: 1}, {width}]}
            >
                <View>
                <Text style = {styles.text}>{title} </Text>
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
    image: {
        
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    }
})