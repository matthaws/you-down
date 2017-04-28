import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fetchGroup, joinGroup, leaveGroup } from '../../actions/group_actions';
import GroupDetails from "./group_details";
import GroupMembers from "./group_members";
import GroupEdit from "./group_edit";
import GroupEvents from "./group_events";
import GroupWelcome from './group_welcome';
import GroupSidebar from './group_sidebar';
import NewEventForm from '../events/new_event_form';
import { Link, hashHistory } from "react-router";


class GroupShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { location: "home", group: this.props.group, currentUser: this.props.currentUser };
    this.joinGroup = this.joinGroup.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
  }

  handleLeave() {
    this.props.leaveGroup(this.props.group.id);
    this.props.fetchGroup(this.props.group.id);
    this.setState({location: "home"})
    hashHistory.push(`/users/${this.props.currentUser.id}`)
  }

  joinGroup() {
    this.props.joinGroup(this.props.group.id, this.props.currentUser.id);
    this.setState({location: "welcome"})
    this.props.fetchGroup(this.props.group.id)

  }

  componentDidMount() {
    this.props.fetchGroup(this.props.params.groupId)
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.group.id && nextProps.params.groupId !== this.state.group.id.toString()) {
      this.props.fetchGroup(nextProps.params.groupId)
    }
    if (this.state.group !== nextProps.group && this.state.location !== "welcome") {
      this.changeLocation("home")();
    }

    this.setState({group: nextProps.group, currentUser: nextProps.currentUser})

  }

  changeLocation(newLocation) {
    return () => this.setState({location: newLocation})
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
    let currentUser = this.state.currentUser;
    let joinButton = (<button onClick={this.joinGroup} className="form-button">Join Us!</button>)
    if (currentUser && memberIds.includes(currentUser.id)) {
      joinButton = (<button onClick={this.changeLocation("leave")} className="form-button">Leave Group</button>)
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
        body = (<GroupEdit changeLocation={this.changeLocation} group={this.state.group} />);
        break;
      case "events":
        body = (<GroupEvents memberNum={this.state.group.members.length} changeLocation={this.changeLocation} events={this.state.group.events} />)
        break;
      case "welcome":
        body = (<GroupWelcome group={this.state.group} user={this.props.currentUser} />)
        break;
      case "createEvent":
        body = (<NewEventForm  formType="new" groupId={this.state.group.id} />)
        break;
      case "leave":
      body = (<li>
        <div className="show-main">
          <h1>Are you sure you want to leave this group?</h1>
          <button onClick={this.handleLeave} className="form-button">I'm sure</button>
        </div>
      </li>)
    }


    let editLink = (<div />)
    if (this.state.group.organizer && this.state.group.organizer.id === this.props.currentUser.id) {
      let editClass = this.state.location === "edit" ? "active" : ""
      editLink = <li className={editClass} onClick={this.changeLocation("edit")}>Edit</li>
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
                  <li className={homeClass} onClick={this.changeLocation("home")}>Home</li>
                  <li className={memberClass} onClick={this.changeLocation("members")}>Members</li>
                  <li className={eventClass} onClick={this.changeLocation("events")}>Events</li>
                  {editLink}
                </ul>
                {joinButton}
              </div>
            </nav>
            <ul className="show-body">
            <GroupSidebar groupId={this.state.group.id} eventCount={eventCount} />
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
    joinGroup: (groupId, userId) => dispatch(joinGroup(groupId, userId)),
    leaveGroup: (groupId) => dispatch(leaveGroup(groupId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupShow);
