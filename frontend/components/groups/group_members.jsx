import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class GroupMembers extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    let memberList = [];
    this.props.members.forEach( (member) => {
      let profile_pic = member.profile_pic
      if (profile_pic === "/DEFAULT") {
        profile_pic = window.images.default_profile
      }
      memberList.push(
        <li key={member.id}>
          <ul>
            <Link to={`/users/${member.id}`} >
            <li><img src={profile_pic} className="member-pic-thumb" /></li>
            <li>{member.full_name}</li>
            </Link>
          </ul>
        </li>
      )
    })
    return (
    <li>
      <div className="show-main member-main">
        <h1> Members: </h1>
        <ul className="memberItem">
          {memberList}
        </ul>
      </div>
    </li>
    )
  }
}

export default GroupMembers
