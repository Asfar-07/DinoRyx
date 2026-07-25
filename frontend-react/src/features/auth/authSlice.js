import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: "userauth",
  initialState: {
    isAuthenticated: false,
    loading: false,
    authInfo: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.authInfo = action.payload;
    },
    updateAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    removeAuth:(state)=>{
      state.isAuthenticated=false;
      state.authInfo=null;
    }
  },
});
export const {setAuth,updateAuth,removeAuth}=authSlice.actions
export default authSlice.reducer;