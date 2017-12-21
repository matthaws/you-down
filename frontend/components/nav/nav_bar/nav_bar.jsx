import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AuthForm from "../../welcome/auth_form/auth_form.jsx";
import { modalStyle } from "../../../util/modal_util";
import TopRight from "../topright/topright.jsx";

import "./nav_bar.css";

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
          <li>
            <Link to="/newgroup">Create a Group</Link>
          </li>
          <li id="logo">
            <Link to="/welcome">YouDown?</Link>
          </li>
          <li>{topright}</li>
          <Modal
            style={modalStyle}
            contentLabel="auth_form"
            className="auth-form"
            isOpen={this.state.modalOpen}
            onRequestClose={this.closeModal}
          >
            <AuthForm formType={this.state.formType} />
          </Modal>
        </ul>
      </nav>
    );
  }
}

NavBar.propTypes = {
  currentUser: PropTypes.object
};

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

export default connect(mapStateToProps, null)(NavBar);
