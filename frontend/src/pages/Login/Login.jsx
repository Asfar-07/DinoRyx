import "./login.css";
import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { authHandle } from "../../features/auth/authService";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { updateAuth } from "../../features/auth/authSlice";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [userdata, setuserData] = useState({name: "",email: "",password: "",});

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleAuth = async (credentialResponse) => {
    const googleToken = credentialResponse.credential;
    authHandle.googleService(googleToken);
  };
  function handleSubmit() {
    if (isSignup) {
      authHandle
        .signupService(userdata)
        .then((data) => {
          if (data === "success") {
            dispatch(updateAuth(true));
            setuserData({name: "",email: "",password: "",});
            navigate("/");
          } else {
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      authHandle
        .loginService(userdata)
        .then((data) => {
          console.log(data);
          if (data === "success") {
            dispatch(updateAuth(true));
            setuserData({name: "",email: "",password: "",});
            navigate("/");
          } else {
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <div className="auth-container">
      <div className={`auth-card ${isSignup ? "signup" : "login"}`}>
        <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>
        <p className="subtitle">
          {isSignup ? "Sign up to get started" : "Login to your account"}
        </p>

        {isSignup && (
          <input
            type="text"
            placeholder="Full Name"
            value={userdata.name}
            onChange={(e) => {
              setuserData({ ...userdata, name: e.target.value });
            }}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={userdata.email}
          onChange={(e) => {
            setuserData({ ...userdata, email: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={userdata.password}
          onChange={(e) => {
            setuserData({ ...userdata, password: e.target.value });
          }}
        />

        <button className="primary-btn" onClick={handleSubmit}>
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <div className="divider">OR</div>

        <div className="social-login">
          <button className="facebook-btn">
            <FaFacebookF /> Continue with Facebook
          </button>
          <GoogleLogin
            onSuccess={handleGoogleAuth}
            onError={() => console.log("Login Failed")}
          />
        </div>

        <p className="switch-text">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? " Login" : " Sign Up"}
          </span>
        </p>
        {!isSignup && (
         <Link to="/forgot-password">forgot-password</Link>
        )}
      </div>
    </div>
  );
}
