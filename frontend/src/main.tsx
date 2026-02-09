import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from "@react-oauth/google";
import {Provider} from "react-redux"
import store from './app/store';


ReactDOM.createRoot( document.getElementById("root")!).render(
   <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_PROVIDER_KEY}>
    <Provider store={store}>
    <App />
    </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
)


