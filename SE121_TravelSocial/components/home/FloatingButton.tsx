import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Dimensions,
  TouchableOpacity,
  Image, 
  Animated
} from 'react-native';
import { GlobalStyles } from '../../constants/Styles';
import { FadeOut, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import type { NavigationProp } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function FloatingButton({ navigation }: { navigation: NavigationProp<any> }) {
  const [pressed, setPressed] = useState(false);
  const scaleAnimation = useSharedValue(1);
  const exiting = FadeOut.duration(200);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleAnimation.value }],
    };
  });
  const toggleMenu = () => {
    setPressed((prev) => !prev); // Toggle menu state
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setPressed(!pressed)}
      >
        <Image 
          source={require('../../assets/icons/plus.png')} 
          style={styles.buttonImage}
        />
      </TouchableOpacity>

      {pressed && (
        <Animated.View
          onLayout={() => {}}
          style={[
            styles.menuContainer,
            animatedStyle,
          ]}
        >
          <View
            onTouchEnd={() => {
                toggleMenu();
              navigation.navigate("new-post-screen");
            }}
            style={styles.menuItem}
          >
            <Image
              source={require("../../assets/images/photo.png")}
              style={styles.menuIcon}
            />
          </View>
          <View
            onTouchEnd={() => {
                toggleMenu();
              navigation.navigate("NewPostScreen", { type: "video" });
            }}
            style={styles.menuItem}
          >
            <Image
              source={require("../../assets/images/reels-focused.png")}
              style={styles.menuIcon}
            />
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: 'red',
    position: 'absolute',
    bottom: 25,  // Cách bottom 250
    right: 20,    // Cách phải 20
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#176FF2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonImage: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  menuContainer: {
    //backgroundColor: 'white',
    position: "absolute",
    bottom: 70,  // Menu sẽ xuất hiện phía trên nút
    right: 0,
    height: 60,
    width: 150,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  menuItem: {
    padding: 10,
    borderRadius: 50,
    overflow: "hidden",
    alignSelf: "baseline",
    borderWidth: 1,
    borderColor: GlobalStyles.colors.gray100,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  menuIcon: {
    width: 30,
    height: 30,
    tintColor: "white",
  }
});