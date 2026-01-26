import "./login.css";
import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { signupService,logoutService,loginService,googleAuth_Service } from "../../features/auth/authService";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [userdata,setuserData] = useState({
    name:"",
    email:"",
    password:""
  })
  const handleGoogleAuth = async (credentialResponse) => {
    const googleToken = credentialResponse.credential;
    googleAuth_Service(googleToken)
  };
  function handleSubmit() {
    if (isSignup) {
      signupService(userdata)
    }else{
      loginService(userdata)
    }
  }
  return (
    <div className="auth-container">
      <div className={`auth-card ${isSignup ? "signup" : "login"}`}>
        <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>
        <p className="subtitle">
          {isSignup ? "Sign up to get started" : "Login to your account"}
        </p>

        {isSignup && <input type="text" placeholder="Full Name" value={userdata.name} onChange={
          (e)=>{
            setuserData({...userdata,name:e.target.value})
          }
        }/>}
        <input type="email" placeholder="Email" value={userdata.email} onChange={
          (e)=>{
            setuserData({...userdata,email:e.target.value})
          }
        }/>
        <input type="password" placeholder="Password" value={userdata.password} onChange={
          (e)=>{
            setuserData({...userdata,password:e.target.value})
          }
        }/>

        <button className="primary-btn" onClick={handleSubmit}>
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <div className="divider">OR</div>

        <div className="social-login">
          <button className="facebook-btn">
            <FaFacebookF /> Continue with Facebook
          </button>
          <button onClick={logoutService }>Logout</button>
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
      </div>
    </div>
  );
}
