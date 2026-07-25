import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode:'dark'
  },
  reducers: {
     toggleTheme: (state) => {
        state.mode = state.mode === "dark" ? "light" : "dark";
        window.localStorage.setItem("theme",state.mode)
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
    setThemeFromLocal:(state)=>{
    const savedTheme = localStorage.getItem("theme") || "dark";
    state.mode=savedTheme
    }
  }
  
})

export const { toggleTheme, setTheme, setThemeFromLocal } = themeSlice.actions;
export default themeSlice.reducer;