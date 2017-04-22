import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fetchGroup, joinGroup } from '../../actions/group_actions';
import GroupDetails from "./group_details";
import GroupMembers from "./group_members";
import GroupEdit from "./group_edit";
import { Link } from "react-router";

class GroupShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { location: "home" };
    this.goHome = this.goHome.bind(this);
    this.members = this.members.bind(this);
    this.edit = this.edit.bind(this);
    this.joinGroup = this.joinGroup.bind(this);
  }

  joinGroup() {
    this.props.joinGroup(this.props.group.id, this.props.currentUser.id)
  }

  componentDidUpdate() {
    this.props.fetchGroup(this.props.params.groupId)
  }

  componentDidMount() {
    this.props.fetchGroup(this.props.params.groupId)
  }

  goHome() {
    this.setState({location: "home" })
  }

  members() {
    this.setState({location: "members"})
  }

  edit() {
    this.setState({location: "edit"})
  }

  render() {
    let organizer = ""
    let organizer_pic = window.images.default_profile;
      if (this.props.group.organizer) {
        organizer = this.props.group.organizer.full_name
        organizer_pic = this.props.group.organizer.profile_pic
      }

    let group_pic_url = this.props.group.group_pic
      if (group_pic_url === "/DEFAULT") {
        group_pic_url = window.images.default_group;
      }

    let members = [];
    let memberIds = [];

    if (this.props.group.members) {
      members = this.props.group.members;
      members.forEach( (member) => {
        memberIds.push(member.id)
      })
    }

    let joinButton = (<button onClick={this.joinGroup} className="form-button">Join Us!</button>)
    if (this.currentUser && memberIds.include(this.currentUser.id)) {
      joinButton = (<div />)
    }

    let body = (<GroupDetails members={members} group={this.props.group} />)
    if (this.state.location === "members") {
      body = (<GroupMembers members={this.props.group.members} />)
    } else if (this.state.location === "edit") {
      body = (<GroupEdit goHome={this.goHome} group={this.props.group} />)
    }

    let editLink = (<div />)
    if (this.props.group.organizer && this.props.group.organizer.id === this.props.currentUser.id) {
      editLink = <li onClick={this.edit}>Edit</li>
    }

    let orgLink = (<div />)
    if (this.props.group.organizer) {
      orgLink = (<Link to={`/users/${this.props.group.organizer.id}`}>
          <img className="group_show_profile_thumb" src={organizer_pic} /> <br />{organizer}
        </Link>)
    }


    return (
        <div className="group-background">
          <div className="group-show">
            <nav className="group-title">
                <h1>{this.props.group.group_name}</h1>
                <div className="group-menu-background">
                <div className="group-menu-border"></div>
                <ul className="group-menu">
                  <li onClick={this.goHome}>Home</li>
                  <li onClick={this.members}>Members</li>
                  {editLink}
                </ul>
                {joinButton}
              </div>
            </nav>
            <ul className="show-body">
              <li><div className="left-sidebar">
                <ul>
                  <li><img className="group_show_profile_thumb" src={group_pic_url} /></li>

                  <li>Based in: <br /> {this.props.group.location_name}, <br/> {this.props.group.location_zip}</li>
                  <li>{members.length} {this.props.group.member_moniker}</li>
                  <li>Organizer: <br />
                      {orgLink}
                    </li>
                </ul>
              </div></li>
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
