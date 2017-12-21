import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import VideoBar from "./video_bar/video_bar.jsx";
import AuthForm from "./auth_form/auth_form.jsx";
import { modalStyle } from "../../util/modal_util";
import CategoryContainer from "./categories/categories_container.jsx";
import "./welcome.css";

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  render() {
    let button = (
      <div>
        <button className="main-button" onClick={this.openModal}>
          Sign Up
        </button>
        <Modal
          style={modalStyle}
          contentLabel="auth_form"
          className="auth-form"
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
        >
          <AuthForm closeModal={this.closeModal} formType="signup" />
        </Modal>
      </div>
    );

    if (this.props.signedIn) {
      button = <div />;
    }

    return (
      <section className="welcome">
        <div id="videoMessage">
          <h1>Fun People, Fun Stuff</h1>
          <h3>
            Are <i>you</i> down?
          </h3>
          {button}
        </div>
        <VideoBar />
        <div className="placeholder">
          <h1>Explore</h1>
          <CategoryContainer />
        </div>
      </section>
    );
  }
}

Welcome.propTypes = {
  currentUser: PropTypes.object,
  signedIn: PropTypes.bool
};

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  signedIn: Boolean(state.session.currentUser)
});

export default connect(mapStateToProps, null)(Welcome);
