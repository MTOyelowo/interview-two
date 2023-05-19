import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/authFeature/state/authSlice";
import usersReducer from "../../features/userFeature/state/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});
