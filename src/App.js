import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Roles from "./components/DashBoard/index";
import Users from "./components/DashBoard/DashUsers";
import "./styles.css";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Users} />
          <Route path="/users" exact component={Users} />
          <Route path="/roles" exact component={Roles} />
        </Switch>
      </div>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
