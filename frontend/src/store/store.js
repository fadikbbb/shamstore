import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Adjust path as necessary
import cartReducer from "./cartSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
