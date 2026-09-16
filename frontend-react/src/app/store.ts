import { configureStore } from "@reduxjs/toolkit"
import authSlice from "../features/auth/authSlice.ts"
import dashboardSlice  from "../features/dashboard/dashboardSlice"
import userSlice from "../features/user/userSlice"
import themeSlice from "../features/theme/themeSlice"

export const store = configureStore({
  reducer: {
    userAuth: authSlice,
    dashController: dashboardSlice,
    userData: userSlice,
    theme: themeSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;