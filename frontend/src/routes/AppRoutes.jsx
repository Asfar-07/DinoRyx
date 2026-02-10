import { BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ForgotPassword/ResetPassword";
import CreateCompany from "@/pages/CreateDashboard/CreateCompany.tsx";

export default function AppRoutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/user/manage/dashboard" Component={Dashboard}></Route>
           <Route path="/login" Component={Login}></Route>
           <Route path="/account" Component={Profile}></Route>
           <Route path="/forgot-password" Component={ForgotPassword}></Route>
           <Route path="/reset-password" Component={ResetPassword}></Route>
           <Route path="/create-company" Component={CreateCompany}></Route>
       </Routes>
      </BrowserRouter>
    </div>
  );
}
