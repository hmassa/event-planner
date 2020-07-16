import React from "react";
import PropTypes from "prop-types";
import { EventList } from "./eventList";
import Logout from "../../icons/logout.png";

export class Dashboard extends React.Component {
  render() {
    return (
      <div className="dash">
        <div className="navbar">
          <h1 className="">{this.props.fname}'s events</h1>
          <div id="logout" onClick={this.props.logout}>
            <h3>Log Out</h3>
            <img src={Logout} className="icon" alt="Log out" />
          </div>
        </div>
        <div className="event-list">
          <EventList username={this.props.username} />
        </div>
      </div>
    );
  }
}

EventList.propTypes = {
  fname: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};
