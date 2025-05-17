import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";

import InputField from "../components/InputField";
import ListCard from "../components/SearchScreen/ListCard";
import PostsList from "../components/SearchScreen/PostsList";
import EmojisList from "../components/SearchScreen/EmojisList";

import { GlobalStyles } from "../constants/Styles";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeOutRight,
} from "react-native-reanimated";
import { USER_DATA } from "../data/USER";
import React from "react";
import Header2 from "@/components/Header2";
import { API_BASE_URL } from "../constants/config";

export default function SearchScreen ({ navigation }: any) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<typeof USER_DATA>([]);
  const [inputFocused, setInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  async function searchUser(text: string) {
    setSearch(text);
    if (text.length > 0) {
      try {
        setIsLoading(true);
        // Call the API with the search term
        const response = await fetch(`${API_BASE_URL}/user/search?searchTerm=${encodeURIComponent(text)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies in the request
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        if (data.isSuccess) {
          setUsers(data.data);
        } else {
          console.error("API error:", data.error);
          setUsers([]);
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setUsers([]);
    }
  }
  
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      title: "Tìm kiếm bạn bè",
    });
  }, []);
  
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      style={styles.container}
    >
      <StatusBar backgroundColor={GlobalStyles.colors.primary} />
      <Header2 title="Tìm kiếm bạn bè"/>

      <View
        style={{
          margin: 10,
        }}
      >
        <InputField
          onChangeText={searchUser}
          onBlur={() => {
            setInputFocused(false);
          }}
          onFocus={() => {
            setInputFocused(true);
          }}
          value={search}
          placeholder="Tìm kiếm bạn bè"
          keyboardType="default"
          inValid={true}
          search={true}
        />
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={GlobalStyles.colors.primary500} />
        </View>
      ) : users.length > 0 ? (
        <ScrollView>
          {users.map((item, index) => (
            <ListCard key={index} userData={item} />
          ))}
        </ScrollView>
      ) : (
        <>
          {!inputFocused && (
            <>
              <Animated.View
                entering={FadeInLeft}
                exiting={FadeOutRight}
                style={{
                  marginVertical: 50,
                }}
              >
                {/* <PostsList /> */}
              </Animated.View>
              {/* <Animated.View entering={FadeInDown} style={{ flex: 1 }}>
                <EmojisList />
              </Animated.View> */}
            </>
          )}
        </>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
