import {
    ActivityIndicator,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
  } from "react-native";
  import { useState, useEffect } from "react";
  import { LinearGradient } from "expo-linear-gradient";
  import { GlobalStyles } from "../../constants/Styles";
import React from "react";
  
  const RemoteImage = ({ imageUri, style }:any) => {
    const [ratio, setRatio] = useState(1);
    const [safeUri, setSafeUri] = useState<string>("");

    // Hàm tự động fix link Cloudinary
    // const getSafeImageUrl = (url: string) => {
    //   if (!url) return "";
    //   if (url.includes("?")) {
    //     return url + "&f=jpg&q_auto";
    //   }
    //   return url + "?f=jpg&q_auto";
    // };
    
    const getSafeImageUrl = (url: string) => {
      if (!url) return "";
      if (url.includes("/upload/")) {
        return url.replace("/upload/", "/upload/f_jpg/");
      }
      return url;
    };
    
  
    useEffect(() => {
      if (imageUri) {
        const fixedUrl = getSafeImageUrl(imageUri);
        setSafeUri(fixedUrl);
        Image.getSize(fixedUrl, (width, height) => {
          const ratio = width / height;
          if (ratio < 0.7) {
            setRatio(0.7);
          } else {
            setRatio(ratio);
          }
        });
      }
    }, [imageUri]);
  
    if (!safeUri) {
      return <ActivityIndicator />;
    }
  
    return (
      <ImageBackground
        source={{
          uri: getSafeImageUrl(imageUri),
        }}
        style={[styles.image, { aspectRatio: ratio }, style]}
        imageStyle={{
          borderRadius: 15,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            padding: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Post Title
          </Text>
        </View>
      </ImageBackground>
    );
  };
  
  const styles = StyleSheet.create({
    image: {
      width: "100%",
    },
  });
  
  export default RemoteImage;
  