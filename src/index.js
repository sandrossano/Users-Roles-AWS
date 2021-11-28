import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
  rootElement
);
