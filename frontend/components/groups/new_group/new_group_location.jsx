import React from "react";
import PropTypes from "prop-types";
import LocationPic from "../../../packs/images/location.png";
import "./new_group.scss";

const NewGroupLocation = ({
  update,
  locationName,
  locationZip,
  openDescription
}) => (
  <li>
    <ul className="form-section">
      <li>
        <img className="form-icon" src={LocationPic} />
      </li>
      <li>
        <h1>In what city or region will the group be focused?</h1>
        <br />
        <input
          type="text"
          onChange={update("location_name")}
          value={locationName}
        />

        <h2>Around which zip code will your group be based?</h2>
        <br />
        <input
          type="text"
          onChange={update("location_zip")}
          value={locationZip}
        />
      </li>
      <li>
        <button onClick={openDescription} className="form-button">
          Next
        </button>
      </li>
    </ul>
  </li>
);

NewGroupLocation.propTypes = {
  update: PropTypes.func,
  locationName: PropTypes.string,
  locationZip: PropTypes.string,
  openDescription: PropTypes.func
};

export default NewGroupLocation;
