import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";
import App from "./App";
import "./css/dentalHome.css";
import "@fontsource/poppins";

/* xxx */
import "./css/loginScreen.css";
import "./App.css";
import "./css/productScreen.css";
import "./css/checkout.css";

/* pharmacy */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
