import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity,
    Alert,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { DEFAULT_DP, GlobalStyles } from "../../constants/Styles";
  import { API_BASE_URL } from "../../constants/config";
  import { Ionicons } from '@expo/vector-icons';
  
  // Relationship status enum
  enum RelationStatus {
    NONE = "NONE",
    PENDING = "PENDING",
    FRIENDS = "FRIENDS",
    LOADING = "LOADING"
  }
  
  const ListCard = ({ userData }:any) => {
    const [isSending, setSending] = useState(false);
    const [relationStatus, setRelationStatus] = useState<RelationStatus>(RelationStatus.LOADING);
    
    // Check relationship status when component mounts
    useEffect(() => {
      checkRelationshipStatus();
    }, []);
    
    const checkRelationshipStatus = async () => {
      try {
        // We'll use the friends endpoint to get all friends and check if this user is in the list
        const response = await fetch(`${API_BASE_URL}/friends?type=accept`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        
        if (!response.ok) {
          setRelationStatus(RelationStatus.NONE);
          return;
        }
        
        const responseText = await response.text();
        let data;
        try {
          data = responseText ? JSON.parse(responseText) : {};
        } catch (e) {
          console.log('Failed to parse response as JSON:', responseText);
          setRelationStatus(RelationStatus.NONE);
          return;
        }
        
        if (data.isSuccess && Array.isArray(data.data)) {
          // Check if this user is in friends list
          const isFriend = data.data.some((friend: any) => friend.userId === userData._id);
          
          if (isFriend) {
            setRelationStatus(RelationStatus.FRIENDS);
          } else {
            // Check for pending requests
            const pendingResponse = await fetch(`${API_BASE_URL}/friends?type=pending`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
            });
            
            if (!pendingResponse.ok) {
              setRelationStatus(RelationStatus.NONE);
              return;
            }
            
            const pendingData = await pendingResponse.json();
            if (pendingData.isSuccess && Array.isArray(pendingData.data)) {
              const isPending = pendingData.data.some((friend: any) => friend.userId === userData._id);
              setRelationStatus(isPending ? RelationStatus.PENDING : RelationStatus.NONE);
            } else {
              setRelationStatus(RelationStatus.NONE);
            }
          }
        } else {
          setRelationStatus(RelationStatus.NONE);
        }
      } catch (error) {
        console.error("Error checking relationship status:", error);
        setRelationStatus(RelationStatus.NONE);
      }
    };

    const sendFriendRequest = async () => {
      if (isSending) return;
      
      setSending(true);
      try {
        // Gửi yêu cầu kết bạn đến API
        const response = await fetch(`${API_BASE_URL}/friend-request`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recipientId: userData._id,
            createNotification: true // Thêm flag để tạo thông báo
          }),
          credentials: 'include', // Include cookies in the request
        });
        
        const responseText = await response.text();
        let data;
        try {
          // Try to parse the response as JSON
          data = responseText ? JSON.parse(responseText) : {};
        } catch (e) {
          console.log('Failed to parse response as JSON:', responseText);
          data = { isSuccess: false, error: responseText || 'Unknown error' };
        }
        
        if (response.ok && data.isSuccess) {
          setRelationStatus(RelationStatus.PENDING);
          Alert.alert("Thành công", "Đã gửi lời mời kết bạn");
        } else {
          // Check if the error is about duplicate friend requests
          const errorMessage = typeof data.error === 'string' 
            ? data.error 
            : 'Không thể gửi lời mời kết bạn';
            
          if (errorMessage.includes('already') || errorMessage.includes('existing')) {
            // This is likely a duplicate request
            setRelationStatus(RelationStatus.PENDING);
            Alert.alert("Thông báo", "Lời mời kết bạn đã được gửi trước đó");
          } else {
            Alert.alert("Lỗi", errorMessage);
          }
        }
      } catch (error) {
        console.error("Error sending friend request:", error);
        Alert.alert("Lỗi", "Có lỗi xảy ra khi gửi lời mời kết bạn");
      } finally {
        setSending(false);
      }
    };
    
    const cancelFriendRequest = async () => {
      if (isSending) return;
      
      setSending(true);
      try {
        // Use the new cancel-request endpoint specifically designed for this purpose
        const response = await fetch(`${API_BASE_URL}/cancel-request/${userData._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        
        const responseText = await response.text();
        let data;
        try {
          // Try to parse the response as JSON
          data = responseText ? JSON.parse(responseText) : {};
        } catch (e) {
          console.log('Failed to parse response as JSON:', responseText);
          data = { isSuccess: false, error: responseText || 'Unknown error' };
        }
        
        if (response.ok && data.isSuccess) {
          setRelationStatus(RelationStatus.NONE);
          Alert.alert("Thành công", "Đã hủy lời mời kết bạn");
        } else {
          Alert.alert("Lỗi", typeof data.error === 'string' ? data.error : "Không thể hủy lời mời kết bạn");
        }
      } catch (error) {
        console.error("Error cancelling friend request:", error);
        Alert.alert("Lỗi", "Có lỗi xảy ra khi hủy lời mời kết bạn");
      } finally {
        setSending(false);
      }
    };
    
    const unfriend = async () => {
      if (isSending) return;
      
      setSending(true);
      try {
        // Use the unfriend endpoint to remove friendship
        const response = await fetch(`${API_BASE_URL}/unfriend/${userData._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        
        const data = await response.json();
        
        if (response.ok && data.isSuccess) {
          setRelationStatus(RelationStatus.NONE);
          Alert.alert("Thành công", "Đã hủy kết bạn");
        } else {
          Alert.alert("Lỗi", typeof data.error === 'string' ? data.error : "Không thể hủy kết bạn");
        }
      } catch (error) {
        console.error("Error unfriending:", error);
        Alert.alert("Lỗi", "Có lỗi xảy ra khi hủy kết bạn");
      } finally {
        setSending(false);
      }
    };
    
    // Function to handle button action based on relation status
    const handleRelationAction = () => {
      if (isSending) return;
      
      switch (relationStatus) {
        case RelationStatus.NONE:
          sendFriendRequest();
          break;
        case RelationStatus.PENDING:
          cancelFriendRequest();
          break;
        case RelationStatus.FRIENDS:
          Alert.alert(
            "Xác nhận",
            "Bạn có chắc chắn muốn hủy kết bạn với người này không?",
            [
              {
                text: "Hủy",
                style: "cancel"
              },
              { 
                text: "Đồng ý", 
                onPress: unfriend
              }
            ]
          );
          break;
        default:
          break;
      }
    };
    
    // Function to render button label based on relation status
    const getButtonLabel = () => {
      if (isSending) {
        return "Đang xử lý...";
      }
      
      switch (relationStatus) {
        case RelationStatus.LOADING:
          return "Đang kiểm tra...";
        case RelationStatus.NONE:
          return "Kết bạn";
        case RelationStatus.PENDING:
          return "Hủy gửi";
        case RelationStatus.FRIENDS:
          return "Bạn bè";
        default:
          return "Kết bạn";
      }
    };
    
    // Function to get button icon based on relation status
    const getButtonIcon = () => {
      if (isSending) return null;
      
      switch (relationStatus) {
        case RelationStatus.LOADING:
          return null;
        case RelationStatus.NONE:
          return <Ionicons name="person-add" size={16} color="white" />;
        case RelationStatus.PENDING:
          return <Ionicons name="close-circle" size={16} color="white" />;
        case RelationStatus.FRIENDS:
          return <Ionicons name="people" size={16} color="white" />;
        default:
          return <Ionicons name="person-add" size={16} color="white" />;
      }
    };
    
    // Function to get button style based on relation status
    const getButtonStyle = () => {
      switch (relationStatus) {
        case RelationStatus.LOADING:
          return styles.loadingButton;
        case RelationStatus.NONE:
          return styles.friendRequestButton;
        case RelationStatus.PENDING:
          return styles.cancelRequestButton;
        case RelationStatus.FRIENDS:
          return styles.friendsButton;
        default:
          return styles.friendRequestButton;
      }
    };

    return (
      <View>
        <View
          style={{
            backgroundColor: GlobalStyles.colors.primary300,
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            justifyContent: "space-between"
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{
                width: 60,
                height: 60,
                resizeMode: "cover",
                borderRadius: 30,
              }}
              source={{
                uri: userData.userAvatar && userData.userAvatar.url 
                  ? userData?.userAvatar?.url 
                  : DEFAULT_DP,
              }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontWeight: "bold", color: "black" }}>
                {userData.userName}
              </Text>
              <Text style={{ color: "rgba(7, 7, 7, 0.6)" }}>
                {userData.userEmail || userData.userName}
              </Text>
            </View>
          </View>
          <TouchableOpacity 
            style={getButtonStyle()}
            onPress={handleRelationAction}
            disabled={isSending || relationStatus === RelationStatus.LOADING}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {getButtonIcon()}
              <Text style={styles.buttonText}> {getButtonLabel()}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: GlobalStyles.colors.primary,
          }}
        />
      </View>
    );
  };
  
  export default ListCard;
  
  const styles = StyleSheet.create({
    friendRequestButton: {
      backgroundColor: GlobalStyles.colors.primary500,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cancelRequestButton: {
      backgroundColor: GlobalStyles.colors.red,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    friendsButton: {
      backgroundColor: GlobalStyles.colors.blue,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingButton: {
      backgroundColor: GlobalStyles.colors.gray100,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '500',
    }
  });
