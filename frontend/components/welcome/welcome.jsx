import React from 'react';
import ReactDOM from 'react-dom';
import VideoBar from './video_bar';
import Modal from 'react-modal';
import AuthForm from './auth_form';
import { modalStyle } from '../../util/modal_util';



class Welcome extends React.Component {
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
  <section className="welcome">
      <div id="videoMessage">
        <h1>Fun People, Fun Stuff</h1>
        <h3>Are <i>you</i> down?</h3>
        <button className="main-button" onClick={this.openModal}>Sign Up</button>
        <Modal
          style={ modalStyle }
          contentLabel="auth_form"
          className="auth-form"
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}>
          <AuthForm closeModal={this.closeModal} formType="signup" />
        </Modal>
      </div>
      <VideoBar />
    <div className="placeholder"></div>
  </section>
);
 }
}
export default Welcome;
