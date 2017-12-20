import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { editUser, fetchUser } from "../../actions/user_actions";
import GroupList from "./group_list.jsx";
import DefaultProfilePic from "../../packs/images/profile-pic.jpg";

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
    let profilePicUrl = this.props.user.profile_pic;

    if (profilePicUrl === "/DEFAULT") {
      profilePicUrl = DefaultProfilePic;
    }

    let editlink = <li />;

    if (
      this.props.currentUser &&
      this.props.user.id === this.props.currentUser.id
    ) {
      editlink = (
        <li>
          <Link to={`/users/${this.state.user.id}/edit`}>
            Edit Your Profile
          </Link>
        </li>
      );
    }
    const groupNum = this.props.user.groups.length;
    return (
      <div className="profile-background">
        <section className="profile">
          <div className="left-box">
            <h1>{this.state.user.full_name}</h1>
            <ul>
              <li>
                LOCATION: <br />
                {this.state.user.location_name}
              </li>
              <li>
                BIO: <br /> {this.state.user.bio}
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
          <h1>Member of {groupNum} groups:</h1>
          <ul className="listItems">
            <GroupList groups={this.props.user.joined_groups} />
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
    joined_groups: []
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
