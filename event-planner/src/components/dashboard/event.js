import React from "react";
import EditIcon from "../../icons/edit.png";
import DeleteIcon from "../../icons/delete.png";
import PropTypes from "prop-types";

export class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: this.props.event,
      isEditing: false,
    };
  }

  toggleEdit = () => {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing,
    }));
  };

  delete = () => {
    this.props.delete(this.state.event.event_id);
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    this.props.edit(this.state.event);
  };

  render() {
    let { isEditing } = this.state;
    let { title, date, time, attendees, description } = this.state.event;
    return (
      <div className="event-container clear">
        {!isEditing && (
          <div>
            <div className="col1">
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
            </div>
            <div className="col2">
              <p>
                <b>Event Description:</b>
              </p>
              <p>{description}</p>
            </div>
            <div className="icon_container">
              <img
                src={EditIcon}
                className="icon"
                onClick={this.toggleEdit}
                alt="Edit"
              />
              <img
                src={DeleteIcon}
                className="icon"
                onClick={this.delete}
                alt="Delete"
              />
            </div>
          </div>
        )}
        {isEditing && (
          <div>
            <form className="editForm" onSubmit={this.edit}>
              <div className="col1">
                <div className="form-group">
                  <label htmlFor="title">Tiitle: </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="date">Date: </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={this.state.date}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="time">Time: </label>
                  <input
                    type="time"
                    name="time"
                    required
                    value={this.state.time}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="col2">
                <div className="form-group">
                  <label htmlFor="description">Description: </label>
                  <textarea
                    name="title"
                    form="edit"
                    required
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="icon_container">
                <input type="submit" className="btn" value="Add Event" />
                <input
                  type="button"
                  className="cancelBtn"
                  value="Cancel"
                  onClick={this.toggleEdit}
                />
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

Event.propTypes = {
  event: PropTypes.object.isRequired,
  edit: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
};
