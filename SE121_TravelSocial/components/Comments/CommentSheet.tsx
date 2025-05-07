import React, { useRef, useEffect, useState } from "react";
import { View, FlatList, Text, ActivityIndicator } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { GlobalStyles } from "../../constants/Styles";
import CommentCard from "./CommentCard";
import EmojiInput from "../UI/EmojiInput";
import { API_BASE_URL } from "../../constants/config";

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

  return (
    <View style={{ flex: 1 }}>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          backgroundColor: GlobalStyles.colors.primary,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: '90%', // Thiết lập chiều cao cố định là 90% màn hình
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
        ) : (
          <FlatList
            keyExtractor={(item) => item._id || Math.random().toString()}
            data={comments}
            renderItem={renderItem}
          />
        )}
        
        <View style={{ 
          flexDirection: "row", 
          justifyContent: "center", 
          alignItems: "center", 
          marginHorizontal: 10,
          paddingVertical: 10,
          marginTop: 10,
          marginBottom: comments.length === 0 ? 'auto' : 10 // Tự động đẩy lên trên nếu không có comment
        }}>
          {/* <EmojiInput postId={postId} onCommentAdded={fetchComments} /> */}
        </View>
      </ActionSheet>
    </View>
  );
}

export default CommentSheet;
