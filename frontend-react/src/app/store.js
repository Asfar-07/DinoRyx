import {configureStore} from "@reduxjs/toolkit"
import authSlice from "../features/auth/authSlice"
import dashboardSlice  from "../features/dashboard/dashboardSlice"
import userSlice from "../features/user/userSlice"
import themeSlice from "../features/theme/themeSlice"

export default configureStore({
    reducer:{
        userauth:authSlice,
        dashController:dashboardSlice,
        userData:userSlice,
        theme:themeSlice
    }
})