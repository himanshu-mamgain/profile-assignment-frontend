// global store
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth.slice";
import profileSlice from "./slices/profile.slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice
  },
});

export default store;
