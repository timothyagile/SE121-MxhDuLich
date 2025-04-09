import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Image, ImageBackground } from 'react-native';

const ANGLE_INCREMENT = 45; // Mỗi phần tử cách nhau 45° (360° / 8 phần)
const items = [
  'Voucher 10K',
  'Voucher 15K',
  'Voucher 20K',
  'Voucher 50K',
  'Voucher 5%',
  'Voucher 10%',
  'Voucher 15%',
  'Opps, trượt rồi:<<',
];

export default function LuckyWheelScreen() {
  const [spinning, setSpinning] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;
  const [currentRotation, setCurrentRotation] = useState(0);


  const spinWheel = () => {
    if (spinning) return;
  
    setSpinning(true);
  
    const extraRotation = Math.floor(Math.random() * 360) + 720; // Quay thêm ít nhất 2 vòng
    const newRotation = currentRotation + extraRotation;
  
    Animated.timing(spinValue, {
      toValue: newRotation,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      setSpinning(false);
      setCurrentRotation(newRotation); // Lưu giá trị mới
  
      const winningIndex = Math.floor((newRotation % 360) / ANGLE_INCREMENT);
      alert(`Giải thưởng: ${items[winningIndex]}`);
    });
  };

  const rotateInterpolation = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
    extrapolate: 'extend',
  });

  return (
    <ImageBackground
    source={require('../assets/background.jpg')}
    style={styles.background}
    resizeMode="cover"
  >
    <View style={styles.container}>

      <View style={{ alignItems: 'center', flexDirection: 'row', borderWidth: 3, borderColor:'#FFAB5E' , backgroundColor: '#FC1414', padding: 5, borderRadius: 10, paddingHorizontal: 30}}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff',  }}>Số lượt còn lại:</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff', marginLeft: 10 }}>5</Text>
        <Image source={require('../assets/ticket.png')} style={{ width: 30, height: 30, marginLeft: 10 }} />
      </View>
      <View style={styles.wheelWrapper}>
        {/* Kim chỉ */}
        <View style={styles.pointer}>
          <Image source={require('../assets/pointer.png')} style={styles.pointerImage} />
        </View>

        {/* Vòng quay */}
        <Animated.View
          style={[
            styles.wheel,
            {
              transform: [{ rotate: rotateInterpolation }],
            },
          ]}
        >
          <Image source={require('../assets/spin.png')} style={styles.wheelImage} />
        </Animated.View>

        {/* Nút "Quay" */}
        <TouchableOpacity style={styles.spinButton} onPress={spinWheel} disabled={spinning}>
          <Text style={styles.buttonText}>{spinning ? 'Đang quay...' : 'Quay'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#fff',
  },
  wheelWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointer: {
    position: 'absolute',
    zIndex: 1,
    top: '45%',
    right: -20,
  },
  pointerImage: {
    width: 50,
    height: 50,
  },
  wheel: {
    width: 300, // Kích thước vòng quay
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheelImage: {
    width: 360, // Kích thước hình ảnh vòng quay
    height: 360,
    resizeMode: 'contain',
  },
  spinButton: {
    marginTop: 20,
    backgroundColor: '#DF7D7D',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});