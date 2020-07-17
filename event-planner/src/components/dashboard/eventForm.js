import React from "react";
import PropTypes from "prop-types";
import $ from "jquery";

export class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      date: "",
      time: "",
      description: "",
    };
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  submit = (event) => {
    event.preventDefault();
    $.post(
      "http://localhost:8080/event.php",
      {
        function: "create",
        username: localStorage.getItem("username"),
        title: this.state.title,
        date: this.state.date,
        time: this.state.time,
        description: this.state.description,
      },
      (response) => {
        console.log(response);
        this.props.toggleAdd.bind(this);
      }
    );
  };

  render() {
    return (
      <form className="accForm" id="add" onSubmit={this.submit}>
        <h1 className="header">New Event</h1>
        <div className="form-group">
          <label htmlFor="title">Event Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            required
            value={this.state.date}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            name="time"
            required
            value={this.state.time}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Event Description</label>
          <textarea
            name="description"
            form="add"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>
        <input type="submit" className="btn" value="Add Event" />
        <input
          type="button"
          className="cancelBtn"
          value="Cancel"
          onClick={this.props.toggleAdd}
        />
      </form>
    );
  }
}

EventForm.propTypes = {
  username: PropTypes.string.isRequired,
  toggleAdd: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
};
