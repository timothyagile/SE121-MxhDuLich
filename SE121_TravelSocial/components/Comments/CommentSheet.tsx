import React, { useRef, useEffect } from "react";
import { View, FlatList } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { GlobalStyles } from "../../constants/Styles";
import CommentCard from "./CommentCard";
import EmojiInput from "../UI/EmojiInput";

interface CommentSheetProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

function CommentSheet({ visible, setVisible }: CommentSheetProps) {
    const actionSheetRef = useRef<ActionSheetRef>(null);
  useEffect(() => {
    if (visible) {
      actionSheetRef.current?.show();  // ✅ Dùng show() thay vì setModalVisible(true)
    } else {
      actionSheetRef.current?.hide();  // ✅ Dùng hide() thay vì setModalVisible(false)
    }
  }, [visible]);

  return (
    <View style={{ flex: 1 }}>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          backgroundColor: GlobalStyles.colors.primary,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
        indicatorStyle={{
          width: 50,
          marginVertical: 10,
          backgroundColor: "white",
        }}
        gestureEnabled={true}
        onClose={() => setVisible(false)}
      >
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          renderItem={() => <CommentCard />}
        />
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginHorizontal: 10 }}>
          <EmojiInput />
        </View>
      </ActionSheet>
    </View>
  );
}

export default CommentSheet;
