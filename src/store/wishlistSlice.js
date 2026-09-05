import { createSlice } from "@reduxjs/toolkit";

const getInitialWishlist = () => {
  try {
    const savedWishlist = localStorage.getItem(
      "shopkart-wishlist"
    );

    return savedWishlist
      ? JSON.parse(savedWishlist)
      : [];
  } catch (error) {
    console.error(
      "Failed to load wishlist:",
      error
    );

    return [];
  }
};

const initialState = {
  items: getInitialWishlist(),
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;

      const alreadyExists = state.items.some(
        (item) => item.id === product.id
      );

      if (!alreadyExists) {
        state.items.push(product);
      }
    },

    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    toggleWishlist: (state, action) => {
      const product = action.payload;

      const alreadyExists = state.items.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) {
        state.items = state.items.filter(
          (item) => item.id !== product.id
        );
      } else {
        state.items.push(product);
      }
    },

    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;