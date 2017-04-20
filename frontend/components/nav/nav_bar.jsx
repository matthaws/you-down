import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import AuthForm from '../welcome/auth_form';
import { modalStyle } from '../../util/modal_util';
import Modal from 'react-modal';
import TopRight from './topright';


class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false,
      formType: "signup",
      currentUser: window.currentUser || {}
    };

    this.closeModal = this.closeModal.bind(this);
    this.openSignUp = this.openSignUp.bind(this);
    this.openLogIn = this.openLogIn.bind(this);
  }

  closeModal() {
    this.setState({ modalOpen: false })
  }

  openLogIn() {
    this.setState({ modalOpen: true, formType: "login"})
  }

  openSignUp() {
    this.setState({ modalOpen: true, formType: "signup" })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({currentUser: nextProps.currentUser})
    this.closeModal();
  }

  render() {

    let topright = (
      <ul className="topright">
        <li onClick={this.openLogIn}>Log in</li>
        <li className="signup-button" onClick={this.openSignUp}>Sign up</li>
      </ul>
    )
    if (this.state.currentUser.full_name) {
      topright = (
        <TopRight />
      )
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
              <AuthForm formType={this.state.formType}/>
          </Modal>
        </ul>
      </nav>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps, null)(NavBar);
