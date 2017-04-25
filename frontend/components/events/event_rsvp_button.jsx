import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { joinEvent, leaveEvent } from '../../actions/event_actions';
import { joinGroup } from '../../actions/group_actions';

class EventRsvpButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {attendeeIds: this.props.attendeeIds, memberIds: this.props.memberIds}
    this.handleLeave = this.handleLeave.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.handleGroupJoin = this.handleGroupJoin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({attendeeIds: nextProps.attendeeIds, memberIds: this.props.memberIds})
  }

  handleLeave() {
    this.props.leaveEvent(this.props.eventId);
    let newAttendeeIds = [];
    this.state.attendeeIds.forEach( attendee => {
      if (attendee !== this.props.currentUser.id) {
        newAttendeeIds.push(attendee)
      }
    })
    this.setState({attendeeIds: newAttendeeIds})
  };

  handleJoin() {
    this.props.joinEvent(this.props.eventId, this.props.currentUser.id);
    let newAttendeeIds = this.state.attendeeIds
    newAttendeeIds.push(this.props.currentUser.id);
    this.setState({attendeeIds: newAttendeeIds});
  }

  handleGroupJoin() {
    this.props.joinGroup(this.props.groupId, this.props.currentUser.id);
    let newMemberIds = this.state.memberIds;
    newMemberIds.push(this.props.currentUser.id);
    this.setState({memberIds: newMemberIds});
  }

  render() {
    let button = (<div />)
    if (this.props.currentUser && this.state.attendeeIds.includes(this.props.currentUser.id)) {
      button = (<div className="join-event-button">
        <h1>You are down!</h1>
        <button onClick={this.handleLeave} className="form-button">CANCEL RSVP</button>
      </div>)
    } else {
      if (this.props.currentUser && this.state.memberIds.includes(this.props.currentUser.id)) {
        button = (<div className="join-event-button">
        <h1> Want to go? </h1>
        <button onClick={this.handleJoin} className="form-button">RSVP</button>

        </div>)
      } else {
        button = (<div className="join-event-button">
        <h1> Want to go? </h1>
        <button onClick={this.handleGroupJoin} className="form-button">JOIN THIS GROUP</button>
        </div>)
      }
    }

    return (
      <div>
        { button }
      </div>
    );
  }

};







const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    joinEvent: (eventId, userId) => dispatch(joinEvent(eventId, userId)),
    leaveEvent: (eventId) => dispatch(leaveEvent(eventId)),
    joinGroup: (groupId, userId) => dispatch(joinGroup(groupId, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventRsvpButton)
