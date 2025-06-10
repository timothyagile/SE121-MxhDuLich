import {
    View,
    StyleSheet,
    Image,
    Pressable,
    Modal,
    Text,
    ImageBackground,
    Animated,
    Dimensions,
    ActivityIndicator,
  } from "react-native";
  import React, { useRef, useState, useEffect } from "react";
  import { useNavigation } from "@react-navigation/native";
  import { DEFAULT_DP, GlobalStyles } from "../../../constants/Styles";
  import { Ionicons } from "@expo/vector-icons";
  import PressEffect from "../../UI/PressEffect";
  import { API_BASE_URL } from "../../../constants/config";
  // https://github.com/birdwingo/react-native-instagram-stories?tab=readme-ov-file
  
  // Initial data structure with self user for the "Your Story" option
const initialData = [
  {
    user_id: 0,
    user_image: "https://p16.tiktokcdn.com/tos-maliva-avt-0068/2f134ee6b5d3a1340aeb0337beb48f2d~c5_720x720.jpeg",
    user_name: "Tin của bạn",
    active: false,
    stories: [
      {
        story_id: 1,
        story_image: "https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg",
      },
    ],
  }
];

const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const ITEM_SIZE = SCREEN_WIDTH / 5;
const TRANSLATE_VALUE = ITEM_SIZE / 2;
export const CONTAINER_HEIGHT = ITEM_SIZE + TRANSLATE_VALUE + 10;

// Add Friend interface
interface Friend {
  userId: string;
  userName: string;
  userAvatar: any;
}

  type StoriesProps = {
    followingsData?: any[]; // Optional prop for following data
  };
  
  const Stories: React.FC<StoriesProps> = ({ followingsData }) => {
    const storiesRef = useRef(null);
    const [showStory, setShowStory] = useState(false);
    const ScrollX = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    
    // State for friends data
    const [friends, setFriends] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [storyData, setStoryData] = useState(initialData);

    // Fetch friends from API
    useEffect(() => {
      const fetchFriends = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${API_BASE_URL}/friends?type=accept`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch friends');
          }
          
          const data = await response.json();
          
          if (data.isSuccess && Array.isArray(data.data)) {
            setFriends(data.data);
            console.log("Friends data:", data.data);
            
          // Transform friends data into the format expected by the Stories component
            const friendStories = data.data.map((friend: Friend, index: number) => ({
              user_id: friend.userId,
              user_image: friend.userAvatar.url || DEFAULT_DP,
              user_name: friend.userName || "Friend",  // Ensure we always have a user name
              active: Math.random() > 0.7, // Randomly set some friends as active (for demo)
              stories: [
                {
                  story_id: 1,
                  story_image: "https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg",
                },
              ],
            }));
            
            // Combine the initial "Your Story" entry with friends data
            setStoryData([...initialData, ...friendStories]);
          }
        } catch (error) {
          console.log('Error fetching friends:', error);
          setError('No friends');
        } finally {
          setLoading(false);
        }
      };

      fetchFriends();
    }, []);

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={GlobalStyles.colors.magenta} />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }
    
    return (
      <View>
        <Animated.FlatList
          keyExtractor={(item, index) => index.toString()}
          data={storyData}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            height: CONTAINER_HEIGHT + 20,
            paddingHorizontal: SCREEN_WIDTH / 2 - ITEM_SIZE / 2,
          }}
          snapToInterval={ITEM_SIZE}
          decelerationRate={"fast"}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: ScrollX } } }],
            { useNativeDriver: true }
          )}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / ITEM_SIZE
            );
          }}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 2) * ITEM_SIZE,
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
              (index + 1) * ITEM_SIZE,
              (index + 2) * ITEM_SIZE,
            ];
            const scale = ScrollX.interpolate({
              inputRange,
              outputRange: [0.8, 0.8, 1, 0.8, 0.8],
            });
            const translateY = ScrollX.interpolate({
              inputRange,
              outputRange: [
                0,
                TRANSLATE_VALUE / 2,
                TRANSLATE_VALUE,
                TRANSLATE_VALUE / 2,
                0,
              ],
            });
            return (
              <PressEffect>                <Pressable
                  onPress={() => {
                    if (item.user_id == 0) {
                      // Handle "Your Story" option - could navigate to AddStoryScreen
                      // navigation.navigate("AddStoryScreen");
                    } else {
                      // Navigate to friend's profile
                      navigation.navigate("profile-social-screen" as never);
                    }
                  }}
                >
                  <Animated.View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      transform: [{ translateY }, { scale }],
                      width: ITEM_SIZE,
                      height: ITEM_SIZE,
                      marginVertical: 5,
                    }}                  >
                    <ImageBackground
                      source={{ uri: item.user_image ? item.user_image : DEFAULT_DP }}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      imageStyle={[
                        {
                          resizeMode: "cover",
                          borderRadius: 60,
                          backgroundColor: GlobalStyles.colors.gray,
                        },
                        item.user_id == 0 && {
                          borderWidth: 2,
                          borderColor: GlobalStyles.colors.magenta,
                        },
                      ]}
                    >
                      <View
                        style={{
                          width: "100%",
                          height: "100%",
                          alignItems: "flex-end",
                          justifyContent: "flex-end",
                        }}
                      >
                        {item.user_id == 0 && (
                          <Ionicons
                            style={{}}
                            name="add-circle"
                            size={25}
                            color={GlobalStyles.colors.magenta}
                          />
                        )}
                        {item.active && (
                          <Ionicons
                            style={{ right: 3, bottom: 5 }}
                            name="ellipse"
                            size={15}
                            color={GlobalStyles.colors.greenLight}
                          />
                        )}
                      </View>
                    </ImageBackground>
                    <View style={styles.userNameContainer}>
                      <Text style={styles.userName} numberOfLines={1}>
                        {item.user_name.length > 8 ? `${item.user_name.substring(0, 8)}...` : item.user_name}
                      </Text>
                    </View>
                  </Animated.View>
                </Pressable>
              </PressEffect>
            );
          }}
        />        {showStory && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={showStory}
            statusBarTranslucent={true}
            onRequestClose={() => {
              setShowStory(!showStory);
            }}
          >
            {/* <ImageStory setShowStory={setShowStory} stories={storyData?.stories} /> */}
          </Modal>
        )}
      </View>
    );
  };
  
  export default Stories;
    const styles = StyleSheet.create({
    story: {
      width: 70,
      height: 70,
      borderRadius: 50,
      borderWidth: 3,
      borderColor: GlobalStyles.colors.cyan,
    },
    loadingContainer: {
      height: CONTAINER_HEIGHT + 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContainer: {
      height: CONTAINER_HEIGHT + 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      color: 'red',
      fontSize: 12,
    },
    userNameContainer: {
      width: ITEM_SIZE,
      alignItems: 'center',
    },
    userName: {
      marginTop: 2,
      fontSize: 10,
      color: 'black',
      textAlign: 'center',
    }
  });
  