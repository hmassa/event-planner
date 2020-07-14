import React from "react";
import axios from "axios";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      usernameError: "",
      passError: "",
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
    axios
      .post("http://localhost:8080/login.php", {
        username: this.state.username,
        password: this.state.password,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <form onSubmit={this.handleSubmit}>
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
            </div>
            <div className="error">{this.state.usernameError}</div>
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
            </div>
            <div className="error">{this.state.passError}</div>
            <div className="form-group">
              <input className="btn" type="submit" value="Login"></input>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
