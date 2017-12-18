import React from "react";
import ReactDOM from "react-dom";
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AuthForm from "../welcome/auth_form";
import { modalStyle } from "../../util/modal_util";
import TopRight from "./topright";
import hashHistory from "../../util/history.js";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      formType: "signup"
    };

    this.closeModal = this.closeModal.bind(this);
    this.openSignUp = this.openSignUp.bind(this);
    this.openLogIn = this.openLogIn.bind(this);
    this.goHome = this.goHome.bind(this);
    this.goToCreate = this.goToCreate.bind(this);
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  openLogIn() {
    this.setState({ modalOpen: true, formType: "login" });
  }

  openSignUp() {
    this.setState({ modalOpen: true, formType: "signup" });
  }

  componentWillReceiveProps() {
    this.closeModal();
  }

  goHome() {
    hashHistory.push("/welcome");
  }

  goToCreate() {
    if (this.props.currentUser && this.props.currentUser.id) {
      hashHistory.push("/newgroup");
    } else {
      this.openLogIn();
    }
  }

  render() {
    let topright = (
      <ul className="topright">
        <li onClick={this.openLogIn}>Log in</li>
        <li className="signup-button" onClick={this.openSignUp}>
          Sign up
        </li>
      </ul>
    );
    if (this.props.currentUser) {
      topright = <TopRight />;
    }
    return (
      <nav className="top-nav">
        <ul>
          <li onClick={this.goToCreate}>Create a Group</li>
          <li onClick={this.goHome} id="logo">YouDown?</li>
          <li>{topright}</li>
          <Modal
            style={modalStyle}
            contentLabel="auth_form"
            className="auth-form"
            isOpen={this.state.modalOpen}
            onRequestClose={this.closeModal} />
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
  };
}

export default connect(mapStateToProps, null)(NavBar);
