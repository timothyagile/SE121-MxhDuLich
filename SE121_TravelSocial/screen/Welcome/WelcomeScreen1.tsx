import {Animated, Button, FlatList, StatusBar, StyleSheet, View, useWindowDimensions, TouchableOpacity, Text} from 'react-native';
import { useState, useRef } from 'react';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';


import WelcomeItem from '@/components/Welcome/WelcomeItem';
import welcomeSlides from '@/constants/welcome-slides';



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
        <View style = {{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black"
        }}>
            <StatusBar 
            backgroundColor={"black"}
            barStyle={"light-content"}/>

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
            // onScroll={Animated.event([{ nativeEvent: { contentOffset: {x: scrollX } } }], {
            //     useNativeDriver: false,
            // })}
            />
            
            <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 20,
            }}>
                {/* Render indicator */}
                {welcomeSlides.map((_, index) => (
                    <View
                    key={index}
                    style={[
                        styles.indicator,
                        currentSlideIndex === index && {
                        backgroundColor: "blue",
                        width: 25,
                        },
                    ]}
                    />
                ))}
            </View>

            <View style={{ marginBottom: 20 }}>
          {currentSlideIndex === welcomeSlides.length - 1 ? (
            <View style={{ height: 50 }}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate('login')}
              >
                <Text style={{ fontWeight: 'bold', fontSize: 15}}>
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: 'row' }}>
              {/* <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor: "white",
                    borderWidth: 1,
                    backgroundColor: 'white',
                  },
                ]}
                onPress={skip}
              >
                
              </TouchableOpacity>
              <View style={{ width: 15 }} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.btn}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}
                >
                  NEXT
                </Text>
              </TouchableOpacity> */}

              <Button 
              title='Skip'
              onPress={skip}></Button>
              <Button 
              title='Next'
              onPress={goToNextSlide}></Button>
            </View>
          )}
        </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    threeDot:
    {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    indicator: {
        width: 20,
        height: 20,
        backgroundColor: "red",
        borderRadius: 50
    },
    btn: {
        flex: 1,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    }
})