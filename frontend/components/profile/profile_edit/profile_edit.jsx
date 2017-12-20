import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { editUser, fetchUser } from "../../../actions/user_actions";
import hashHistory from "../../../util/history";
import DefaultProfilePic from "../../../packs/images/profile-pic.jpg";
import "../profile_main/profile_main.css";
import "./profile_edit.css";

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.user;
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleBioChange = this.handleBioChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateFile = this.updateFile.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.params.userId);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.user);
  }

  handleSubmit() {
    const form = new FormData();
    form.append("user[id]", this.state.id);
    form.append("user[location_name]", this.state.location_name);
    form.append("user[bio]", this.state.bio);
    form.append("user[full_name]", this.state.full_name);
    if (this.state.new_pic_file !== "") {
      form.append("user[profile_pic]", this.state.new_pic_file);
    }

    this.props.editUser(form);
  }

  handleNameChange(e) {
    this.setState({ full_name: e.target.value });
  }

  handleLocationChange(e) {
    this.setState({ location_name: e.target.value });
  }

  handleBioChange(e) {
    this.setState({ bio: e.target.value });
  }

  updateFile(e) {
    this.setState({ new_pic_file: e.currentTarget.files[0] });
  }

  render() {
    let profilePicUrl = this.state.profile_pic;
    if (profilePicUrl === "/DEFAULT") {
      profilePicUrl = DefaultProfilePic;
    }

    return (
      <div className="profile-background">
        <section className="profile">
          <div className="left-box">
            <h1>
              <input
                className="name-input"
                onChange={this.handleNameChange}
                value={this.state.full_name}
              />
            </h1>
            <ul>
              <li>
                LOCATION:<br />{" "}
                <input
                  type="text"
                  onChange={this.handleLocationChange}
                  value={this.state.location_name}
                />
              </li>
              <li>
                BIO:<br />
                <textarea
                  placeholder="Tell us about you..."
                  onChange={this.handleBioChange}
                  value={this.state.bio}
                />
              </li>
            </ul>
          </div>
          <div className="right-box">
            <ul>
              <li>
                <img className="big-profile-pic" src={profilePicUrl} />
              </li>
              <li>Upload a new pic:</li>
              <li>
                <input
                  type="file"
                  onChange={this.updateFile}
                  value={this.state.new_pic_file}
                />{" "}
              </li>
            </ul>
          </div>
        </section>
        <div className="button-box">
          <button onClick={this.handleSubmit} className="edit-submit-button">
            Submit Changes
          </button>
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  user: PropTypes.object,
  currentUser: PropTypes.object,
  fetchUser: PropTypes.func,
  editUser: PropTypes.func,
  params: PropTypes.object
};

ProfileEdit.defaultProps = {
  user: {
    full_name: "",
    bio: "",
    id: "",
    profile_pic: "",
    new_pic_file: ""
  }
};

const mapStateToProps = state => ({
  user: state.users,
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId)),
  editUser: user =>
    dispatch(editUser(user)).then(
      hashHistory.push(`/users/${user.get("user[id]")}`)
    )
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileEdit)
);
