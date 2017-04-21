import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fetchGroup } from '../../actions/group_actions';
import { Link } from 'react-router';

class GroupShow extends React.Component {

  componentDidMount() {
    this.props.fetchGroup(this.props.params.groupId)
  }

  render() {
    let organizer = ""
    let organizer_pic = window.images.default_profile;
      if (this.props.group.organizer) {
        organizer = this.props.group.organizer.full_name
        organizer_pic = this.props.group.organizer.profile_pic
      }

    return (
        <div className="group-background">
          <div className="group-show">
            <nav className="group-title">
                <h1>{this.props.group.group_name}</h1>
                <div className="group-menu-background">
                <div className="group-menu-border"></div>
                <ul className="group-menu">
                  <li>Home</li>
                  <li>Members</li>
                </ul>
              </div>
            </nav>
            <ul className="show-body">
              <li><div className="left-sidebar">
                <ul>
                  <li>Based in: <br /> {this.props.group.location_name}</li>
                  <li >Organizer: <br /><img className="group_show_profile_thumb" src={organizer_pic} /> <br />{organizer}
                    </li>
                </ul>
              </div></li>
              <li><div className="show-main">
                {this.props.group.description}
              </div></li>
            </ul>
          </div>
        </div>
        );
  }
}

const mapStateToProps = (state) => {
  return {
    group: state.groups
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGroup: (groupId) => dispatch(fetchGroup(groupId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupShow);
