import React, { useState, useRef } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // Chiều rộng màn hình
interface ImageCarouselProps {
    images: {
        url: string;
        publicId: string;
    }[];
  }
const ImageCarousel : React.FC<ImageCarouselProps>= ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  // Hàm xử lý khi cuộn đến cuối
  const onScrollEnd = (event:any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(newIndex);
  };

  if (!images || images.length === 0) {
    // Nếu không có hình ảnh hoặc dữ liệu không hợp lệ, trả về thông báo hoặc ảnh mặc định
    return (<View></View>);
  }

  return (
    
    <View style={styles.image}>
        
      {/* FlatList Carousel */}
      <FlatList
        data={images}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item.url }} style={styles.roomImage} />
        )}
        onMomentumScrollEnd={onScrollEnd}
        ref={flatListRef}
      />

      {/* Pagination */}
      <View style={styles.pagination}>
        {images.map((_:any, index:any) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageCarousel: {
    height: '100%', // Độ cao của carousel
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius:18,
  },
  roomImage: {
    borderRadius:18,
    width: width, // Chiều rộng mỗi ảnh bằng màn hình
    height: '100%',
    resizeMode: 'cover',
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#FF6347',
  },
  inactiveDot: {
    backgroundColor: '#D3D3D3',
  },
});

export default ImageCarousel;
