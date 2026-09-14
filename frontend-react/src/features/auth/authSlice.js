import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: "userauth",
  initialState: {
    isAuthenticated: false,
    loading: false,
    authInfo: {},
  },
  reducers: {
    setAuth: (state, action) => {
      state.authInfo = action.payload;
    },
    updateAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    removeAuth:(state)=>{
      state.isAuthenticated = false;
      state.authInfo = {};
    },
    updateProfilePicture: (state, action) => {
      if (state.authInfo) {
        state.authInfo = { ...state.authInfo, picture: action.payload };
      }
    },
  },
});
export const { setAuth, updateAuth, removeAuth, updateProfilePicture } = authSlice.actions
export default authSlice.reducer;