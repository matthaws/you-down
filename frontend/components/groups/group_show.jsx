import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink, Route } from "react-router-dom";
import { fetchGroup, joinGroup, leaveGroup } from "../../actions/group_actions";
import { selectGroupEvents, selectGroupMembers } from "../../util/selectors";
import GroupDetails from "./group_details.jsx";
import GroupMembers from "./group_members.jsx";
import GroupEdit from "./group_edit.jsx";
import GroupEvents from "./group_events.jsx";
import GroupWelcome from "./group_welcome.jsx";
import GroupSidebar from "./group_sidebar.jsx";
import NewEventForm from "../events/new_event_form.jsx";
import LeaveGroup from "./leave_group.jsx";
import hashHistory from "../../util/history";

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
            <Route
              exact
              path="/groups/:id"
              render={routeProps => (
                <GroupDetails
                  {...routeProps}
                  events={this.props.group.events}
                  group={this.props.group}
                  members={this.props.members}
                />
              )}
            />
            <Route
              path="/group/:id/members"
              render={routeProps => (
                <GroupMembers {...routeProps} members={this.props.members} />
              )}
            />;
            <Route
              path="/group/:id/edit"
              render={routeProps => <GroupEdit {...routeProps} group={group} />}
            />
            <Route
              path="/group/:id/events"
              render={routeProps => (
                <GroupEvents
                  {...routeProps}
                  memberNum={this.props.members.length}
                  events={group.events}
                />
              )}
            />
            <Route
              path="group/:id/welcome"
              render={routeProps => (
                <GroupWelcome
                  {...routeProps}
                  group={group}
                  user={currentUser}
                />
              )}
            />
            <Route
              path="/group/:id/new"
              render={routeProps => (
                <NewEventForm
                  {...routeProps}
                  formType="new"
                  groupId={group.id}
                />
              )}
            />
            <Route
              path="/group/:id/leave"
              render={() => <LeaveGroup handleLeave={this.handleLeave} />}
            />
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
