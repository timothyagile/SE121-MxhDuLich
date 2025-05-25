import React, { useRef, useEffect, useState } from "react";
import { View, FlatList, Text, ActivityIndicator, TextInput, TouchableOpacity, Keyboard } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { GlobalStyles } from "../../constants/Styles";
import CommentCard from "./CommentCard";
import { API_BASE_URL } from "../../constants/config";
import { Ionicons } from "@expo/vector-icons";

interface CommentSheetProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  postId?: string; // Thêm prop postId để xác định bài viết cần lấy comment
}

function CommentSheet({ visible, setVisible, postId }: CommentSheetProps) {
    const actionSheetRef = useRef<ActionSheetRef>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [commentText, setCommentText] = useState<string>('');
    const [postingComment, setPostingComment] = useState<boolean>(false);
  
  useEffect(() => {
    if (visible) {
      actionSheetRef.current?.show();  // ✅ Dùng show() thay vì setModalVisible(true)
      fetchComments();
    } else {
      actionSheetRef.current?.hide();  // ✅ Dùng hide() thay vì setModalVisible(false)
    }
  }, [visible, postId]);

  const fetchComments = async () => {
    if (!postId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/comment/post/${postId}`, {
        method: 'GET',
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (data.isSuccess) {
        setComments(data.data || []);
      } else {
        setError(data.error || 'Không thể tải bình luận');
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      setError('Đã xảy ra lỗi khi tải bình luận');
    } finally {
      setLoading(false);
    }
  };
  const renderItem = ({ item }: { item: any }) => (
    <CommentCard comment={item} />
  );
  
  const postComment = async () => {
    if (!postId || !commentText.trim()) return;
    
    setPostingComment(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: postId,
          content: commentText.trim(),
        }),
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (data.isSuccess) {
        setCommentText('');
        fetchComments(); // Reload comments after posting
        Keyboard.dismiss();
      } else {
        console.error('Error posting comment:', data.error);
        setError(data.error || 'Không thể đăng bình luận');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      setError('Đã xảy ra lỗi khi đăng bình luận');
    } finally {
      setPostingComment(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          backgroundColor: GlobalStyles.colors.primary,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: '90%',
          //minHeight: 900, 
        }}
        indicatorStyle={{
          width: 50,
          marginVertical: 10,
          backgroundColor: "white",
        }}
        gestureEnabled={true}
        onClose={() => setVisible(false)}
      >
        {loading ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={GlobalStyles.colors.primary500} />
          </View>
        ) : error ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: 'red' }}>{error}</Text>
          </View>
        ) : comments.length === 0 ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: GlobalStyles.colors.gray }}>Chưa có bình luận nào</Text>
          </View>
        ) : (          <FlatList
            keyExtractor={(item) => item._id || Math.random().toString()}
            data={comments}
            renderItem={renderItem}
            // style={{ flex: 1 }}
            // contentContainerStyle={{ paddingBottom: 10 }}
          />
        )}
          <View style={{ 
            
          flexDirection: "row", 
          alignItems: "center", 
          marginHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: GlobalStyles.colors.gray,
          backgroundColor: GlobalStyles.colors.primary,
          // bottom: 0,
          // zIndex: 100,
          // position: 'absolute',
          paddingBottom: 20, // Give extra space at bottom for input field
        }}>
          <TextInput
            style={{
              flex: 1,
              borderWidth: 1,
              borderRadius: 20,
              borderColor: GlobalStyles.colors.gray,
              paddingHorizontal: 15,
              paddingVertical: 8,
              marginRight: 10,
              backgroundColor: GlobalStyles.colors.gray100,
            }}
            placeholder="Viết bình luận..."
            value={commentText}
            onChangeText={setCommentText}
            multiline
          />
          <TouchableOpacity 
            onPress={postComment}
            disabled={postingComment || !commentText.trim()}
            style={{
              backgroundColor: commentText.trim() 
                ? GlobalStyles.colors.primary500 
                : GlobalStyles.colors.gray,
              borderRadius: 25,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {postingComment ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Ionicons name="send" size={20} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </ActionSheet>

    </View>
  );
}

export default CommentSheet;
