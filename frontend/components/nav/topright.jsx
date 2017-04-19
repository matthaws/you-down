import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { modalStyle } from '../../util/modal_util';
import Modal from 'react-modal';
import { logout } from '../../actions/session_actions.js';

class TopRight extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      modalOpen: false,
      user: window.currentUser
    };

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    if (window.currentUser) {
      this.setState({user: window.currentUser })
    }
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

  render() {
    let dropdown = (
      <ul>
        <li>Profile</li>
        <li onClick={this.handleLogout}>Log out</li>
      </ul>
    )

      return (
        <ul className="topright">
          <li>Hello, {this.props.user.full_name}</li>
          <li onClick={this.openModal}><img className="profile_pic_thumb" src={this.props.user.image_url} /></li>
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
    logout: () => dispatch(logout()).then(window.currentUser = {})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopRight);
