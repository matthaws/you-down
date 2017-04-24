import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class GroupSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {group: this.props.group, members: this.props.members}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({group: nextProps.group, members: nextProps.members});
  }

  render() {
    let organizer = ""
    let organizer_pic = window.images.default_profile;
      if (this.state.group.organizer) {
        organizer = this.state.group.organizer.full_name
      if (this.state.group.organizer.profile_pic !== "DEFAULT") {
        organizer_pic = this.state.group.organizer.profile_pic
      }
      }
    let group_pic_url = this.state.group.group_pic

    if (group_pic_url && group_pic_url === "/DEFAULT") {
      group_pic_url = window.images.default_group;
    }

    let orgLink = (<div />)
    if (this.state.group.organizer) {
      orgLink = (<Link to={`/users/${this.state.group.organizer.id}`}>
          <img className="group_show_profile_thumb" src={organizer_pic} /> <br />{organizer}
        </Link>)
    }


    return   (<li><div className="left-sidebar">
        <ul>
          <li><img className="group_show_profile_thumb" src={group_pic_url} /></li>
          <li><h2>{this.state.group.group_name}</h2></li>
          <li>Based in: <br /> {this.state.group.location_name}, <br/> {this.state.group.location_zip}</li>
          <li><p>{this.state.group.member_moniker}:</p><p>{this.state.members.length}</p></li>
          <li><p>Events:</p><p>{this.props.eventCount}</p></li>
          <li className="organizer">Organizer:</li>
          <li>{orgLink}</li>
        </ul>
      </div></li>);
  }
}

export default GroupSidebar;
