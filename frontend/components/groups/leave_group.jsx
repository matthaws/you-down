import React from "react";
import PropTypes from "prop-types";

const LeaveGroup = ({ handleLeave }) => (
  <li>
    <div className="show-main">
      <h1>Are you sure you want to leave this group?</h1>
      <button onClick={handleLeave} className="form-button">
        <p>I am sure</p>
      </button>
    </div>
  </li>
);

LeaveGroup.propTypes = {
  handleLeave: PropTypes.func
};

export default LeaveGroup;
