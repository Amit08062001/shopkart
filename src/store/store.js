import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

store.subscribe(() => {
  try {
    const state = store.getState();

    localStorage.setItem(
      "shopkart-cart",
      JSON.stringify(state.cart.items)
    );

    localStorage.setItem(
      "shopkart-wishlist",
      JSON.stringify(state.wishlist.items)
    );
  } catch (error) {
    console.error(
      "Failed to save store data:",
      error
    );
  }
});

export default store;