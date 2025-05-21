// Add these functions to your existing config.js file

import { Platform } from 'react-native';

// Set the API URL based on the platform
export const API_URL = Platform.OS === 'web' 
    ? 'http://localhost:5000'  // For web 
    : 'http://10.0.2.2:5000';   // For Android emulator, use your PC's IP for real device

/**
 * Save user event to recommendation system
 * 
 * @param {Object} eventData - Event data object
 * @param {string|number} eventData.user_id - User ID
 * @param {string|number} eventData.location_id - Location ID
 * @param {string} eventData.event_type - Event type (view, click, book, rate, search, favorite)
 * @param {Object} eventData.data - Additional data for the event
 * @returns {Promise} - Response from the API
 */
export const saveEvent = async (eventData) => {
  try {
    const response = await fetch(`${API_URL}/api/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error saving event:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get recommendations for a user
 * 
 * @param {string|number} userId - User ID
 * @param {string|number} locationId - Optional location ID for content-based recommendations
 * @param {string} recommendationType - Type of recommendation (hybrid, collaborative, content_based)
 * @returns {Promise} - Response from the API
 */
export const getRecommendations = async (userId, locationId = null, recommendationType = 'hybrid') => {
  try {
    let url = `${API_URL}/api/recommend?user_id=${userId}&case=${recommendationType}`;
    
    if (locationId) {
      url += `&location_id=${locationId}`;
    }
    
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Track common user events
 */
export const trackEvents = {
  /**
   * Track view event
   * @param {string|number} userId - User ID
   * @param {string|number} locationId - Location ID
   * @param {Object} additionalData - Additional data
   */
  view: (userId, locationId, additionalData = {}) => {
    return saveEvent({
      user_id: userId,
      location_id: locationId,
      event_type: 'view',
      data: additionalData
    });
  },
  
  /**
   * Track click event
   * @param {string|number} userId - User ID
   * @param {string|number} locationId - Location ID
   * @param {Object} additionalData - Additional data
   */
  click: (userId, locationId, additionalData = {}) => {
    return saveEvent({
      user_id: userId,
      location_id: locationId,
      event_type: 'click',
      data: additionalData
    });
  },
  
  /**
   * Track booking event
   * @param {string|number} userId - User ID
   * @param {string|number} locationId - Location ID
   * @param {Object} additionalData - Additional data
   */
  book: (userId, locationId, additionalData = {}) => {
    return saveEvent({
      user_id: userId,
      location_id: locationId,
      event_type: 'book',
      data: additionalData
    });
  },
  
  /**
   * Track rating event
   * @param {string|number} userId - User ID
   * @param {string|number} locationId - Location ID
   * @param {number} rating - Rating value (1-5)
   * @param {Object} additionalData - Additional data
   */
  rate: (userId, locationId, rating, additionalData = {}) => {
    return saveEvent({
      user_id: userId,
      location_id: locationId,
      event_type: 'rate',
      data: { rating, ...additionalData }
    });
  },
  
  /**
   * Track search event
   * @param {string|number} userId - User ID
   * @param {string|number} locationId - Location ID (optional)
   * @param {string} query - Search query
   */
  search: (userId, query, locationId = null) => {
    const eventData = {
      user_id: userId,
      event_type: 'search',
      data: { search_query: query }
    };
    
    if (locationId) {
      eventData.location_id = locationId;
    }
    
    return saveEvent(eventData);
  },
  
  /**
   * Track favorite event
   * @param {string|number} userId - User ID
   * @param {string|number} locationId - Location ID
   * @param {boolean} isFavorite - Is favorited or unfavorited
   */
  favorite: (userId, locationId, isFavorite = true) => {
    return saveEvent({
      user_id: userId,
      location_id: locationId,
      event_type: 'favorite',
      data: { is_favorite: isFavorite }
    });
  }
};
