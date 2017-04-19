import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import SignUpForm from './signup_form';
import { modalStyle } from '../../util/modal_util';

class VideoBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false,
    };

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  closeModal() {
    this.setState({ modalOpen: false })
  }

  openModal() {
    this.setState({ modalOpen: true })
  }

  render () {

    return (
  <div id="video-bar">
    <div id="videoMessage">
      <h1>Fun People, Fun Stuff</h1>
      <h3>Are <i>you</i> down?</h3>
      <button className="main-button" onClick={this.openModal}>Sign Up</button>
        <Modal
          style={ modalStyle}
          contentLabel="auth_form"
          className="auth-form"
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}>
            <SignUpForm />
        </Modal>
    </div>
  </div>
  );
 }
}

export default VideoBar;
