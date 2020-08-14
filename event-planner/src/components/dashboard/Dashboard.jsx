import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import EventList from "./EventList";
import EventForm from "./eventForm";
import Add from "../../icons/add.png";
import Logout from "../../icons/logout.png";

// Both noRotate and rotate had exactly the same styles except for one difference. You can do it shown below and only have one set of styles
const styles = {
  height: "85px",
  width: "85px",
  position: "fixed",
  bottom: "25px",
  right: "25px",
  transition: "all 400ms ease-in-out",
};

const Dashboard = ({ fname, username, logout }) => {
  const [isAdding, setIsAdding] = useState(false);

  const toggleAdd = () => setIsAdding(prev => !prev);

  return (
    <div className="dash">
      <div className="navbar">
        <h1 className="">{fname}'s events</h1>
        <div id="logout" onClick={logout}>
          <h3>Log Out</h3>
          <img src={Logout} className="icon" alt="Log out" />
        </div>
      </div>
      {isAdding ? (
        <div className="add-container">
          <EventForm toggleAdd={toggleAdd} />
        </div>
      ) : (
        <div className="event-list">
          <EventList username={username} />
        </div>
      )}
      <div id="circle">
        <img
          src={Add}
          id="addIcon"
          alt="Add event"
          onClick={toggleAdd}
          style={{ ...styles, transform: isAdding ? "rotate(45deg)" : undefined }}  /* You're toggling isAdding the same as whether or not the image is rotate, so you don't need a separate variable */
        />
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  fname: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
};

export default Dashboard;
