import "./login.css";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { authHandle } from "../../features/auth/authService";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { updateAuth } from "../../features/auth/authSlice";
import { addUser } from "@/features/user/userSlice";
import { useForm } from "react-hook-form";
import GeneralLoader from "@/components/Loader/GeneralLoader";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  interface userForm{
    username:string,
    email:string,
    password:string
  }
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const loginForm=useForm<userForm>({defaultValues:{username:"",email:"",password:""}});
  const {register,handleSubmit,formState,reset}=loginForm;
  const {errors}=formState;

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const resetDefault=()=>{
    reset({
      username:"",
      email:"",
      password:""
    })
  }
  const handleGoogleAuth = async (credentialResponse:any) => {
    const googleToken = credentialResponse.credential;
    authHandle.googleService(googleToken);
  };

  function authenticationSubmit(userData:userForm) {
    if(isLoading) return;
    setIsLoading(true);
    if (isSignup) {
      authHandle
        .signupService(userData)
        .then((data) => {
            dispatch(addUser(data))
            dispatch(updateAuth(true));
            resetDefault()
            setIsLoading(false);
            navigate("/");
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    } else {
      authHandle
        .loginService(userData)
        .then((data) => {
           dispatch(addUser(data))
            dispatch(updateAuth(true));
            resetDefault()
            setIsLoading(false);
            navigate("/");
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  }
  function errorValidation(){
    if(errors.email?.message && errors.password?.message){
      return "Please enter valid email, password";
    }if (errors.email?.message) {
      return errors.email?.message;
    }if (errors.password?.message) {
      if(isSignup) return errors.password?.message;
      return "Please enter valid password";
    }else{
      if(isSignup) return (errors.username?.message);
    }
  }

 return (
    <div className="main-login min-h-screen bg-(--primary-bg-color) flex items-center justify-center p-4 font-sans">
      {isLoading && <GeneralLoader />}
      {/* Main Card Container */}
      <div className="login-body  w-full max-w-5xl rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-white/5">
        
        {/* Left Side: Illustration Area */}
        <div className="login-left z-3 md:w-[50%] relative bg-linear-to-b from-[#0a0f22] to-[#12397d] p-8 flex flex-col items-center justify-between min-h-112.5">
          {/* Moon Decoration */}
          <div className="absolute top-8 left-8 w-14 h-14 bg-white/90 rounded-full blur-[1px] shadow-[0_0_20px_rgba(255,255,255,0.3)]"></div>
          
          <div className="relative z-10 text-center mt-16">
            <h1 className="text-[clamp(1.3rem,calc(3vw+1rem),2rem)] font-bold text-white tracking-tight mb-2 uppercase">Welcome to Back</h1>
            <p className="text-(--secondary-text-color) text-[clamp(.3rem,calc(1vw+.5rem),.9rem)]">
              Welcome back! Please enter your details
            </p>
          </div>

          {/* Character & Wall Section */}
          <div className="mt-auto w-full relative flex flex-col items-center">
            <div className="w-full h-40 flex items-end justify-center mb-6">
            </div>
            <button className="bg-(--symbol-color) hover:opacity-90 transition-all text(--primary-bg-color) font-bold py-2.5 px-12 rounded-lg text-lg cursor-pointer"
            onClick={()=>{
              isSignup ? setIsSignup(false):setIsSignup(true);
              resetDefault()
            }}>
              {isSignup?"Log In" : "Sign In"}
            </button>

            {/* Brick Wall Pattern (Simplified CSS version) */}
            <div className="absolute -bottom-8 w-[110%] h-32 opacity-20 pointer-events-none border-t border-white/20" 
                 style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 20px' }}>
            </div>
          </div>
        </div>

        {/* Right Side: Form Area */}
        <div className="login-right bg-(--secondary-bg-color)  z-2 md:w-[50%] p-5 md:p-10 flex flex-col justify-center">
         <header className="flex justify-between">
           <h2 className="text-[clamp(1rem,calc(3vw+1rem),2rem)] font-semibold text-(--primary-text-color) mb-8">{isSignup ? "Sign In" : "Log In"}</h2>
           <Link to="/" className="text-(--primary-text-color)">Home</Link>
         </header>          
          <form className="space-y-4" onSubmit={handleSubmit(authenticationSubmit)} noValidate>
           {isSignup && <div>
             <label className="block text-(--secondary-text-color) text-sm mb-2 font-medium">Username</label>
             <input
               type="text"
               placeholder="Enter your username"
               {...register("username", {
                 required: "Please enter username", pattern: {
                   value: /^[A-Za-z ]{3,20}$/,
                   message: "Username must be 3–15 letters (spaces allowed, no numbers)"
                 }
               })}
               className="w-full bg-(--primary-bg-color) border border-white/10 rounded-lg p-3.5 text-(--primary-text-color) focus:outline-none focus:ring-1 focus:ring-(--symbol-color) transition-all placeholder:text-gray-600"
             />
           </div>}

            <div>
              <label className="block text-(--secondary-text-color) text-sm mb-2 font-medium">Email</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
               {...register("email", {
                 required: "Please enter email", pattern: {
                   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                   message: "Invalid email"
                 }
               })}
                className="w-full bg-(--primary-bg-color) border border-white/10 rounded-lg p-3.5 text-(--primary-text-color) focus:outline-none focus:ring-1 focus:ring-(--symbol-color) transition-all placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-(--secondary-text-color) text-sm mb-2 font-medium">Password</label>
              <input 
                type="password" 
                placeholder="Enter your password" 
               {...register("password", {
                 required: "Please enter password", pattern: {
                   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
                   message:
                     "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one symbol"
                 }
               })}
                className="w-full bg-(--primary-bg-color) border border-white/10 rounded-lg p-3.5 text-(--primary-text-color) focus:outline-none focus:ring-1 focus:ring-(--symbol-color) transition-all placeholder:text-gray-600"
              />
            </div>
            <p className=" text-red-600 my-2">{errorValidation()}</p>

            <div className="text-right">
              <Link to="/forgot-password" className="text-(--symbol-color) text-sm font-medium hover:underline decoration-1 underline-offset-4">
                Forgot password?
              </Link>
            </div>

            <button className="w-full bg-(--symbol-color) hover:opacity-90 transition-all text-(--primary-bg-color) font-bold py-4 rounded-lg text-lg shadow-lg cursor-pointer">
              {isSignup?"Sign In" : "Log In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="grow h-1px bg-white/10"></div>
            <span className="px-4 text-(--secondary-text-color) text-xs font-medium">Or continue with</span>
            <div className="grow h-px bg-white/10"></div>
          </div>

          {/* Social Icons Section */}
         <div className="flex gap-4 mb-8">
           <button className="flex-1 border border-white/10 rounded-lg  hover:bg-white/5 transition-colors flex justify-center items-center">
             <GoogleLogin
               onSuccess={handleGoogleAuth}
               onError={() => console.log("Login Failed")}
             />
           </button>
           <button className="flex-1 border border-white/10 rounded-lg py-1.5 hover:bg-white/5 transition-colors flex justify-center items-center">
             <FaFacebookF />
           </button>
         </div>

         <p className="text-center text-(--secondary-text-color) text-sm">
           {isSignup ? "Already have an account? " : "Don't have an account? "}
           <button className="text-(--primary-text-color) font-bold hover:underline decoration-(--symbol-color) underline-offset-4"
             onClick={() => {
               isSignup ? setIsSignup(false) : setIsSignup(true);
               resetDefault()
             }}
           >{isSignup ? "Log In" : "Sign In"}</button>
         </p>
        </div>
      </div>
    </div>
  );
}
