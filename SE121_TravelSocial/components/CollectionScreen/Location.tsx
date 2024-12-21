import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface CollectionItemProps {
  imageUrl: string;       // URL của hình ảnh location
  name: string;           // Tên của location
  rating?: number;        // Đánh giá sao   
  cancellation?: string;  // Chính sách hủy phòng
  onPress?: () => void;   // Hàm gọi khi nhấn vào
}

const CollectionItem: React.FC<CollectionItemProps> = ({
  imageUrl,
  name,
  rating,
  cancellation,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <View style={styles.ratingContainer}>
          <Image
            source={require("../../assets/icons/star.png")} // Icon sao
            style={styles.starIcon}
          />
          <Text style={styles.ratingText}>{rating?.toFixed(1) || "N/A"}</Text>
          <Text style={styles.cancellationText}>{cancellation}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    elevation: 2, // Shadow (Android)
    shadowColor: "#000", // Shadow (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  ratingText: {
    fontSize: 14,
    color: "#333",
  },
  cancellationText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 10,
  },
});

export default CollectionItem;
