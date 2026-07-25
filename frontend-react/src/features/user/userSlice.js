import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'userData',
  initialState: {
    user:null,
    loading:false
  },
  reducers: {
    addUser:(state,action)=>{
      state.user=action.payload;
    },
    updateUser:(state,action)=>{

    },
    removeUser:(state)=>{
      state.user=null;
    }
  }
})
export const {addUser,updateUser,removeUser}=userSlice.actions
export default userSlice.reducer;