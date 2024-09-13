// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { decodeToken } from '../utils/jwtutils'; // Adjust the path as needed

const initialState = {
  userId: null,
  token: null,
  role: null,
};

// Retrieve token from localStorage
const token = window.localStorage.getItem('token');
const decodedToken = token ? decodeToken(token) : null;

const initialStateFromToken = {
  userId: decodedToken ? decodedToken.userId : null,
  token: token || null,
  role: decodedToken ? decodedToken.role : null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialStateFromToken,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    clearUserId: (state) => {
      state.userId = null;
    },
    clearToken: (state) => {
      state.token = null;
    },
    clearRole: (state) => {
      state.role = null;
    },
    clearAuth: (state) => {
      state.userId = null;
      state.token = null;
      state.role = null;
    },
  },
});

export const { setUserId, setToken, setRole, clearUserId, clearToken, clearRole, clearAuth } = userSlice.actions;
export default userSlice.reducer;
