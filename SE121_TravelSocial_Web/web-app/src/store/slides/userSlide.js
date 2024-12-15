
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null, // Dữ liệu user
  isLoading: false, // Trạng thái loading
  error: null,     // Lỗi
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const fetchUserDetailsThunk = (userId) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(`http://localhost:3000/user/getbyid/${userId}`);
      const data = await response.json();
      dispatch(setUserData(data.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError('Failed to fetch user data'));
      dispatch(setLoading(false));
    }
  };

export const { setUserData, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
