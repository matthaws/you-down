import React from 'react';
import ReactDOM from 'react-dom';
import GroupSidebar from '../groups/group_sidebar';
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
    if (this.state.group && nextProps.event.group && this.state.group.id != nextProps.event.group.id) {
      this.props.fetchGroup(nextProps.event.group.id)
    }
    this.setState({group: nextProps.group})
  }

  render() {
    let date = new Date(this.state.event.date).toLocaleDateString();
    let time = new Date(this.state.event.date).toLocaleTimeString();

    let attendeeList=[];
    if (this.state.event.attendees) {
      this.state.event.attendees.forEach( attendee => {
        user_pic = attendee.profile_pic
        if (user_pic === '/DEFAULT') {
          user_pic = window.images.default_profile
        }

        attendeeList.push(
          <li key={attendee.id}>
          <ul className="attendee-list-entry">
            <li>{attendee.full_name}</li>
            <li><img src={user_pic} /></li>
          </ul>
          </li>)
      })
    }
    debugger

    return (
      <div className="group-background">
        <div className="group-show">
          <nav className="group-title">
            <h1>{this.state.event.event_name}</h1>
            <div className="group-menu-background">
              <div className="group-menu-border"></div>
              <ul className="group-menu">
                  <Link to={`/groups/${this.state.group.id}`}><li>Group</li></Link>
                <li>Create a New Event</li>
              </ul>
            </div>
          </nav>
          <ul className="show-body">
            <GroupSidebar group={this.state.group}
              members={this.state.group.members}
             />
           <li>
             <div className="event-show-main">
               <ul className="event-details">
                 <li><img src={window.images.clock} />{date}, {time}</li>
                 </ul>
                <ul className="event-details">
                  <li><img src={window.images.location} />

                {this.state.event.location_name}</li>
              <li className="event-address"><a href={`http://maps.google.com/?q=${this.state.event.location_name},${this.state.event.location_zip}`}>{this.state.event.location_address}</a></li>
                </ul>
                <div className="event-show-description">
                  {this.state.event.description}
                </div>
           </div>
         </li>
           <li className="right-sidebar">
            <h1>Attending:</h1>
            <ul>
              {attendeeList}
            </ul>
           </li>
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
    fetchEvent: (eventId) => dispatch(fetchEvent(eventId)),
    fetchGroup: (groupId) => dispatch(fetchGroup(groupId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventShow);
