import {
    View,
    StyleSheet,
    Dimensions,
    ImageBackground,
    Pressable,
    KeyboardAvoidingView,
    Alert,
    Text,
  } from "react-native";
  
  import React, { useContext, useEffect, useState } from "react";
  import { GlobalStyles } from "../constants/Styles";
  import Button from "../components/Button";
  import InputField from "../components/InputField";
  import { Ionicons } from "@expo/vector-icons";
  import CameraScreen from "./CameraScreen";
  import { AuthContext } from "../store/auth-context";
  import ProgressOverlay from "../components/ProgressOverlay";
  import ErrorOverlay from "../components/ErrorOverlay";
  import UploadIcon from "../assets/images/UploadIcon";
  import { Platform } from "react-native";
  import { StatusBar } from "expo-status-bar";
  import { API_BASE_URL } from "../constants/config";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import LocationPicker from "../components/UI/LocationPicker";
  
  const { width, height } = Dimensions.get("window");
  const PLACEHOLDER_IMAGE =
    "https://img.freepik.com/free-vector/image-folder-concept-illustration_114360-114.jpg?t=st=1708625623~exp=1708629223~hmac=155af0101788f9a6c147e4a7fa105127a5089c3bf46ded7b7cd2f15de53ec39c&w=740";
  
export default function NewPostScreen({ navigation, route }:any) {
    const authCtx = useContext(AuthContext);
    const [type, setType] = useState();
    const [post, setPost] = useState(null);
    const [resizeModeCover, setResizeModeCover] = useState(true);
    const [showCamera, setShowCamera] = useState(true);
    const [caption, setCaption] = useState("");
    const [locationId, setLocationId] = useState("6704f3650722c4f99305dc5d"); // Default locationId
    const [locationName, setLocationName] = useState(""); // Tên của địa điểm đã chọn
    const [tripType, setTripType] = useState("solo");
    const [travelSeason, setTravelSeason] = useState("summer");
    const [privacyLevel, setPrivacyLevel] = useState("friend");
  
    const [uploading, setUploading] = useState({
      status: false,
      progress: 0,
      success: true,
    });
  
    useEffect(() => {
      navigation.setOptions({
        headerShown: false,
        title: "Tạo bài viết",
      });
    }, []);

    // Hàm để lấy thông tin về file từ URI
    const getFilename = (uri: string) => {
      const uriParts = uri.split("/");
      const name = uriParts[uriParts.length - 1];
      const fileTypeParts = name.split(".");
      const fileType = fileTypeParts[fileTypeParts.length - 1];
      return { name, fileType };
    };

    // Hàm xử lý khi người dùng chọn địa điểm
    const handleLocationSelect = (id: string, name: string) => {
      setLocationId(id);
      setLocationName(name);
    };

    async function newPostHandler() {
      if (!caption) {
        Alert.alert("Thông báo", "Vui lòng nhập nội dung bài viết");
        return;
      }

      try {
        setUploading((prevData) => ({
          ...prevData,
          status: true,
          progress: 0
        }));

        // Tăng progress để hiển thị đang xử lý
        const progressInterval = setInterval(() => {
          setUploading((prev) => {
            if (prev.progress < 90) {
              return { ...prev, progress: prev.progress + 10 };
            }
            return prev;
          });
        }, 300);
        
        let imageData = null;
        
        // Bước 1: Upload ảnh nếu có
        if (post) {
          try {
            const formData = new FormData();
            const fileInfo = getFilename(post);
            
            formData.append("files", {
              uri: post,
              type: `image/${fileInfo.fileType}`,
              name: fileInfo.name,
            } as any);
            
            // Gọi API để upload ảnh
            const uploadResponse = await fetch(`${API_BASE_URL}/upload`, {
              method: 'POST',
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              credentials: 'include',
              body: formData,
            });

            const uploadResult = await uploadResponse.json();
            
            if (!uploadResult.isSuccess) {
              throw new Error(typeof uploadResult.error === 'string' 
                ? uploadResult.error 
                : "Không thể tải lên hình ảnh");
            }
            
            // Lấy data về ảnh đã upload thành công
            imageData = uploadResult.data;
            console.log("Upload result:", imageData);
          } catch (uploadError) {
            console.error("Error uploading image:", uploadError);
            clearInterval(progressInterval);
            setUploading({ status: true, progress: 100, success: false });
            setTimeout(() => {
              setUploading({ status: false, progress: 0, success: false });
              Alert.alert("Lỗi", "Không thể tải lên hình ảnh");
            }, 1000);
            return; // Dừng hàm tại đây nếu upload thất bại
          }
        }

        // Bước 2: Tạo bài viết với JSON thông thường
        try {
          const postData = {
            content: caption,
            locationId: locationId,
            tripType: tripType,
            travelSeason: travelSeason,
            privacyLevel: privacyLevel,
            images: imageData || [] // Sử dụng kết quả từ API upload hoặc mảng rỗng nếu không có ảnh
          };

          console.log("Sending post data:", JSON.stringify(postData));

          // Gọi API để tạo bài viết
          const postResponse = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(postData),
          });

          const postResult = await postResponse.json();
          
          clearInterval(progressInterval);
          
          if (postResult.isSuccess) {
            setUploading({ status: true, progress: 100, success: true });
            setTimeout(() => {
              setUploading({ status: false, progress: 0, success: true });
              navigation.goBack();
            }, 1000);
          } else {
            console.error('Error creating post:', postResult.error);
            setUploading({ status: true, progress: 100, success: false });
            setTimeout(() => {
              setUploading({ status: false, progress: 0, success: false });
              // Đảm bảo message luôn là string
              Alert.alert("Lỗi", "Không thể đăng bài viết");
            }, 1000);
          }
        } catch (postError) {
          console.error("Error creating post:", postError);
          clearInterval(progressInterval);
          setUploading({ status: true, progress: 100, success: false });
          setTimeout(() => {
            setUploading({ status: false, progress: 0, success: false });
            Alert.alert("Lỗi", "Không thể đăng bài viết");
          }, 1000);
        }
      } catch (error) {
        console.error("Error in post creation process:", error);
        setUploading({ status: true, progress: 100, success: false });
        setTimeout(() => {
          setUploading({ status: false, progress: 0, success: false });
          // Đảm bảo message luôn là string
          Alert.alert("Lỗi", "Đã xảy ra lỗi khi đăng bài viết");
        }, 1000);
      }
    }
    
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.container]}
      >
        <StatusBar backgroundColor={GlobalStyles.colors.primary} />
        <CameraScreen
          showCamera={showCamera}
          setShowCamera={setShowCamera}
          getPost={setPost}
          mode={type === "video" ? type : undefined}
        />
        {!post ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <UploadIcon
              onPress={() => setShowCamera(true)}
              width={Number(GlobalStyles.styles.windowWidth) - 50}
              height={height / 2}
            />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <View
              style={{
                width: "100%",
                borderRadius: 40,
                backgroundColor: GlobalStyles.colors.primary300,
                padding: 10,
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: height / 2,
                  backgroundColor: GlobalStyles.colors.primary300,
                  borderRadius: 30,
                  overflow: "hidden",
                }}
              >
                <ImageBackground
                  source={{
                    uri: post,
                  }}
                  style={{
                    flex: 1,
                  }}
                  imageStyle={{
                    resizeMode: resizeModeCover ? "cover" : "contain",
                  }}
                >
                  <Pressable
                    style={{
                      flex: 1,
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                      margin: 20,
                    }}
                    onPress={() => {
                      setResizeModeCover(!resizeModeCover);
                    }}
                  >
                    <Pressable
                      style={{
                        backgroundColor: "white",
                        borderRadius: 50,
                        padding: 10,
                      }}
                      onPress={() => {
                        setShowCamera(true);
                      }}
                    >
                      <Ionicons
                        name="sync-outline"
                        size={25}
                        color={GlobalStyles.colors.blue}
                      />
                    </Pressable>
                  </Pressable>
                </ImageBackground>
              </View>
              <View style={{ marginTop: 10 }}>
                <InputField
                  containerStyle={{ color: "white" }}
                  placeholder="bạn đang nghĩ gì?"
                  multiline={true}
                  onChangeText={setCaption}
                  value={caption}
                  inValid={true}
                />
                
                {/* Thêm LocationPicker để chọn địa điểm */}
                <View style={styles.locationPickerContainer}>
                  <Text style={styles.sectionTitle}>Địa điểm</Text>
                  <LocationPicker 
                    selectedLocationId={locationId} 
                    onLocationSelect={handleLocationSelect} 
                  />
                </View>
                
                {/* Có thể thêm các tùy chọn khác như tripType, travelSeason, privacyLevel ở đây */}
              </View>
            </View>
          </View>
        )}
        <View
          style={{
            padding: 20,
          }}
        >
          <Button title={"Post"} onPress={newPostHandler} />
        </View>
        {uploading.status && (
          <>
            {uploading.success ? (
              <ProgressOverlay
                title={"Uploading"}
                progress={uploading.progress}
              />
            ) : (
              <ErrorOverlay
                message={"Uploading Failed"}
                onClose={() => {
                  setUploading({ status: false, progress: 0, success: true });
                }}
              />
            )}
          </>
        )}
      </KeyboardAvoidingView>
    );
  }
  
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: GlobalStyles.colors.primary,
      flex: 1,
    },
    locationPickerContainer: {
      marginTop: 15,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: GlobalStyles.colors.gray,
      marginBottom: 8,
    },
  });
