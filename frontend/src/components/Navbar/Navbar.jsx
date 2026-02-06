import React from "react";
import "./navbar.css";
import NavProfile from "./NavProfile";
import NotifyIcon from "../UI/NotifyIcon";
import ThemeMode from "../UI/ThemeMode";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const isAuth = useSelector((state)=>state.userauth.isAuthenticated);
  return (
    <div className="Navbar">
      <nav>
        <div className="sitelogo">Logo</div>
        <ul className="secdash">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/user/manage/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/">Contact</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
          {/* <li>
            <a href="/">
              <button className="btn">Login</button>
            </a>
          </li> */}
          <li style={{display:"flex", alignItems:'center'}}>
            {isAuth && <NotifyIcon />}
             < NavProfile />
            <ThemeMode />
          </li>
        </ul>
      </nav>
    </div>
  );
}
