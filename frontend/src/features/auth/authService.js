import axios from "axios";
import { statusHandle } from "../../utils/statusHandle";

const headerForm = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};
export const authHandle = {
  signupService: async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/signup",
        data,
        headerForm,
      );
      statusHandle.statusInfo(res.status);
      return res.data;
    } catch (e) {
      console.error(e);
      statusHandle.statusInfo(e.response.status);
      throw e;
    }
  },
  loginService: async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/login",
        data,
        headerForm,
      );
      statusHandle.statusInfo(res.status);
      return res.data;
    } catch (e) {
      console.error(e);
      statusHandle.statusInfo(e.response.status);
      throw e;
    }
  },
  googleService: async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/google/provider",
        { token: data },
        { withCredentials: true },
      );
      statusHandle.statusInfo(res.status);
      return res.data;
    } catch (e) {
      console.error(e);
      statusHandle.statusInfo(e.response.status);
      throw e;
    }
  },
  facebookService: (data) => {},
  logoutService: async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/logout",
        {},
        headerForm,
      );
      statusHandle.statusInfo(res.status);
      return res.data;
    } catch (e) {
      console.error(e);
      statusHandle.statusInfo(e.response.status);
      throw e;
    }
  },
  forgotPasswordService: async (email, token) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/forgot/password",
        { emailId: email, captchaToken: token },
        headerForm,
      );
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  ResetPasswordService: async (paramToken, newPassword) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/reset/password",
        { token: paramToken, new_password: newPassword },
        headerForm,
      );
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
};
