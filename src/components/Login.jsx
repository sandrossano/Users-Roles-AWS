import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Toast from "toast-me";
import Button from "react-bootstrap-button-loader";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      check: false
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

  async getLogin() {
    var email = this.state.email;
    var password = this.state.password;
    var link =
      "https://keytech-demo-backend.herokuapp.com/api/login/" +
      email +
      "~" +
      password;
    var res = axios.get(link).then((result) => {
      res = result;
      try {
        if (res.data[0] !== undefined && res.data[0].email === email) {
          window.sessionStorage.setItem("logged", "X");
          window.sessionStorage.setItem("user", email);
          this.setState({ check: true });
          this.setState({ loading: false });
          this.props.history.push("/users");
          return this.state.check;
        } else {
          Toast("User o Password errata", "error");
          //this.event.preventDefault();
          window.sessionStorage.setItem("logged", "");
          this.setState({ check: false });
          this.setState({ loading: false });
          return this.state.check;
        }
      } catch {
        Toast("User o Password errata", "error");
        //this.event.preventDefault();
        window.sessionStorage.setItem("logged", "");
        this.setState({ check: false });
        this.setState({ loading: false });
        return this.state.check;
      }
    });
    return res;
  }

  handleSubmit(event) {
    this.setState({ loading: true });
    var email = this.state.email;
    var password = this.state.password;
    if (email === "test" && password === "test") {
      window.sessionStorage.setItem("logged", "X");
      window.sessionStorage.setItem("user", email);
      this.setState({ check: true });
      this.props.history.push("/users");
      return this.state.check;
    }
    /*
      var res = axios.get(link).then((result) => {
      res = result;
    }); */
    var res = this.getLogin();
    return false;
    /*
    await axios
      //.get("https://jsonplaceholder.typicode.com/todos?_page=1&_limit=10")
      .get(link)
      //.then((res) => res.data.json())
      .then(
        (result) => {
          if (result.data[0] !== undefined && result.data[0].login === email) {
            window.sessionStorage.setItem("logged", "X");
            window.sessionStorage.setItem("user", email);
            this.setState({ check: true });
            return this.state.check;
          } else {
            Toast("User o Password errata", "error");
            //event.stopPropagation();
            window.sessionStorage.setItem("logged", "");
            this.setState({ check: false });
            return this.state.check;
            //throw new Error("PSW ERRATA!");
          }
        },
        // Nota: è importante gestire gli errori qui
        // invece di un blocco catch() in modo da non fare passare
        // eccezioni da bug reali nei componenti.
        (error) => {
          Toast("User o Password errata", "error");
          event.preventDefault();
          window.sessionStorage.setItem("logged", "");
          this.setState({ check: false });
          //throw new Error("PSW ERRATA!");
          return this.state.check;
        }
      );
*/
  }
  render() {
    return (
      <div>
        <div className="backgroundLogin"> </div>
        <div className="LoginBox">
          <div className="mercury-logologin" />
          <form>
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
            {/*<input
              type="button"
              onClick={this.handleSubmit}
              className="submitLogin"
              value="Login"
          /> */}
            <Button
              className="submitLogin"
              loading={this.state.loading}
              onClick={this.handleSubmit}
            >
              Login
            </Button>
            {/*
            <Link
              to="/Dashboard"
              onClick={this.handleSubmit}
              style={{ textDecoration: "none" }}
            >
              <button className="submitLogin">Login</button>
            </Link> */}
            {/*
            <div className="Login-forgetRegister">
              <a className="registerUser float-left" href="">
                Register
              </a>
              <a className="forgetPassword float-right" href="">
                Forget Password ?
              </a>
</div>*/}
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
