import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";
import Toast from "toast-me";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    if (window.sessionStorage.getItem("logged") === "X") {
      //window.location.href = "/login";
      window.open("/users", "_self");
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  inputChangedHandler = (event) => {
    this.setState({ [event.target.id]: event.currentTarget.value });
  };

  handleSubmit(event) {
    var email = this.state.email;
    var password = this.state.password;

    if (email !== "test" || password !== "test") {
      Toast("User o Password errata", "error");
      event.preventDefault();
      window.sessionStorage.setItem("logged", "");
      return false;
    } else {
      window.sessionStorage.setItem("logged", "X");
      window.sessionStorage.setItem("user", email);
      return true;
    }
  }
  render() {
    return (
      <div>
        <div className="backgroundLogin"> </div>
        <div className="LoginBox">
          <div className="mercury-logologin" />
          <form action="/users" onSubmit={this.handleSubmit}>
            <div className="UserLogin">
              <label htmlFor="userName" className="control-Element">
                Username
              </label>
              <input
                type="text"
                className="login-control"
                id="email"
                aria-describedby="emailHelp"
                onChange={(event) => this.inputChangedHandler(event)}
              />
            </div>
            <div className="UserLogin">
              <label htmlFor="userpassword" className="control-Element">
                Password
              </label>
              <input
                type="password"
                className="login-control"
                id="password"
                onChange={(event) => this.inputChangedHandler(event)}
              />
            </div>
            <input type="submit" className="submitLogin" value="Login" />

            {/*
            <Link
              to="/Dashboard"
              onClick={this.handleSubmit}
              style={{ textDecoration: "none" }}
            >
              <button className="submitLogin">Login</button>
            </Link> */}

            <div className="Login-forgetRegister">
              <a className="registerUser float-left" href="">
                Register
              </a>
              <a className="forgetPassword float-right" href="">
                Forget Password ?
              </a>
            </div>
          </form>
          <div className="clear" />
        </div>
        {/* 
        <div className="mercuryCopyright">
          <div className="container-fluid">
            <div className="mercuryCopyLeft">
              <a href="">Mercury</a>
              <a href="">About us</a>
              <a href="">Blog</a>
            </div>
            
            <div className="mercuryCopyRight">
              © 2019, Mercury, A product of <a href="">SCC Online.</a>
            </div>

          </div>
          </div>
*/}
      </div>
    );
  }
}
export default Login;
