import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { editUser, fetchUser } from '../../actions/user_actions';
import { Link, hashHistory } from 'react-router';
import { merge } from 'lodash';

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    let user = merge(this.props.user}
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleBioChange = this.handleBioChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.params.userId)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({user: nextProps.user})
  }

  handleSubmit(e) {
    this.props.editUser({
      id: this.state.user.id,
      location_name: this.state.user.location_name,
      bio: this.state.user.bio,
      full_name: this.state.user.full_name})
      hashHistory.push(`/users/${this.state.user.id}`})
  }

  handleNameChange(e) {
    this.setState({user: {full_name: e.target.value}})
  }

  handleLocationChange(e) {
    this.setState({user: {location_name: e.target.value}})
  }

  handleBioChange(e) {
    this.setState({user: {bio: e.target.value}})
  }

  render () {
    let profile_pic_url = this.state.user.profile_pic;
    if (profile_pic_url === "/DEFAULT") {
      profile_pic_url = window.images.default_profile
    }

  return (
  <div className="profile-background">
    <section className="profile">
      <div className="left-box">
        <h1><input className="name-input" onChange={this.handleNameChange} value={this.state.user.full_name} /></h1>
        <ul>
          <li>LOCATION:<br /> <input type="text" onChange={this.handleLocationChange} value={this.state.user.location_name} /></li>
          <li>BIO:<br /><textarea onChange={this.handleBioChange} value={this.state.user.bio} /></li>
        </ul>
      </div>
      <div className="right-box">
        <ul>
          <li><img className="big-profile-pic" src={profile_pic_url} /></li>
        </ul>
      </div>

    </section>
    <div className="button-box">
      <button onClick={this.handleSubmit} className="edit-submit-button">Submit Changes</button>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit)
