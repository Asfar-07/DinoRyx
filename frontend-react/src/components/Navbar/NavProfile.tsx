//@ts-nocheck
import React, { useState } from "react";
import "./navprofile.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { authHandle } from "../../features/auth/authService.js";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setAuth, removeAuth } from "../../features/auth/authSlice.ts";
import { removeUser } from "../../features/user/userSlice.js";
import type { RootState } from "../../app/store.ts"

export default function NavProfile() {
  const [accountDiv, setAccountDiv] = useState(false);
  const isAuth = useSelector((state: RootState) => state.userAuth.status);
  const authInfo = useSelector((state: RootState) => state.userAuth.authInfo);

  const backendUrl = "https://res.cloudinary.com/is9tsczx/image/upload/v1789498226";

  let navigate = useNavigate();
  const dispatch = useDispatch();
  function handleLogout() {
    authHandle
      .logoutService()
      .then((data) => {
          dispatch(removeAuth());
          dispatch(removeUser());
          navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div
      className="main-h-ur-p"
      onClick={() => {
        accountDiv ? setAccountDiv(false) : setAccountDiv(true);
      }}
    >
      <div className="header-user-profile">
        {isAuth === "authenticated" && authInfo ? (
          <>
            <img src={backendUrl + authInfo?.picture} alt="user profile" />
            <div className="header-username">
              <strong>{authInfo?.name}</strong>
              {authInfo?.trainer ? <small>Certified Trainer</small> :<small>Normal User</small>}
              
            </div>
          </>
        ) : (
          <img
            src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg"
            alt="default profile"
          />
        )}
      </div>
      {accountDiv && (
        <div className="header-s-account">
          <ul>
            <li>
              <Link to="/">My Account</Link>
            </li>
            {isAuth === "authenticated" && (
              <li>
                <Link to="/account">Profile</Link>
              </li>
            )}
            <li>
              <Link to="/settings/general">Settings</Link>
            </li>
            {isAuth === "authenticated" ? (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
