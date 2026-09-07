import { createSlice } from "@reduxjs/toolkit";

const getInitialOrders = () => {
  try {
    const savedOrders = localStorage.getItem("shopkart-orders");

    return savedOrders
      ? JSON.parse(savedOrders)
      : [];
  } catch (error) {
    console.error(
      "Failed to load orders:",
      error
    );

    return [];
  }
};

const initialState = {
  items: getInitialOrders(),
};

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    placeOrder: (state, action) => {
      const order = {
        ...action.payload,
        id: `SK-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: "Order Placed",
      };

      state.items.unshift(order);
    },

    clearOrders: (state) => {
      state.items = [];
    },
  },
});

export const {
  placeOrder,
  clearOrders,
} = orderSlice.actions;

export default orderSlice.reducer;