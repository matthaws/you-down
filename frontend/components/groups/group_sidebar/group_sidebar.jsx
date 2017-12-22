import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchGroup } from "../../actions/group_actions";

class GroupSidebar extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.groupId !== this.props.groupId) {
      this.props.fetchGroup(nextProps.groupId);
    }
  }

  render() {
    const { group } = this.props;
    let organizer = "";
    let organizerPic = window.images.default_profile;
    if (group.organizer) {
      organizer = group.organizer.full_name;
      if (group.organizer.profile_pic !== "DEFAULT") {
        organizerPic = group.organizer.profile_pic;
      }
    }
    let groupPicUrl = group.group_pic;

    if (groupPicUrl && groupPicUrl === "/DEFAULT") {
      groupPicUrl = window.images.default_group;
    }

    let orgLink = <div />;
    if (group.organizer) {
      orgLink = (
        <Link to={`/users/${this.state.group.organizer.id}`}>
          <img className="group_show_profile_thumb" src={organizerPic} /> <br />
          {organizer}
        </Link>
      );
    }
    let memberCount = 0;
    if (group.members) {
      memberCount = group.members.length;
    }

    return (
      <li>
        <div className="left-sidebar">
          <ul>
            <li>
              <img className="group_show_profile_thumb" src={groupPicUrl} />
            </li>
            <li>
              <h2>{group.group_name}</h2>
            </li>
            <li>
              Based in: <br /> {group.location_name}, <br />{" "}
              {group.location_zip}
            </li>
            <li>
              <p>{this.state.group.member_moniker}:</p>
              <p>{memberCount}</p>
            </li>
            <li>
              <p>Events:</p>
              <p>{this.props.eventCount}</p>
            </li>
            <li className="organizer">Organizer:</li>
            <li>{orgLink}</li>
          </ul>
        </div>
      </li>
    );
  }
}

GroupSidebar.propTypes = {
  eventCount: PropTypes.number,
  groupId: PropTypes.number,
  group: PropTypes.object,
  fetchGroup: PropTypes.func
};

GroupSidebar.defaultProps = {
  eventCount: 0,
  groupId: null,
  group: {}
};

const mapStateToProps = state => ({
  group: state.groups
});

const mapDispatchToProps = dispatch => ({
  fetchGroup: groupId => dispatch(fetchGroup(groupId))
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupSidebar);
