import { Alert } from 'react-native';
import { trackEvents } from '../constants/recommendation';

/**
 * Submit a rating for a location
 * 
 * @param userId User ID
 * @param locationId Location ID
 * @param rating Rating value (1-5)
 * @param comment Optional comment for the rating
 * @param API_BASE_URL Base URL for the API
 * @returns 
 */
export const submitRating = async (
  userId: string | null,
  locationId: string,
  rating: number,
  comment?: string,
  API_BASE_URL?: string
) => {
  if (!userId) {
    Alert.alert('Thông báo', 'Vui lòng đăng nhập để đánh giá');
    return { success: false };
  }

  if (rating < 1 || rating > 5) {
    Alert.alert('Lỗi', 'Đánh giá phải từ 1 đến 5 sao');
    return { success: false };
  }

  try {
    // Track the rating event in the recommendation system
    const trackResult = await trackEvents.rate(userId, locationId, rating, {
      has_comment: Boolean(comment)
    });

    console.log(`Tracked rating event: ${userId} rated ${locationId} with ${rating} stars`);

    // If API_BASE_URL is provided, also send the rating to your backend
    if (API_BASE_URL) {
      const response = await fetch(`${API_BASE_URL}/ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          locationId,
          rating,
          comment,
          timestamp: new Date().toISOString()
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        console.error('Error submitting rating to backend:', result);
        // Even if backend fails, we still tracked the event
        return { success: true, backendSuccess: false };
      }

      return { success: true, backendSuccess: true, data: result };
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting rating:', error);
    return { success: false, error };
  }
};

/**
 * Create a rating component that developers can use
 * 
 * Usage example:
 * ```tsx
 * import { RatingInput } from '../utils/ratingUtils';
 * 
 * // In your component
 * <RatingInput
 *    initialRating={3}
 *    onRatingSubmit={(rating) => submitRating(userId, locationId, rating)}
 *    size={30}
 *    showLabel={true}
 * />
 * ```
 */
