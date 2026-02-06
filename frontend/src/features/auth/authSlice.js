import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'userauth',
  initialState: {
    isAuthenticated: false,
    loading: false,
  },
  reducers: {
   updateAuth:(state,action)=>{
    state.isAuthenticated=action.payload
   }
  }
})
export const {updateAuth}=authSlice.actions
export default authSlice.reducer;