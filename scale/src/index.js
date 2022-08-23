import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
//import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";


const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientID = process.env.REACT_APP_AUTH0_CLIENT_ID;
const meowcat = process.env.REACT_APP_MEOW;


console.log("domain", domain);

console.log("meowcat", meowcat);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   
    <BrowserRouter>
      {/* <AuthProvider> */}
      <Auth0Provider
        domain={domain}
        clientId={clientID}
        redirectUri={window.location.origin}
        audience="https://quickstarts/api"
        scope="edit:foods"
      >
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Auth0Provider>
      {/* </AuthProvider> */}
    </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
