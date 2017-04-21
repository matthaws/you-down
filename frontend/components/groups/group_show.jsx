import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fetchGroup } from '../../actions/group_actions';
import GroupDetails from "./group_details";
import GroupMembers from "./group_members";

class GroupShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { location: "home" };
    this.goHome = this.goHome.bind(this);
    this.members = this.members.bind(this);
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

    let body = (<GroupDetails group={this.props.group} />)
    if (this.state.location === "members") {
      body = (<GroupMembers />)
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
                </ul>
              </div>
            </nav>
            <ul className="show-body">
              <li><div className="left-sidebar">
                <ul>
                  <li><img className="group_show_profile_thumb" src={group_pic_url} /></li>
                  <li>Based in: <br /> {this.props.group.location_name}</li>
                  <li >Organizer: <br /><img className="group_show_profile_thumb" src={organizer_pic} /> <br />{organizer}
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
    group: state.groups
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGroup: (groupId) => dispatch(fetchGroup(groupId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupShow);
