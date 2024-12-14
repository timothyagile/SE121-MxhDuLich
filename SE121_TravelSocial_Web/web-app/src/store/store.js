// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import userReducer from './slides/userSlide';
 

export const store = configureStore({
  reducer: {
    user: userReducer, // Thêm các reducer khác ở đây nếu cần
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk), 
});

export default store;
