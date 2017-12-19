import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../actions/session_actions";
import hashHistory from "../../../util/history";
import ExpandArrow from "../../../packs/images/expand.png";
import CollapseArrow from "../../../packs/images/collapse.png";
import "./topright.css";

class TopRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      user: this.props.user
    };

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  handleLogout() {
    this.props.logout();
  }

  toggleModal() {
    if (this.state.modalOpen) {
      this.closeModal();
    } else {
      this.openModal();
    }
  }

  goToProfile() {
    this.closeModal();
    hashHistory.push(`users/${this.props.user.id}`);
  }

  render() {
    const groupList = [];
    this.props.user_groups.forEach(group => {
      groupList.push(
        <Link key={group.id} to={`/groups/${group.id}`}>
          <li onClick={this.toggleModal}>{group.group_name}</li>
        </Link>
      );
    });

    const dropdown = (
      <div className="nav-drop-down">
        <ul className="nav-group-list">
          {groupList}
          <Link to="/search">
            <li onClick={this.toggleModal}>*All Groups*</li>
          </Link>
        </ul>
        <ul>
          <li onClick={this.goToProfile}>Profile</li>
          <li onClick={this.handleLogout}>Logout</li>
        </ul>
      </div>
    );

    let icon = <img className="icon" src={ExpandArrow} />;

    if (this.state.modalOpen) {
      icon = <img className="icon" src={CollapseArrow} />;
    }

    let profileImage = this.props.user.profile_pic;
    if (profileImage === "/DEFAULT") {
      profileImage = window.images.default_profile;
    }

    return (
      <ul className="topright">
        <li>Hello, {this.props.user.full_name}</li>
        <li className="profile_pic_thumb" onClick={this.toggleModal}>
          <img src={profileImage} />
          {icon}
        </li>
        <Modal
          contentLabel="nav-drop-down"
          className="nav-drop-down"
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
        >
          {dropdown}
        </Modal>
      </ul>
    );
  }
}

TopRight.defaultProps = {
  user: {
    profile_pic: "/DEFAULT",
    full_name: "",
    id: 0
  },
  user_groups: []
};

TopRight.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  user_groups: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  user: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()).then(() => hashHistory.push("/welcome"))
});

export default connect(mapStateToProps, mapDispatchToProps)(TopRight);
