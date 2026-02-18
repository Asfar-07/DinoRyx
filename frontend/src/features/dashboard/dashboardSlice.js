import { createSlice } from '@reduxjs/toolkit'

export const dashboardSlice = createSlice({
  name: 'dashController',
  initialState: {
    dashboardInfo:null,
    locationData:null,
    student:null,
    progress:[],
    income:[],
    settings:[]
  },
  reducers: {
    setDashboardInfo:(state,action)=>{
      state.dashboardInfo=action.payload
    },
    setLocationDate:(state,action)=>{
      state.locationData=action.payload
    },
    setStudent:(state,action)=>{
      state.student=action.payload
    },
  }
})
export const {setStudent,setDashboardInfo,setLocationDate}=dashboardSlice.actions;
export default dashboardSlice.reducer;