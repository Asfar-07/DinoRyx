import { createSlice } from '@reduxjs/toolkit'

export const dashboardSlice = createSlice({
  name: 'dashController',
  initialState: {
    dashboardInfo:null,
    locationData:null,
    students:null,
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
    setStudentData:(state,action)=>{
      state.students=action.payload
    },
  }
})
export const {setStudentData,setDashboardInfo,setLocationDate}=dashboardSlice.actions;
export default dashboardSlice.reducer;