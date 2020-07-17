import React from "react";
import PropTypes from "prop-types";
import { EventList } from "./eventList";
import { EventForm } from "./eventForm";
import Logout from "../../icons/logout.png";
import Add from "../../icons/add.png";
import $ from "jquery";

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdding: false,
      style: noRotate,
    };
  }

  toggleAdd = () => {
    this.setState((prevState) => ({
      isAdding: !prevState.isAdding,
    }));
    if (this.state.style === noRotate) {
      this.setState({ style: rotate });
    } else {
      this.setState({ style: noRotate });
    }
  };

  createEvent = (event) => {
    $.post(
      "http://localhost:8080/event.php",
      {
        function: "create",
        title: event.title,
        date: event.date,
        time: event.time,
        description: event.description,
        username: localStorage.getItem("username"),
      },
      (response) => {
        console.log(response);
        window.location.reload();
      }
    );
  };

  render() {
    const { isAdding } = this.state;
    return (
      <div className="dash">
        <div className="navbar">
          <h1 className="">{this.props.fname}'s events</h1>
          <div id="logout" onClick={this.props.logout}>
            <h3>Log Out</h3>
            <img src={Logout} className="icon" alt="Log out" />
          </div>
        </div>
        {!isAdding && (
          <div className="event-list">
            <EventList username={this.props.username} />
          </div>
        )}
        {isAdding && (
          <div className="add-container">
            <EventForm
              username={this.props.username}
              toggleAdd={this.toggleAdd}
              create={this.createEvent}
            />
          </div>
        )}
        <div id="circle">
          <img
            src={Add}
            id="addIcon"
            alt="Add event"
            onClick={this.toggleAdd}
            style={this.state.style}
          />
        </div>
      </div>
    );
  }
}

EventList.propTypes = {
  username: PropTypes.string.isRequired,
};

const noRotate = {
  height: "85px",
  width: "85px",
  position: "fixed",
  bottom: "25px",
  right: "25px",
  transition: "all 400ms ease-in-out",
};

const rotate = {
  height: "85px",
  width: "85px",
  position: "fixed",
  bottom: "25px",
  right: "25px",
  transition: "all 400ms ease-in-out",
  transform: "rotate(45deg)",
};
