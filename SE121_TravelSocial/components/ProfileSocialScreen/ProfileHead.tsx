import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    Pressable,
    ImageBackground,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  
  import { useNavigation, NavigationProp } from "@react-navigation/native";
  import { RootStackParamList } from "../../types/navigation"; // Adjust the path to your navigation types
  import { GlobalStyles, DEFAULT_DP } from "../../constants/Styles.js";
  import PressEffect from "../UI/PressEffect";
import AsyncStorage from "@react-native-async-storage/async-storage";
  
  function ProfileHead ({ userData, viewMode }: any) {
    const [profilePic, setProfilePic] = React.useState(
      !!userData.picturePath ? userData.picturePath : DEFAULT_DP
    );
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    //const navigation = useNavigation();

    const [userrData, setUserData] = useState<any>(null);

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('userData');
          if (jsonValue !== null) {
            const user = JSON.parse(jsonValue);
            setUserData(user);
            console.log(user);
          }
        } catch (e) {
          
        }
      };
  
      fetchUserData();
    }, []);
  
    function ProfileStat({ text, subText, onPress }: any) {
      return (
        <Pressable style={{ alignItems: "center" }} onPress={onPress}>
          <Text style={{ fontWeight: "400", fontSize: 25, color: "white" }}>
            {text}
          </Text>
          <Text style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
            {subText}
          </Text>
        </Pressable>
      );
    }
  
    return (
      <View>
        <View
          style={{
            alignItems: "center",
            margin: 10,
          }}
        >
          <ImageBackground
            style={{
              width: 150,
              height: 150,
  
              marginHorizontal: 10,
            }}
            imageStyle={{
              borderRadius: 100,
            }}
            source={{ uri: userrData?.userAvatar?.url || profilePic }}
          >
            <View
              style={{
                position: "absolute",
                right: 0,
                bottom: 5,
              }}
            >
              <PressEffect
                style={{
                  backgroundColor: "rgb(47, 145, 250)",
                  padding: 10,
                  borderRadius: 50,
                }}
              >
                <Pressable
                //   onPress={() => {
                //     if (!viewMode) navigation.navigate("EditProfileScreen");
                //   }}
                >
                  <Image
                    source={
                      viewMode
                        ? require("../../assets/icons/add-friend.png")
                        : require("../../assets/icons/edit.png")
                    }
                    style={{ width: 25, height: 25, tintColor: "white" }}
                  />
                </Pressable>
              </PressEffect>
            </View>
            {viewMode && (
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  top: 5,
                  transform: [{ rotateY: "180deg" }],
                }}
              >
                <PressEffect>
                  <Pressable
                    onPress={() => {
                      navigation.navigate("chat-screen");
                    }}
                  >
                    <Image
                      source={require("../../assets/icons/chat-focused.png")}
                      style={{ width: 30, height: 30, tintColor: "white" }}
                    />
                  </Pressable>
                </PressEffect>
              </View>
            )}
          </ImageBackground>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 25,
              color: "black",
            }}
          >
            {userrData?.userName}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: "rgba(6, 6, 6, 0.6)",
            }}
          >
            {userrData?.userEmail}
          </Text>
        </View>
  
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: 20,
            backgroundColor: 'rgb(47, 145, 250)',
            borderRadius: 20,
            marginHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          <ProfileStat text={"255"} subText={"Bài đăng"} />
          <ProfileStat text={"1.6k"} subText={"Người theo dõi"} />
          <ProfileStat text={"378"} subText={"Đang theo dõi"} />
        </View>
      </View>
    );
  };
  
  export default ProfileHead;
  
  const styles = StyleSheet.create({});
  