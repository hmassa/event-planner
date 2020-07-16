import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import $ from "jquery";
import UserProfile from "./userProfile";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      usernameError: "",
      passError: "",
      userErrorStyle: noError,
      passErrorStyle: noError,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    $.post(
      "http://localhost:8080/login.php",
      {
        username: this.state.username,
        password: this.state.password,
      },
      (response) => {
        if (response.localeCompare("user") === 0) {
          this.setState({
            usernameError: "Incorrect username",
            passError: "",
            userErrorStyle: error,
            passErrorStyle: noError,
          });
        } else if (response.localeCompare("pass") === 0) {
          this.setState({
            passError: "Incorrect password",
            usernameError: "",
            userErrorStyle: noError,
            passErrorStyle: error,
          });
        } else {
          UserProfile.setUserInfo(
            response["fname"],
            response["lname"],
            response["username"]
          );
        }
      }
    );
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <form className="accForm">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="username"
              required
              value={this.state.username}
              onChange={this.handleChange}
            />
            <div className="error" style={this.state.userErrorStyle}>
              {this.state.usernameError}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              required
              value={this.state.password}
              onChange={this.handleChange}
            />
            <div className="error" style={this.state.passErrorStyle}>
              {this.state.passError}
            </div>
          </div>
        </form>
        <button type="button" className="btn" onClick={this.handleSubmit}>
          Login
        </button>
      </div>
    );
  }
}

const error = {
  textAlign: "center",
  width: "100%",
  padding: "8px 0",
  color: "#ff2a23",
  backgroundColor: "#ffcccc",
  fontSize: "14px",
  border: "2px solid #ff2a23",
};

const noError = {
  display: "none",
};
