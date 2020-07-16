import React from "react";
import "./App.css";
import { Login, Register } from "./components/login/index";
import UserProfile from "./components/login/userProfile";
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

    this.toggleLoginRegister = this.toggleLoginRegister.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  componentDidMount() {
    const user = UserProfile.getUsername;
    const fname = UserProfile.getFirstName;
    const lname = UserProfile.getLastName;
    this.setState({ firstName: fname, lastName: lname, username: user });
  }

  toggleLoginRegister() {
    this.setState((prevState) => ({
      isLogginActive: !prevState.isLogginActive,
      isRegisterActive: !prevState.isRegisterActive,
    }));
  }

  logIn() {
    this.setState({
      isDashboardActive: true,
      isLogginActive: false,
      isRegisterActive: false,
    });
  }

  render() {
    const { isLogginActive, isRegisterActive, isDashboardActive } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    return (
      <div className="App">
        {isDashboardActive && <Dashboard />}
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
