import React from "react";
import axios from "axios";

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      username: "",
      password1: "",
      password2: "",
      passError: "",
      usernameError: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkUsername = this.checkUsername.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  checkUsername(event) {
    this.setState({ username: event.target.value });
    var errorText = "";
    axios
      .post(
        "http://localhost:8080/register.php",
        {
          function: "search",
          username: event.target.value,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        // if (response["data"].localeCompare("match") === 0) {
        //   errorText = "This username is already taken. Try another.";
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({
      usernameError: errorText,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { password1, password2 } = this.state;
    if (password1.localeCompare(password2) !== 0) {
      this.setState({ passError: "The passwords you entered do not match." });
    } else {
      axios
        .post("http://localhost:8080/register.php", {
          fname: this.state.fname,
          lname: this.state.lname,
          username: this.state.username,
          password: this.state.password1,
          email: this.state.email,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                name="fname"
                placeholder="First Name"
                required
                value={this.state.first}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lname">Last Name</label>
              <input
                type="text"
                name="lname"
                placeholder="Last Name"
                required
                value={this.state.last}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="error"></div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                value={this.state.username}
                onChange={this.checkUsername}
              />
            </div>
            <div className="error">{this.state.usernameError}</div>
            <div className="form-group">
              <label htmlFor="password1">Password</label>
              <input
                type="password"
                name="password1"
                placeholder="Password"
                required
                value={this.state.password1}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password2">Re-Enter Password</label>
              <input
                type="password"
                name="password2"
                placeholder="Re-Enter Password"
                required
                value={this.state.password2}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input className="btn" type="submit" value="Register"></input>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
