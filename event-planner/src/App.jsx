import React from 'react';
import './App.css';
import Login from './components/login/Login';
import Register from './components/login/Register';
import Dashboard from './components/dashboard/Dashboard';

// You're using the localStorage to keep track of the user, but you're also keeping track of it in state. You're then having to pass it down to your other components via props.
//  First off, I think localStorage is an interesting idea. I've never seen anyone use it before, so I looked into it. I like the concept behind it, that you can keep info in the browser
//  without having to re-fetch it every time the app is run. That being said, I think there's a bit better way to allow your components to have access to the user without passing it around
//  as a prop. I would suggest you look into React context. You can set it up to hold values (like the username, firstname, lastname, etc.), and then any component within the tree will have
//  access to it. This eliminates the need to pass values as props, because every component has direct access to the context, so they can get the values directly from that. React has set it up
//  to be very easy to do this, and I use it all the time in my projects.

class App extends React.Component {
  state = {
    isLogginActive: true,
    isRegisterActive: false,
    isDashboardActive: false,
    firstName: "",
    lastName: "",
    username: "",
  };

  componentDidMount() {
    const user = localStorage.getItem("username");
    const fname = localStorage.getItem("fname");
    const lname = localStorage.getItem("lname");
    this.setState({ firstName: fname, lastName: lname, username: user });
    if (user) this.logIn();
  }

  toggleLoginRegister = () =>
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive, isRegisterActive: !prevState.isRegisterActive }));

  logIn = () => this.setState({ isDashboardActive: true, isLogginActive: false, isRegisterActive: false });

  logOut = () => {
    localStorage.clear();
    window.location.reload();
    this.setState({ isDashboardActive: false, isLogginActive: true, isRegisterActive: false });
  };

  render() {
    const { isLogginActive, isRegisterActive, isDashboardActive } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    return (
      <div className="App">
        {isDashboardActive && (
          <Dashboard
            fname={localStorage.getItem("fname")}
            username={localStorage.getItem("username")}
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

const Tab = ({ current, containerRef, onClick }) => (
  <div className="tab" ref={containerRef} onClick={onClick}>
    <div className="inner-container">
      <div className="text">{current}</div>
    </div>
  </div>
);

export default App;
