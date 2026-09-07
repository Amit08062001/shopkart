import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import orderReducer from "./orderSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders: orderReducer,
    auth: authReducer,
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

    localStorage.setItem(
      "shopkart-orders",
      JSON.stringify(state.orders.items)
    );

    if (state.auth.user) {
      localStorage.setItem(
        "shopkart-user",
        JSON.stringify(state.auth.user)
      );
    } else {
      localStorage.removeItem("shopkart-user");
    }
  } catch (error) {
    console.error("Failed to save store data:", error);
  }
});

export default store;