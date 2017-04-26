import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { editUser, fetchUser } from '../../actions/user_actions';
import { Link } from 'react-router';

class ProfileMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: this.props.user}
  }

  componentDidMount() {
    this.props.fetchUser(this.props.params.userId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.userId !== this.state.user.id) {
      this.props.fetchUser(nextProps.params.userId);
    }
    this.setState({user: nextProps.user})
  }

  render () {
    let profile_pic_url = this.state.user.profile_pic;

    if (profile_pic_url === "/DEFAULT") {
      profile_pic_url = window.images.default_profile
    }

    let editlink = (<li></li>)

    if (this.props.currentUser && this.state.user.id === this.props.currentUser.id ) {
      editlink = (<li><Link to={`/users/${this.state.user.id}/edit`}>Edit Your Profile</Link></li>)
    }
    let groupNum = ""
    let groupList = []
    if (this.state.user.joined_groups) {
      groupNum = this.state.user.joined_groups.length
      this.state.user.joined_groups.forEach( (group) => {
        let organizer = (<h2>Member</h2>)
        if (group.organizer_id === this.state.user.id) {
          organizer = (<h2>Organizer</h2>)
        }
        let group_pic_url = group.group_pic
        if (group_pic_url === "/DEFAULT") {
          group_pic_url = window.images.default_group;
        }
        groupList.push(
          <li key={group.id}>
            <Link to={`/groups/${group.id}`}>
            <ul className="groupItem">
              <li><img className="group-pic-thumb" src={group_pic_url} /></li>
              <li><h1>{group.group_name}</h1><br />{organizer}</li>
            </ul>
          </Link>
        </li>)
      })
    }

  return (
    <div className="profile-background">
    <section className="profile">
      <div className="left-box">
        <h1>{this.state.user.full_name}</h1>
        <ul>
          <li>LOCATION: <br />{this.state.user.location_name}</li>
          <li>BIO: <br /> {this.state.user.bio}</li>
        </ul>
      </div>
      <div className="right-box">
        <ul>
          <li><img className="big-profile-pic" src={profile_pic_url} /></li>
          {editlink}
        </ul>
      </div>
    </section>
    <section className="groupList">
      <h1>Member of {groupNum} groups:</h1>
      <ul className="listItems">
        {groupList}
      </ul>
    </section>
  </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.users,
    currentUser: state.session.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    editUser: (user) => dispatch(editUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMain)
