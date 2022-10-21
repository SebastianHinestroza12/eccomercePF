import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { Auth0Provider } from "@auth0/auth0-react";
import dotenv from "dotenv";
require("dotenv").config();

//axios.defaults.baseURL =  "https://api-production-e274.up.railway.app/" || "http://localhost:3001";
//const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
// console.log(process.env.REACT_APP_AUTH0_DOMAIN)

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider
      domain="dev-borjjf62.us.auth0.com"
      clientId="F6Yiaf1xZ5ecRZfttJjCj424pUvPsYV1"
      redirectUri={window.location.origin}
    >
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </Auth0Provider>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
