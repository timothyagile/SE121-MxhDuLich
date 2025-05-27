import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface RatingInputProps {
  initialRating?: number;
  onRatingSubmit: (rating: number) => void;
  size?: number;
  showLabel?: boolean;
  readOnly?: boolean;
}

/**
 * A reusable rating input component
 * 
 * @param initialRating Initial rating value (1-5)
 * @param onRatingSubmit Callback function when rating is submitted
 * @param size Size of the stars
 * @param showLabel Whether to show the rating label
 * @param readOnly If true, the rating cannot be changed
 */
export const RatingInput: React.FC<RatingInputProps> = ({
  initialRating = 0,
  onRatingSubmit,
  size = 24,
  showLabel = false,
  readOnly = false,
}) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [tempRating, setTempRating] = useState<number>(initialRating);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handlePress = (value: number) => {
    if (readOnly) return;
    
    setRating(value);
    setTempRating(value);
    onRatingSubmit(value);
    setIsSubmitted(true);
    
    // Reset the "submitted" visual indicator after a short delay
    setTimeout(() => {
      setIsSubmitted(false);
    }, 1500);
  };

  const handleHover = (value: number) => {
    if (readOnly) return;
    setTempRating(value);
  };

  const handleHoverEnd = () => {
    if (readOnly) return;
    setTempRating(rating);
  };

  const renderStars = () => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      const name = i <= tempRating ? 'star' : 'star-o';
      
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handlePress(i)}
          onPressIn={() => handleHover(i)}
          onPressOut={handleHoverEnd}
          style={styles.starContainer}
          disabled={readOnly}
        >
          <FontAwesome
            name={name}
            size={size}
            color={i <= tempRating ? '#FFD700' : '#CCCCCC'}
          />
        </TouchableOpacity>
      );
    }
    
    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>{renderStars()}</View>
      {showLabel && (
        <View style={styles.labelContainer}>
          <Text style={styles.ratingText}>
            {rating > 0 ? `${rating}/5` : 'Chưa đánh giá'}
          </Text>
          {isSubmitted && (
            <Text style={styles.submittedText}>Đánh giá đã được gửi!</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  starContainer: {
    padding: 5,
  },
  labelContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    color: '#333',
  },
  submittedText: {
    fontSize: 14,
    color: 'green',
    marginTop: 5,
  },
});

/**
 * A simple component to display a static rating
 * 
 * @param rating The rating value (1-5)
 * @param size Size of the stars
 */
export const RatingDisplay: React.FC<{ rating: number; size?: number }> = ({
  rating,
  size = 16,
}) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {Array.from({ length: 5 }).map((_, index) => (
        <FontAwesome
          key={index}
          name={index < Math.round(rating) ? 'star' : 'star-o'}
          size={size}
          color="#FFD700"
          style={{ marginRight: 2 }}
        />
      ))}
    </View>
  );
};
