import React from "react";
import EditIcon from "../../icons/edit.png";
import DeleteIcon from "../../icons/delete.png";
import PropTypes from "prop-types";

export class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, date, time, id, attendees } = this.props.event;
    return (
      <div className="event-container">
        <h2>{title}</h2>
        <p>
          <b>Date:</b> {date}
        </p>
        <p>
          <b>Time: </b>
          {time}
        </p>
        <p>
          <b>Attendees: </b>
          {attendees}
        </p>
        <div className="icon_container">
          <img
            src={EditIcon}
            className="icon"
            onClick={this.props.edit.bind(this, this.props.event)}
            alt="Edit"
          />
          <img
            src={DeleteIcon}
            className="icon"
            onClick={this.props.delete.bind(this, id)}
            alt="Delete"
          />
        </div>
      </div>
    );
  }
}

Event.propTypes = {
  event: PropTypes.array.isRequired,
  edit: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
};
