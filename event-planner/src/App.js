import React from "react";
import "./App.css";
import { Login, Register } from "./components/login/index";
import { Dashboard } from "./components/dashboard/index";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true,
      isRegisterActive: false,
      isDashboardActive: false,
      firstName: "",
      lastName: "",
      username: "",
    };
  }

  componentDidMount() {
    const user = localStorage.getItem("username");
    const fname = localStorage.getItem("fname");
    const lname = localStorage.getItem("lname");
    this.setState({ firstName: fname, lastName: lname, username: user });
    if (typeof user !== "undefined" && user !== null) {
      this.logIn();
    }
  }

  toggleLoginRegister = () => {
    this.setState((prevState) => ({
      isLogginActive: !prevState.isLogginActive,
      isRegisterActive: !prevState.isRegisterActive,
    }));
  };

  logIn = () => {
    this.setState({
      isDashboardActive: true,
      isLogginActive: false,
      isRegisterActive: false,
    });
  };

  logOut = () => {
    localStorage.clear();
    window.location.reload();
    this.setState({
      isDashboardActive: false,
      isLogginActive: true,
      isRegisterActive: false,
    });
  };

  render() {
    const { isLogginActive, isRegisterActive, isDashboardActive } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    return (
      <div className="App">
        {isDashboardActive && (
          <Dashboard
            fname={this.state.firstName}
            username={this.state.username}
            logout={this.logOut}
          />
        )}
        <div className="login">
          <div className="login-container">
            {isLogginActive && <Login logIn={this.logIn} />}
            {isRegisterActive && <Register logIn={this.logIn} />}
          </div>
          {!isDashboardActive && (
            <Tab
              current={current}
              onClick={this.toggleLoginRegister.bind(this)}
            />
          )}
        </div>
      </div>
    );
  }
}

const Tab = (props) => {
  return (
    <div className="tab" ref={props.containerRef} onClick={props.onClick}>
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default App;
