import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { editUser, fetchUser } from "../../../actions/user_actions";
import GroupList from "../group_list/group_list.jsx";
import DefaultProfilePic from "../../../packs/images/profile-pic.jpg";

class ProfileMain extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.params.userId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.userId !== this.state.user.id) {
      this.props.fetchUser(nextProps.params.userId);
    }
  }

  render() {
    const { user, currentUser } = this.props;
    const { bio, full_name, location_name, joined_groups } = user;

    let profilePicUrl = user.profile_pic;
    if (profilePicUrl === "/DEFAULT") {
      profilePicUrl = DefaultProfilePic;
    }

    let editlink = <li />;
    if (currentUser && user.id === currentUser.id) {
      editlink = (
        <li>
          <Link to={`/users/${user.id}/edit`}>Edit Your Profile</Link>
        </li>
      );
    }

    return (
      <div className="profile-background">
        <section className="profile">
          <div className="left-box">
            <h1>{full_name}</h1>
            <ul>
              <li>
                LOCATION: <br />
                {location_name}
              </li>
              <li>
                BIO: <br /> {bio}
              </li>
            </ul>
          </div>
          <div className="right-box">
            <ul>
              <li>
                <img className="big-profile-pic" src={profilePicUrl} />
              </li>
              {editlink}
            </ul>
          </div>
        </section>
        <section className="groupList">
          <h1>Member of {joined_groups.length} groups:</h1>
          <ul className="listItems">
            <GroupList groups={joined_groups} />
          </ul>
        </section>
      </div>
    );
  }
}

ProfileMain.propTypes = {
  user: PropTypes.object,
  currentUser: PropTypes.object,
  fetchUser: PropTypes.func,
  editUser: PropTypes.func,
  params: PropTypes.object
};

ProfileMain.defaultProps = {
  user: {
    joined_groups: [],
    bio: "",
    location_name: "",
    full_name: ""
  }
};

const mapStateToProps = state => ({
  user: state.users,
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId)),
  editUser: user => dispatch(editUser(user))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileMain)
);
