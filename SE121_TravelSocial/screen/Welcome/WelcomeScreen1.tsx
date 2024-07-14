import {SafeAreaView, Button, FlatList, StatusBar, StyleSheet, View, useWindowDimensions, TouchableOpacity, Text} from 'react-native';
import { useState, useRef } from 'react';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';


import WelcomeItem from '@/components/Welcome/WelcomeItem';
import welcomeSlides from '@/constants/welcome-slides';
import React from 'react';



export default function WelcomeScreen1 ({navigation}: {navigation: NativeStackNavigatorProps}) {
    
    const window = useWindowDimensions();
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const ref = useRef<FlatList>(null);

    const updateCurrentSlideIndex = (e: any) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / window.width);
        setCurrentSlideIndex(currentIndex);
    };

    const goToNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex !== welcomeSlides.length) {
        const offset = nextSlideIndex * window.width;
        ref.current?.scrollToOffset({ offset });
        setCurrentSlideIndex(currentSlideIndex + 1);
        }
    };

    const skip = () => {
        const lastSlideIndex = welcomeSlides.length - 1;
        const offset = lastSlideIndex * window.width;
        ref.current?.scrollToOffset({ offset });
        setCurrentSlideIndex(lastSlideIndex);
    };


    return (
        <SafeAreaView style = {{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'black'
        }}>
            <StatusBar 
            backgroundColor={'black'}
            barStyle={'light-content'}/>
            <FlatList
            ref={ref}
            onMomentumScrollEnd={updateCurrentSlideIndex}
            style = {styles.container}
            data = {welcomeSlides}
            renderItem={({item}) => <WelcomeItem {...item}/>}
            keyExtractor={item => item.id}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            bounces= {false}
            >
            </FlatList>

            <View
              style={styles.threeDot}>
                  {/* Render indicator */}
                  {welcomeSlides.map((_, index) => (
                      <View
                      key={index}
                      style={[
                          styles.indicator,
                          currentSlideIndex === index && {
                          backgroundColor: "white",
                          width: 25,
                          },
                      ]}
                      />
                  ))}
            </View>

            <View style = {styles.containerRouter}>
              <View>
            {currentSlideIndex === welcomeSlides.length - 1 ? (
              <View style={{ height: 50}}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => navigation.navigate('login')}
                >
                  <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white'}}>
                    Explore
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>

<TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor: 'white',
                    borderWidth: 1,
                    backgroundColor: 'transparent',
                  },
                ]}
                onPress={skip}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: 'white',
                  }}>
                  Skip
                </Text>
              </TouchableOpacity>
              <View style={{width: 15}} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.btn}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: 'white'
                  }}>
                  Next
                </Text>
              </TouchableOpacity>
              </View>
            )}
          </View>
            </View>

            
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        
    },
    threeDot:
    {
      flexDirection: 'row',
      position: 'absolute',
      justifyContent: 'space-between',
      bottom: 80,
      right: 175,
      left: 175,
    },
    indicator: {
        width: 10,
        height: 10,
        backgroundColor: "gray",
        borderRadius: 50
    },
    btn: {
      flex: 1,
      height: 50,
      borderRadius: 5,
      backgroundColor: '#176FF2',
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerRouter: 
    {
      position: 'absolute',
      right: 5,
      left: 5,
      bottom: 20
    }
})