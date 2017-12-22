import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  fetchGroup,
  joinGroup,
  leaveGroup
} from "../../../actions/group_actions";
import { selectGroupEvents, selectGroupMembers } from "../../../util/selectors";
import GroupBody from "../group_body/group_body.jsx";
import GroupSidebar from "../group_sidebar/group_sidebar.jsx";

import hashHistory from "../../../util/history";
import "./group_show.css";

class GroupShow extends React.Component {
  constructor(props) {
    super(props);
    this.joinGroup = this.joinGroup.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }

  handleLeave() {
    this.props.leaveGroup(this.props.group.id);
    this.props.fetchGroup(this.props.group.id);
    hashHistory.push(`/users/${this.props.currentUser.id}`);
  }

  joinGroup() {
    this.props.joinGroup(this.props.group.id, this.props.currentUser.id);
  }

  componentDidMount() {
    this.props.fetchGroup(this.props.params.groupId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.groupId !== this.state.group.id.toString()) {
      this.props.fetchGroup(nextProps.params.groupId);
    }
  }

  render() {
    const { currentUser, group } = this.props;

    let joinButton = (
      <button onClick={this.joinGroup} className="form-button">
        Join Us!
      </button>
    );
    if (currentUser && currentUser.group_ids.includes(group.id)) {
      joinButton = (
        <button onClick={this.handleLeave} className="form-button">
          Leave Group
        </button>
      );
    }

    let editLink = <div />;
    if (group.organizer.id === currentUser.id) {
      editLink = (
        <NavLink to={`/groups/${group.id}/edit`} activeClassName="active">
          <li>Edit</li>
        </NavLink>
      );
    }

    const eventCount = group.events.length;

    return (
      <div className="group-background">
        <div className="group-show">
          <nav className="group-title">
            <h1>{group.group_name}</h1>
            <div className="group-menu-background">
              <div className="group-menu-border" />
              <ul className="group-menu">
                <NavLink to={`/groups/${group.id}`} activeClassName="active">
                  <li>Home</li>
                </NavLink>
                <NavLink
                  to={`/groups/${group.id}/members`}
                  activeClassName="active"
                >
                  <li>Members</li>
                </NavLink>
                <NavLink to={`/groups/${group.id}/events`}>
                  <li>Events</li>
                </NavLink>
                {editLink}
              </ul>
              {joinButton}
            </div>
          </nav>
          <ul className="show-body">
            <GroupSidebar groupId={group.id} eventCount={eventCount} />
            <GroupBody {...this.props} handleLeave={this.handleLeave} />
          </ul>
        </div>
      </div>
    );
  }
}

GroupShow.propTypes = {
  group: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  fetchGroup: PropTypes.func.isRequired,
  joinGroup: PropTypes.func.isRequired,
  leaveGroup: PropTypes.func.isRequired,
  members: PropTypes.array,
  params: PropTypes.object
};

GroupShow.defaultProps = {
  group: {
    id: null,
    member_ids: [],
    name: ""
  },
  members: [],
  params: {}
};

const mapStateToProps = (state, ownProps) => ({
  group: state.groups[ownProps.match.params.groupId],
  members: selectGroupMembers(
    state,
    state.groups[ownProps.match.params.groupId]
  ),
  events: selectGroupEvents(state, state.groups[ownProps.match.params.groupId]),
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  fetchGroup: groupId => dispatch(fetchGroup(groupId)),
  joinGroup: (groupId, userId) => dispatch(joinGroup(groupId, userId)),
  leaveGroup: groupId => dispatch(leaveGroup(groupId))
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupShow);
