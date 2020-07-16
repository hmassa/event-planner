import React from "react";
import "./App.css";
import { Login, Register } from "./components/login/index";
import UserProfile from "./components/login/userProfile";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true,
      isLoggedIn: false,
      firstName: "",
      lastName: "",
      username: "",
    };

    this.toggleLoginRegister = this.toggleLoginRegister.bind(this);
    this.toggleLoggedIn = this.toggleLoggedIn.bind(this);
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
    }));
  }

  toggleLoggedIn() {
    this.setState((prevState) => ({
      isLoggedIn: !prevState.isLoggedIn,
      isLogginActive: false,
    }));
  }

  render() {
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    // const currentActive = isLogginActive ? "login" : "register";
    return (
      <div className="App">
        <div className="login">
          <div className="login-container">
            {isLogginActive && (
              <Login containerRef={(ref) => (this.current = ref)} />
            )}
            {!isLogginActive && (
              <Register containerRef={(ref) => (this.current = ref)} />
            )}
          </div>
          <Tab
            current={current}
            containerRef={(ref) => (this.rightSide = ref)}
            onClick={this.toggleLoginRegister.bind(this)}
          />
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
