import { Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import NotificationCard from "../components/NotificationsSocialScreen/NotificationCard";
import { Ionicons } from "@expo/vector-icons";
import SettingsIcon from "../components/AnimatedUi/SettingsIcon";
import { GlobalStyles } from "../constants/Styles";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Header2 from "@/components/Header2";

export default function NotificationsScreen ({ navigation, route }: any) {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      title: "Activity",
      headerRight: () => {
        return (
          <View style={{ marginRight: 20 }}>
            <SettingsIcon onPress={() => {}} />
          </View>
        );
      },
    });
  }, []);
  return (
    <View style={styles.container}>
      <Header2 title="Thông báo"/>
      <StatusBar backgroundColor={GlobalStyles.colors.primary} />
      <NotificationCard mode="LIKE" />
      <NotificationCard mode="COMMENT" />
      <NotificationCard mode="FOLLOW" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: GlobalStyles.colors.primary },
});
