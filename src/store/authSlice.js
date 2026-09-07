import { createSlice } from "@reduxjs/toolkit";

const getInitialUser = () => {
  try {
    const savedUser = localStorage.getItem("shopkart-user");

    if (!savedUser) {
      return null;
    }

    return JSON.parse(savedUser);
  } catch (error) {
    console.error("Failed to load user:", error);
    return null;
  }
};

const savedUser = getInitialUser();

const initialState = {
  user: savedUser,
  isAuthenticated: Boolean(savedUser),
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    login: (state, action) => {
      state.user = {
        name: action.payload.name || "ShopKart User",
        email: action.payload.email || "",
        phone: action.payload.phone || "",
        address: action.payload.address || "",
        role: action.payload.role || "user",
      };

      state.isAuthenticated = true;
    },

    updateProfile: (state, action) => {
      if (!state.user) {
        return;
      }

      state.user = {
        ...state.user,
        ...action.payload,
      };
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  login,
  updateProfile,
  logout,
} = authSlice.actions;

export default authSlice.reducer;