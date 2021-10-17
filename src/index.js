import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { TokenProvider } from "./context/TokenProvider";

ReactDOM.render(
  <BrowserRouter>
    <TokenProvider>
      <App />
    </TokenProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
