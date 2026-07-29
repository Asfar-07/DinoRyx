//@ts-nocheck
import { useState } from "react";
import "./resetpassword.css";
import { authHandle } from "../../features/auth/authService";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    // if (password.length < 6) {
    //   setError("Password must be at least 6 characters");
    //   return;
    // }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const token = new URLSearchParams(window.location.search).get("token");

    authHandle.ResetPasswordService(token,password).then((res)=>{
        res === "success" ? setSuccess("Password reset successfully") : setError("Something wrong");
    }).catch((error)=>{
         setError("Something wrong")
    })

    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="reset-container">
      <form className="reset-card" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <p className="subtitle">Create a new strong password</p>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <div className="input-group">
          <label>New Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="checkbox">
          <input
            type="checkbox"
            id="show"
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="show">Show password</label>
        </div>

        <button type="submit" className="btn-primary">
          Reset Password
        </button>

        <button
          type="button"
          className="btn-secondary"
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </form>
    </div>
  );
}
