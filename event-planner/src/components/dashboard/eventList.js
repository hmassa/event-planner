import React from "react";
import PropTypes from "prop-types";
import $ from "jquery";
import { Event } from "./event";

export class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    $.get(
      "http://localhost:8080/getEvents.php?username=" + this.props.username,
      (response) => {
        if (response.localeCompare("false") === 0) {
        } else {
          const res = JSON.parse(response);
          for (var i = 0; i < res.length; i++) {
            this.setState({ events: [...this.state.events, res[i]] });
          }
        }
      }
    );
  }

  delete = (id) => {
    $.post(
      "http://localhost:8080/delete.php",
      {
        id: id,
      },
      (response) => {
        window.location.reload();
      }
    );
  };

  edit = (event) => {};

  render() {
    return this.state.events.map((event) => (
      <div className="event-list">
        <Event event={event} edit={this.edit} delete={this.delete} />
      </div>
    ));
  }
}

EventList.propTypes = {
  username: PropTypes.string.isRequired,
};
