import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import DefaultGroupPic from "../../packs/images/group.jpg";
import "./group_list.css";

const GroupList = ({ groups }) => {
  const groupList = [];
  groups.forEach(group => {
    let groupPicUrl = group.group_pic;
    if (groupPicUrl === "/DEFAULT") {
      groupPicUrl = DefaultGroupPic;
    }

    groupList.push(
      <li key={group.id}>
        <Link to={`/groups/${group.id}`}>
          <ul className="groupItem">
            <img className="group-pic-thumb" src={groupPicUrl} />
            <li>
              <h1>{group.group_name}</h1>
              <br />
              {group.organizer_id === this.props.user.id ? (
                <h2>Organizer</h2>
              ) : (
                <h2>Member</h2>
              )}
            </li>
          </ul>
        </Link>
      </li>
    );
  });

  return { groupList };
};

GroupList.propTypes = {
  groups: PropTypes.array
};

GroupList.defaultProps = {
  groups: []
};

export default GroupList;
