import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fetchEvent } from '../../actions/event_actions';
import { fetchGroup } from '../../actions/group_actions';
import { Link } from 'react-router';

class EventShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {event: this.props.event, user: this.props.currentUser, group: this.props.group}
  }

  componentDidMount() {
    this.props.fetchEvent(this.props.params.eventId);
    this.setState({event: this.props.event})
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.event.id && nextProps.params.eventId != this.state.group.id.toString()){
      this.props.fetchEvent(nextProps.params.eventId)
    }
    this.setState({event: nextProps.event})
    if (this.state.group && this.state.event.group.id != nextProps.event.group.id) {
      this.props.fetchGroup(nextProps.group)
    }
    this.setState({group: nextProps.group})
  }

  render() {

    return (
      <div className="group-background">
        <div className="group-show">
          <nav className="group-title">
            <h1>{this.state.event.event_name}</h1>
            <div className="group-menu-background">
              <div className="group-menu-border"></div>
              <ul className="group-menu">
                <li><button className="form-button">Back to group</button></li>
              </ul>
              </div>
            </div>
          </nav>
          <ul className="show-body">
            <GroupSidebar group={this.state.group}
              members={this.state.group.members}
              eventCount={eventCount}
          </ul>
        </div>
      </div>
    )

  }
}



const mapStateToProps = (state) => {
  return {
    event: state.events,
    group: state.groups,
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvent = (eventId) => dispatch(fetchEvent(eventId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventShow);
