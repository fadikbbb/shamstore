import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';  // Adjust path as necessary

const store = configureStore({
  reducer: {
    user: userReducer,  // Add the user slice to the Redux store
  },
});

export default store;
