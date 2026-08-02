import { BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Home/Home";
import Login from "@/pages/Login/Login.tsx";
import Profile from "../pages/Profile/Profile.tsx";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ForgotPassword/ResetPassword";
import CreateCompany from "@/pages/CreateDashboard/CreateCompany.tsx";
import MainLocation from "@/components/MapUI/MainLocation";
import Welcome from "@/pages/Welcome/Welcome.tsx";
import GeneralSetting from "@/pages/Setting/GeneralSetting.tsx";
import MainLayout from "@/layouts/MainLayout.jsx";
import HeaderLayout from "@/layouts/HeaderLayout.jsx";
import NoLayout from "@/layouts/NoLayout.jsx";
// import OnboardingPage from "@/pages/Welcome/Onboarding.tsx";

export default function AppRoutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Header + Footer */}
          <Route element={<MainLayout />}>
            <Route path="/" Component={Home} />
            <Route path="/settings/general" Component={GeneralSetting} />
          </Route>

          {/* Header Only */}
          <Route element={<HeaderLayout />}>
            <Route path="/account" Component={Profile} />
            <Route path="/nearby-location" Component={MainLocation} />
          </Route>

          {/* No Header/Footer */}
          <Route element={<NoLayout />}>
            <Route path="/user/manage/dashboard" Component={Dashboard} />
            <Route path="/login" Component={Login} />
            <Route path="/forgot-password" Component={ForgotPassword} />
            <Route path="/reset-password" Component={ResetPassword} />
            <Route path="/create-company" Component={CreateCompany} />
            <Route path="/welcome-to-dinoRyx" Component={Welcome} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}
