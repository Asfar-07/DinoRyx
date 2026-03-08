//@ts-nocheck
import React, { useState } from "react";
import "./navprofile.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { authHandle } from "../../features/auth/authService";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setAuth,removeAuth } from "../../features/auth/authSlice";
import { removeUser } from "../../features/user/userSlice";

export default function NavProfile() {
  const [accountdiv, setAccountDiv] = useState(false);
  const isAuth = useSelector((state) => state.userauth.isAuthenticated);
  const authInfo = useSelector((state) => state.userauth.authInfo);

  let navigate = useNavigate();
  const dispatch = useDispatch();

  function handlelogout() {
    authHandle
      .logoutService()
      .then((data) => {
        if(data === "success"){
          dispatch(removeAuth());
          dispatch(removeUser());
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div
      className="main-h-ur-p"
      onClick={() => {
        accountdiv ? setAccountDiv(false) : setAccountDiv(true);
      }}
    >
      <div className="header-user-profile">
        {isAuth ? (
          <>
            <img src="https://i.pravatar.cc/40" alt="user profile" />
            <div className="header-username">
              <strong>{authInfo.name}</strong>
              {authInfo.trainer ? <small>Certified Trainer</small> :<small>Normal User</small>}
              
            </div>
          </>
        ) : (
          <img
            src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg"
            alt="default profile"
          />
        )}
      </div>
      {accountdiv && (
        <div className="header-s-account">
          <ul>
            <li>
              <Link to="/">My Account</Link>
            </li>
            {isAuth && (
              <li>
                <Link to="/account">Profile</Link>
              </li>
            )}
            <li>
              <Link to="/">Settings</Link>
            </li>
            {isAuth ? (
              <li>
                <button onClick={handlelogout}>Logout</button>
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
