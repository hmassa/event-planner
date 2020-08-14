import React, { useState } from "react";
import PropTypes from "prop-types";
import EditIcon from "../../icons/edit.png";
import DeleteIcon from "../../icons/delete.png";
import { FormInput, FormTextArea } from '../FormComponents';

const handleChange = setter => e => setter(e.target.value);

const edit = (event, state, editEvent, toggleEdit) => e => {
  e.preventDefault();

  editEvent({
    ...event,  // This will add all the fields from the parent event to the new object being created, and they will be overridden by any specific fields listed below
    title: state.title,
    date: state.date,
    time: state.time,
    description: state.description
  });

  toggleEdit();
};

// It would be best to let the parent control the actual event, and then have this component just control the details that would change.
//  When the form is submitted, then, you can use that event to update the parent event so that it now has the new details.
//  So you would pass in the details, edit them, etc. As props, you would pass in the event and a submit method that would update the parent's event
//  Outside of that submit method, you would not edit the prop event at all
const Event = ({ event, editEvent, deleteEvent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(event.title);
  const [date, setDate] = useState(event.date);
  const [time, setTime] = useState(event.time);
  const [description, setDescription] = useState(event.description);

  const removeEvent = () => deleteEvent(event.event_id);  // Regardless of what it is, you should always stick with constant variables inside your render method. State will track anything that changes

  const toggleEdit = () => setIsEditing(prevState => !prevState);

  return (
    <div className="event-container clear">
      {isEditing ? (
        <form className="editForm" onSubmit={edit(event, { title, date, time, description }, editEvent, toggleEdit)}>
          <div className="col1">
            <FormInput type="text" name="title" label="Title: " required value={title} onChange={handleChange(setTitle)} />
            <FormInput type="date" name="date" label="Date: " required value={date} onChange={handleChange(setDate)} />
            <FormInput type="time" name="time" label="Time: " required value={time} onChange={handleChange(setTime)} />
          </div>
          <div className="col2">
            <div className="form-col2">
              <FormTextArea name="description" label='Description: ' form="edit" required value={description} onChange={handleChange(setDescription)} />
              <div className="button-container">
                <input type="submit" className="btn" value="Save" />
                <input type="button" className="cancelBtn" value="Cancel" onClick={toggleEdit} />
              </div>
            </div>
          </div>
        </form>
      ) : (
        <>
          <div className="col1">
            <h2>{event.title}</h2>
            <p>
              <b>Date:</b> {event.date}
            </p>
            <p>
              <b>Time: </b>
              {event.time}
            </p>
            <p>
              <b>Attendees: </b>
              {event.attendees}
            </p>
          </div>
          <div className="col2">
            <p>
              <b>Event Description:</b>
            </p>
            <p>{event.description}</p>
          </div>
          <div className="icon-container">
          <img
            src={EditIcon}
            className="icon"
            onClick={toggleEdit}
            alt="Edit"
          />
          <img
            src={DeleteIcon}
            className="icon"
            onClick={removeEvent}
            alt="Delete"
          />
        </div>
        </>
      )}
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.object.isRequired,
  editEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};

export default Event;
