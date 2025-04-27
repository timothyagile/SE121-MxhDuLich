import { useState, useEffect, useRef, useContext } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import ProfileHead from "../components/ProfileSocialScreen/ProfileHead";
import ProfileBody from "../components/ProfileSocialScreen/ProfileBody";

import { AuthContext } from "../store/auth-context.js";
import { GlobalStyles } from "../constants/Styles.js";
import {Header} from "../components/ProfileSocialScreen/Header";
import HeaderSvg from "../components/ProfileSocialScreen/HeaderSVG";
import React from "react";

function ProfileSocialScreen({ navigation, route }: any) {
  const authCtx = useContext(AuthContext);
  const userData = useState(authCtx.userData)[0];
  const [refreshing, setRefreshing] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(150);
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      <HeaderSvg headerHeight={headerHeight} />
      <View
        onLayout={(e) => {
          const height = e.nativeEvent.layout.height;
          setHeaderHeight(height / 2);
        }}
      >
        <Header viewMode={route?.params?.ViewUser} />
        <ProfileHead userData={userData} viewMode={route?.params?.ViewUser} />
      </View>

      <ProfileBody refreshing={refreshing} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary,
  },
});

export default ProfileSocialScreen;
