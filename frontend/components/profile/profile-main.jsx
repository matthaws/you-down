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
    this.setState({user: nextProps.user})
  }

  render () {
    let profile_pic_url = this.state.user.profile_pic;

    if (profile_pic_url === "/DEFAULT") {
      profile_pic_url = window.images.default_profile
    }

    let editlink = (<li></li>)

    if (this.state.user.id === this.props.currentUser.id ) {
      editlink = (<li><Link to={`/users/${this.state.user.id}/edit`}>Edit Your Profile</Link></li>)
    }
  return (
    <section className="profile">
      <div className="left-box">
        <h1>{this.state.user.full_name}</h1>
        <ul>
          <li>LOCATION: {this.state.user.location_name}</li>
          <li>BIO: {this.state.user.bio}</li>
        </ul>
      </div>
      <div className="right-box">
        <ul>
          <li><img className="big-profile-pic" src={profile_pic_url} /></li>
          {editlink}
        </ul>
      </div>

    </section>
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
