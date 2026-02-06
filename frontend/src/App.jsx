import React, { useEffect } from "react";
import "./App.css";
import "./styles/theme.css";
import "./styles/global.css";
import AppRoutes from "./routes/AppRoutes";
import { useSelector, useDispatch } from "react-redux";
import { setThemeFromLocal } from "./features/theme/themeSlice";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  useEffect(() => {
    dispatch(setThemeFromLocal());
  }, [dispatch]);
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.style.setProperty("--primary-bg-color", "#0a0f22");
      root.style.setProperty("--secondary-bg-color", "#1d2233");
      root.style.setProperty("--symbol-color", "#56b2bb");
      root.style.setProperty("--primary-text-color", "#f0f4f8");
      root.style.setProperty("--secondary-text-color", "#bac7cc");
    } else {
      root.style.setProperty("--primary-bg-color", "#ffffff");
      root.style.setProperty("--secondary-bg-color", "#f0f0f0");
      root.style.setProperty("--symbol-color", "#56b2bb");
      root.style.setProperty("--primary-text-color", "#0a0f22");
      root.style.setProperty("--secondary-text-color", "#555");
    }
  }, [theme]);

  return (
    <div className="App">
      <ToastContainer />
      <AppRoutes />
    </div>
  );
}

export default App;
