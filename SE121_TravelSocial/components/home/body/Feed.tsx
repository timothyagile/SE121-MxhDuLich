import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { GlobalStyles } from "../../../constants/Styles";
import { FlatList } from "react-native";
import { RefreshControl } from "react-native";
import Post from "./Post";
import { POSTS } from "../../../data/posts";
import { CONTAINER_HEIGHT } from "../head/Stories";
import { useSharedValue } from "react-native-reanimated";
import PostAdvance from "./PostAdvance";
import { API_BASE_URL } from "@/constants/config";
import { useNavigation } from "@react-navigation/native";

const Feed = ({ StoryTranslate, userData } : any) => {
  const [userPosts, setUserPosts] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const lastScrollY = useSharedValue(0);
  const navigation = useNavigation();
  
  const getUserPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/posts/author/${userData._id}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUserPosts(data.data); 
        console.log("userPost in Feed: ", data);
      } else {
        console.error('Failed to fetch user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData?._id) {
      getUserPosts();
    }
  }, [userData]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: GlobalStyles.colors.primary }}>
        <ActivityIndicator size="large" color={GlobalStyles.colors.primary500} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: GlobalStyles.colors.primary }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: (GlobalStyles.styles.tabBarPadding as number),
          gap: 20,
        }}
        onMomentumScrollBegin={(event) => {
          const scrollY = event.nativeEvent.contentOffset.y;
          if (scrollY > lastScrollY.value) StoryTranslate.value = true;
          else {
            StoryTranslate.value = false;
          }
        }}
        onMomentumScrollEnd={(event) => {
          const scrollY = event.nativeEvent.contentOffset.y;
          // if (scrollY < lastScrollY.value) StoryTranslate.value = 0;
          lastScrollY.value = scrollY;
        }}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={getUserPosts} />
        }
        keyExtractor={(item, index) => index.toString()}
        data={userPosts}
        renderItem={({ item, index } : any) => (
          <View>
            <PostAdvance post={item} navigation={navigation} />
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: GlobalStyles.colors.gray }}>Không có bài viết nào</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({});
