import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Event from "./Event";

const fetchEvents = (username, setEvents) => 
  fetch(`http://localhost:8080/getEvents.php?username=${username}`)
    .then(response => response.json())
    .then(json => setEvents(json));

const deleteEvent = id =>
  fetch('http://localhost:8080/event.php', { method: 'POST', body: { function: "delete", id } })
    .then(response => {
      console.log(response);
      window.location.reload();
    });

const editEvent = event =>
  fetch('http://localhost:8080/event.php',
    {
      method: 'POST',
      body: {
        function: "edit",
        id: event.event_id,
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
      }
    })
    .then(response => {
      if (response.localeCompare("success") !== 0) {
        alert("Uh oh. Something went wrong. Please try again.");
      }
    });

const EventList = ({ username }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents(username, setEvents);
  }, [username]);

  return events.map((event, i) => (  // By creating var i = 0, since you weren't changing it, you were giving every event the exact same key. Map() has a built-in index argument that you can use to give each event its own key
    <div className="event-list">
      <Event key={i} event={event} edit={editEvent} delete={deleteEvent} />
    </div>
  ));
}

EventList.propTypes = {
  username: PropTypes.string.isRequired,
};

export default EventList;
