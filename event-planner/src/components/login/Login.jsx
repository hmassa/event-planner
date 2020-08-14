import React from "react";
import $ from "jquery";
import PropTypes from "prop-types";

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

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    usernameError: "",
    passError: "",
    userErrorStyle: noError,
    passErrorStyle: noError,
  };

  handleChange = event => this.setState({ [event.target.name]: event.target.value });

  handleSubmit = (event) => {
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
          const res = JSON.parse(response);
          localStorage.setItem("fname", res["first_name"]);
          localStorage.setItem("lname", res["last_name"]);
          localStorage.setItem("username", res["username"]);
          this.props.logIn();
        }
      }
    );
  };

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <form className="accForm" onSubmit={this.handleSubmit}>
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
          <input type="submit" className="btn" value="Log In" />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
};

export default Login;
