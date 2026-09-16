import { createSlice } from "@reduxjs/toolkit";

export interface LoginResponseData {
  name: string;
  email: string;
  picture: string;
  trainer: boolean;
}

interface AuthState {
  status: "loading" | "authenticated" | "unauthenticated";
  authInfo: LoginResponseData | null;
  loading: boolean;
}

const initialState: AuthState = {
  status: "loading",
  authInfo: null,
  loading: false,
};

export const authSlice = createSlice({
  name: "userAuth",
  initialState,

  reducers: {
    setAuth: (state, action) => {
      state.authInfo = action.payload;
    },

    setAuthStatus: (state, action) => {
      state.status = action.payload;
    },

    updateAuth: (state, action) => {
      state.status = action.payload
        ? "authenticated"
        : "unauthenticated";
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
      action.payload && (state.status = "loading");
    },

    removeAuth: (state) => {
      state.status = "unauthenticated";
      state.authInfo = null;
    },

    updateProfilePicture: (state, action) => {
      if (state.authInfo) {
        state.authInfo.picture = action.payload;
      }
    },
  },
});

export const {
  setAuth,
  setAuthStatus,
  updateAuth,
  setLoading,
  removeAuth,
  updateProfilePicture,
} = authSlice.actions;

export default authSlice.reducer;