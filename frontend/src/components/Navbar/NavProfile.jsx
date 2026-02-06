import React, { useState } from "react";
import "./navprofile.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { authHandle } from "../../features/auth/authService";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { updateAuth } from "../../features/auth/authSlice";
import { removeUser } from "../../features/user/userSlice";

export default function NavProfile() {
  const [accountdiv, setAccountDiv] = useState(false);
  const isAuth = useSelector((state) => state.userauth.isAuthenticated);

  let navigate = useNavigate();
  const dispatch = useDispatch();

  function handlelogout() {
    authHandle
      .logoutService()
      .then((data) => {
        if(data === "success"){
          dispatch(updateAuth(false));
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
              <strong>USER NAME</strong>
              <small>Certified Trainer</small>
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
                <a href="/login">Login</a>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
