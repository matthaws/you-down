import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import SignUpForm from './auth_form';

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
    const style = {
      overlay : {
        position        : 'fixed',
        top             : 0,
        left            : 0,
        right           : 0,
        bottom          : 0,
        backgroundColor : 'rgba(255, 255, 255, 0.75)',
        zIndex          : 10
      },
      content : {
        position        : 'fixed',
        top             : '25%',
        right           : '38%',
        bottom          : '25%',
        left            : '38%',
        border          : '1px solid #ccc',
        padding         : '20px',
        zIndex          : 11
      }
    }
    return (
  <div id="video-bar">
    <div id="videoBlock">

    <div id="videoMessage">
      <h1>Fun People, Fun Stuff</h1>
      <h3>Are <i>you</i> down?</h3>
      <button onClick={this.openModal}>Sign Up</button>
        <Modal
          style={style}
          contentLabel="auth_form"
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}>
            <SignUpForm />
        </Modal>
    </div>
    </div>
  </div>
  );
 }
}

export default VideoBar;
