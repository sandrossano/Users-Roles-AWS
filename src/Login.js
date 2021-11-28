import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";
import Login from "./components/Login.jsx";
import App2 from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Switch />
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login} />
        <Route path="/roles" exact component={App2} />
        <Route path="/users" exact component={App2} />
        {/*      
          <Route path="/product">
            <Product />
          </Route>
          <Route path="/sales">
            <Sales />
          </Route>

          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
*/}
        <Switch />
      </div>
      ,
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
