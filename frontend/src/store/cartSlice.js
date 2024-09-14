// cartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const initialState = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const existingItemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex > -1) {
        state[existingItemIndex] = {
          ...state[existingItemIndex],
          quantity: state[existingItemIndex].quantity + action.payload.quantity,
        };
      } else {
        state.push(action.payload);
      }

      saveCartToLocalStorage(state);
    },
    removeItem(state, action) {
      const updatedCart = state.filter((item) => item.id !== action.payload.id);
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    },
    clearCart(state) {
      localStorage.removeItem("cart");
      return [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
