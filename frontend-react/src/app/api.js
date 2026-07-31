//@ts-nocheck
import axios from "axios";


const headerForm = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};
const apiConnection=axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true
})

apiConnection.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry && originalRequest.url != "/auth/refresh" 
    ) {
      originalRequest._retry = true;

      try {
        await apiConnection.post("/auth/refresh");
        return apiConnection(originalRequest);
      } catch (refreshError) {
         if(originalRequest.url != "/user/data/me" ){
          window.location.href = "/login";
         }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export {apiConnection}