//@ts-nocheck
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "./forgotpassword.css";
import { authHandle } from "../../features/auth/authService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const google_captcha_key = import.meta.env.VITE_GOOGLE_RECAPTCHA_CLIENT_KEY;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!captchaToken) {
      setError("Please verify that you are not a robot");
      return;
    }
    console.log("Email:", email);
    console.log("Captcha Token:", captchaToken);
    authHandle.forgotPasswordService(email,captchaToken).then((res)=>{
     console.log(res);
    }).catch((error)=>{
      console.log(error)
    })
    setMessage(
      "If the email exists, we have sent a password reset link. The link will expire in 3 minutes."
    );
  };

  return (
    <div className="fp-container">

      <div className="fp-card">
        <h2>Forgot Password</h2>
        <p className="fp-subtitle">
          Enter your email and verify captcha
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="captcha-box">
            <ReCAPTCHA  //this Google reCaptcha for check bot
              sitekey={google_captcha_key} //its site key of client
              onChange={(token) => setCaptchaToken(token)}
            />
          </div>

          {error && <p className="error-text">{error}</p>}
          {message && <p className="success-text">{message}</p>}

          <button type="submit" className="btn-primary">
            Send Reset Link
          </button>
        </form>

        <button
          className="btn-back"
          onClick={() => window.history.back()}
        >
          ← Back to Login
        </button>
      </div>

      <div className="fp-info">
        <h3>Security Information</h3>
        <p>
          We use Google reCAPTCHA to protect your account from automated abuse.
        </p>
        <p>
          If the email exists, a reset link will be sent and will expire in{" "}
          <strong>3 minutes</strong>.
        </p>
        <p>Please check your spam folder if needed.</p>
      </div>
    </div>
  );
}
