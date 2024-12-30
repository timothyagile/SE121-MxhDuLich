import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function LoadingScreen() {
  const animation = useRef<LottieView>(null)

  return (
    <View style={styles.container}>
      <LottieView
        ref={animation}
        source={require('../../assets/customloadings/MainScene.json')}  // Đường dẫn đến file Lottie JSON
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
