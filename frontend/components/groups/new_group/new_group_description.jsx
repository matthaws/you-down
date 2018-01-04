import React from "react";
import PropTypes from "prop-types";
import MembersPic from "../../../packs/images/members.png";
import "./new_group.scss";

const NewGroupDescription = ({
  update,
  groupDescription,
  checkboxes,
  memberMoniker
}) => (
  <li>
    <ul className="form-section">
      <li>
        <img className="form-icon" src={MembersPic} />
      </li>
      <li>
        <h1>Describe what your group is about and who should join!</h1>
        <br />
        <textarea
          onChange={update("group_description")}
          value={groupDescription}
        />
        <br />
        <h2>What category or categories does your group fall into?</h2>
        <br />
        <div className="checkboxes">{checkboxes}</div>
        <br />
        <h2>What should members of your group be called?</h2>
        <br />
        <h3> (If you leave this blank, they will be called members) </h3>
        <br />
        <input
          type="text"
          onChange={update("member_moniker")}
          value={memberMoniker}
        />
      </li>
    </ul>
    <div className="submit-button">
      <button className="form-button" type="submit">
        Create Your Group!
      </button>
    </div>
  </li>
);

NewGroupDescription.propTypes = {
  update: PropTypes.func,
  memberMoniker: PropTypes.string,
  groupDescription: PropTypes.string,
  checkboxes: PropTypes.array
};

export default NewGroupDescription;
