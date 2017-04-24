import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fetchGroup, joinGroup } from '../../actions/group_actions';
import GroupDetails from "./group_details";
import GroupMembers from "./group_members";
import GroupEdit from "./group_edit";
import GroupEvents from "./group_events";
import GroupWelcome from './group_welcome';
import GroupSidebar from './group_sidebar';
import { Link } from "react-router";


class GroupShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { location: "home", group: this.props.group };
    this.goHome = this.goHome.bind(this);
    this.members = this.members.bind(this);
    this.edit = this.edit.bind(this);
    this.joinGroup = this.joinGroup.bind(this);
    this.events = this.events.bind(this);
  }

  joinGroup() {
    this.props.joinGroup(this.props.group.id, this.props.currentUser.id)
    this.setState({location: "welcome"})
  }

  componentDidMount() {
    this.props.fetchGroup(this.props.params.groupId)
    this.setState({group: this.props.group})
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.group.id && nextProps.params.groupId !== this.state.group.id.toString()) {
      this.props.fetchGroup(nextProps.params.groupId)
    }
    this.setState({group: nextProps.group})
  }

  goHome() {
    this.setState({location: "home" })
  }

  members(e) {
    this.setState({location: "members"})
  }

  edit(e) {
    this.setState({location: "edit"})
  }

  events(e) {
    this.setState({location: "events"})
  }

  render() {

    let members = [];
    let memberIds = [];

    if (this.state.group.members) {
      members = this.state.group.members;
      members.forEach( (member) => {
        memberIds.push(member.id)
      })
    }

    let joinButton = (<button onClick={this.joinGroup} className="form-button">Join Us!</button>)
    if (currentUser && memberIds.includes(currentUser.id)) {
      joinButton = (<div />)
    }

    let body;
    switch (this.state.location) {
      case "home":
        body = (<GroupDetails events={this.state.group.events} members={members} group={this.state.group} />);
        break;
      case "members":
        body = (<GroupMembers members={this.state.group.members} />);
        break;
      case "edit":
        body = (<GroupEdit goHome={this.goHome} group={this.state.group} />);
        break;
      case "events":
        body = (<GroupEvents events={this.state.group.events} />)
        break;
      case "welcome":
        body = (<GroupWelcome group={this.state.group} user={this.props.currentUser} />)
    }


    let editLink = (<div />)
    if (this.state.group.organizer && this.state.group.organizer.id === this.props.currentUser.id) {
      let editClass = this.state.location === "edit" ? "active" : ""
      editLink = <li className={editClass} onClick={this.edit}>Edit</li>
    }


    let homeClass = this.state.location === "home" ? "active" : ""
    let memberClass = this.state.location === "members" ? "active" : ""
    let eventClass = this.state.location === "events" ? "active" : ""

    let eventCount = 0
    if (this.state.group.events) {
      eventCount = this.state.group.events.length;
    }

    return (
        <div className="group-background">
          <div className="group-show">
            <nav className="group-title">
                <h1>{this.state.group.group_name}</h1>
                <div className="group-menu-background">
                <div className="group-menu-border"></div>
                <ul className="group-menu">
                  <li className={homeClass} onClick={this.goHome}>Home</li>
                  <li className={memberClass} onClick={this.members}>Members</li>
                  <li className={eventClass} onClick={this.events}>Events</li>
                  {editLink}
                </ul>
                {joinButton}
              </div>
            </nav>
            <ul className="show-body">
              <GroupSidebar group={this.state.group}
                members={members}
                eventCount={eventCount} />
            {body}
            </ul>
        </div>
      </div>
        );
  }
}

const mapStateToProps = (state) => {
  return {
    group: state.groups,
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGroup: (groupId) => dispatch(fetchGroup(groupId)),
    joinGroup: (groupId, userId) => dispatch(joinGroup(groupId, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupShow);
