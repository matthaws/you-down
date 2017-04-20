import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import AuthForm from './auth_form';
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
    <div id="videoBlock">
      <video preload="preload" autoPlay="autoplay" loop="loop">
        <source src={window.images.intro_video} type="video/mp4" />
      </video>
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
              <AuthForm formType="signup" />
          </Modal>
      </div>
    </div>
  </div>
  );
 }
}

export default VideoBar;
