import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import SignUpForm from '../welcome/signup_form';
import { modalStyle } from '../../util/modal_util';
import Modal from 'react-modal';

class NavBar extends React.Component {
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

  render() {
    let topright = (
      <ul className="topright">
        <li>Log in</li>
        <li className="signup-button" onClick={this.openModal}>Sign up</li>
      </ul>
    )

    if (this.props.current_user) {

    }

    return (
      <nav className="top-nav">
        <ul>
          <li>Create a Group</li>
          <li id="logo">YouDown?</li>
          <li>
            {topright}
          </li>
          <Modal
            style={ modalStyle}
            contentLabel="auth_form"
            className="auth-form"
            isOpen={this.state.modalOpen}
            onRequestClose={this.closeModal}>
              <SignUpForm />
          </Modal>
        </ul>
      </nav>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    current_user: state.session.current_user
  }
}

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps, null)(NavBar);
