import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { modalStyle } from '../../util/modal_util';
import Modal from 'react-modal';
import { logout } from '../../actions/session_actions.js';
import { hashHistory, Link } from 'react-router';

class TopRight extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      modalOpen: false,
      user: this.props.user
    };

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
  }


  closeModal() {
    this.setState({ modalOpen: false })
  }

  openModal() {
    this.setState({ modalOpen: true })
  }

  handleLogout() {
    this.props.logout()
  }

  toggleModal() {
    if (this.state.modalOpen) {
      this.closeModal()
    } else {
      this.openModal()
    }
  }

  goToProfile() {
    this.closeModal();
    hashHistory.push(`users/${this.props.user.id}`);
  }

  render() {
    let groupList = [];
    if (this.state.user.joined_groups) {
      this.state.user.joined_groups.forEach( (group) => {
        groupList.push(
          <Link key={group.id} to={`/groups/${group.id}`} >
          <li  onClick={this.toggleModal}>
              {group.group_name}
          </li>
        </Link>)
      })
    }

    let dropdown = (
    <div className="nav-drop-down">
      <ul className="nav-group-list">
        {groupList}
      </ul>
      <ul>
        <li onClick={this.goToProfile}>Profile</li>
        <li onClick={this.handleLogout}>Logout</li>
      </ul>
    </div>
    )

    let icon = ( <img className="icon" src={window.images.expand_arrow} />)

    if (this.state.modalOpen) {
      icon = ( <img className="icon" src={window.images.collapse_arrow} />)
    }

    let profile_image = this.props.user.profile_pic
    if (profile_image === "/DEFAULT") {
      profile_image = window.images.default_profile
    }

      return (
        <ul className="topright">
          <li>Hello, {this.props.user.full_name}</li>
          <li className="profile_pic_thumb" onClick={this.toggleModal}><img  src={profile_image} />{icon}</li>

            <Modal
              contentLabel="nav-drop-down"
              className="nav-drop-down"
              isOpen={this.state.modalOpen}
              onRequestClose={this.closeModal}>
                {dropdown}
            </Modal>
        </ul>
      )
    }
  }

const mapStateToProps = (state) => {
  return {
    user: state.session.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()).then(window.currentUser = {}).then(hashHistory.push('/welcome'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopRight);
