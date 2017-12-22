import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import GroupDetails from "../group_details.jsx";
import GroupMembers from "../group_members.jsx";
import GroupEdit from "../group_edit.jsx";
import GroupEvents from "../group_events.jsx";
import GroupWelcome from "../group_welcome.jsx";
import NewEventForm from "../../events/new_event_form.jsx";
import LeaveGroup from "../leave_group.jsx";

const GroupBody = props => (
  <section>
    <Route
      exact
      path="/groups/:id"
      render={routeProps => (
        <GroupDetails
          {...routeProps}
          events={props.group.events}
          group={props.group}
          members={props.members}
        />
      )}
    />
    <Route
      path="/group/:id/members"
      render={routeProps => (
        <GroupMembers {...routeProps} members={props.members} />
      )}
    />;
    <Route
      path="/group/:id/edit"
      render={routeProps => <GroupEdit {...routeProps} group={props.group} />}
    />
    <Route
      path="/group/:id/events"
      render={routeProps => (
        <GroupEvents
          {...routeProps}
          memberNum={props.members.length}
          events={props.group.events}
        />
      )}
    />
    <Route
      path="group/:id/welcome"
      render={routeProps => (
        <GroupWelcome
          {...routeProps}
          group={props.group}
          user={props.currentUser}
        />
      )}
    />
    <Route
      path="/group/:id/new"
      render={routeProps => (
        <NewEventForm {...routeProps} formType="new" groupId={props.group.id} />
      )}
    />
    <Route
      path="/group/:id/leave"
      render={() => <LeaveGroup handleLeave={props.handleLeave} />}
    />
  </section>
);

GroupBody.propTypes = {
  group: PropTypes.object,
  currentUser: PropTypes.object,
  handleLeave: PropTypes.func,
  members: PropTypes.array,
  params: PropTypes.object
};

export default GroupBody;
