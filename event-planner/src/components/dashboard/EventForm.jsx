import React from "react";
import PropTypes from "prop-types";
import { FormInput, FormTextArea } from '../FormComponents';

const handleChange = setter => event => setter(event.target.value);

const submit = (state, toggleAdd) => event => {
  event.preventDefault();
  fetch('http://localhost:8080/event.php',  // In React, it's generally easier to just use the built-in fetch method then trying to add npm packages like jquery or axios unless you need them for something specific
    {
      method: 'POST',
      body: {
        function: "create",
        username: localStorage.getItem("username"),
        title: state.title,
        date: state.date,
        time: state.time,
        description: state.description
      }
    })
    .then(response => {
      console.log(response);
      toggleAdd();
      window.location.reload();
    });
};

// You have two different event forms that do almost the exact same thing. The only differences are how they look and what happens when you submit the form.
//  I'd recommend that you create a common form that you can just pass in the submit method. It would be better for testing.
//  It's also best to try and keep your forms and things looking similar. That's a bit more of a UI design principle than a coding principle.

const EventForm = ({ toggleAdd }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  return (
    <form className="accForm" id="add" onSubmit={submit({ title, date, time, description }, toggleAdd)}>
      <h1 className="header">New Event</h1>
      <FormInput type="text" name="title" label="Event Title" placeholder="Title" required value={title} onChange={handleChange(setTitle)} />
      <FormInput type="date" name="date" label="Date" required value={date} onChange={handleChange(setDate)} />
      <FormInput type="time" name="time" label="Time" required value={time} onChange={handleChange(setTime)} />
      <FormTextArea name="description" label="Event Description" form="add" required value={description} onChange={handleChange(setDescription)} />
      <input type="submit" className="btn" value="Add Event" />
      <input type="button" className="cancelBtn" value="Cancel" onClick={toggleAdd} />
    </form>
  );
};

EventForm.propTypes = {
  toggleAdd: PropTypes.func.isRequired
};

export default EventForm;
