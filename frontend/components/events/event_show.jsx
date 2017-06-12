import React from 'react';
import ReactDOM from 'react-dom';
import GroupSidebar from '../groups/group_sidebar';
import EventRsvpButton from './event_rsvp_button';
import NewEventForm from './new_event_form';
import { connect } from 'react-redux';
import { fetchEvent } from '../../actions/event_actions';
import { fetchGroup } from '../../actions/group_actions';
import { Link } from 'react-router';

class EventShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "home",
      event: this.props.event,
      user: this.props.currentUser,
      group: this.props.group};

    this.changeLocation = this.changeLocation.bind(this);
  }

  componentDidMount() {
    this.props.fetchEvent(this.props.params.eventId);
    this.setState({event: this.props.event});
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.event.id && this.state.event.id.toString() !== nextProps.params.eventId) {
      this.props.fetchEvent(nextProps.params.eventId);
    }

    this.setState({event: nextProps.event});
    this.setState({group: nextProps.group, location: "home"});
  }

  changeLocation(newLocation) {
    return () => this.setState({location: newLocation});
  }

  render() {
    let eventDate = new Date(this.state.event.date);
    let time = eventDate.getHours() > 12 ? "PM" : "AM";
    let minutes = eventDate.getMinutes();
    if (minutes === 0) {
      minutes = "00";
    }
    let hours = eventDate.getHours() % 12 ;

    let date = new Date(this.state.event.date).toDateString();

    let attendeeList=[];
    let attendeeIds=[];
    if (this.state.event.attendees) {
      this.state.event.attendees.forEach( attendee => {
        let user_pic = attendee.profile_pic;
        if (user_pic === 'DEFAULT') {
          user_pic = window.images.default_profile;
        }
        attendeeIds.push(attendee.id);

        attendeeList.push(
          <li key={attendee.id}>
          <Link to={`/users/${attendee.id}`}>
          <ul className="attendee-list-entry">
            <li>{attendee.full_name}</li>
            <li><img src={user_pic} /></li>
          </ul>
          </Link>
        </li>);
      });
    }

    let memberIds = [];
    if (this.state.group.members) {
      this.state.group.members.forEach( member => {
        memberIds.push(member.id);
      });
    }

    let groupId = "";
    if (this.state.event.group) {
      groupId = this.state.event.group.id;
    }

    let eventCount = 0;
    if (this.state.group.events) {
      eventCount = this.state.group.events.length;
    }

    let body;
    switch (this.state.location) {
      case "edit":
        body = (<ul className="show-body">
          <GroupSidebar groupId={groupId} eventCount={eventCount} />
          <NewEventForm formType="edit" event={this.state.event} eventId={this.props.params.eventId} changeLocation={this.changeLocation}/>
        </ul>);
      break;
      case "createEvent":
        body = (<ul className="show-body">
          <GroupSidebar groupId={groupId} eventCount={eventCount} />
          <NewEventForm formType="new" eventId={this.props.params.eventId} groupId={this.state.group.id} />
        </ul>);
        break;
      case "home":
      body = (<ul className="show-body">
        <GroupSidebar groupId={groupId} eventCount={eventCount} />
       <li>
         <div className="event-show-main">
           <ul className="event-details">
             <li><img src={window.images.clock} />{date}, {hours}:{minutes} {time}</li>
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
         <EventRsvpButton eventId={this.props.params.eventId} groupId={this.state.group.id} attendeeIds={attendeeIds} memberIds={memberIds} />
        <h1>{attendeeIds.length} attending:</h1>
        <ul>
          {attendeeList}
        </ul>
       </li>
     </ul>);
      break;
    }
    let editEventLink = (<div />);
    if (this.state.event.organizer && this.props.currentUser.id === this.state.event.organizer.id) {
      editEventLink = (<li onClick={this.changeLocation("edit")}>Edit This Event</li>);
    }

    return (
      <div className="group-background">
        <div className="group-show">
          <nav className="group-title">
            <h1>{this.state.event.event_name}</h1>
            <div className="group-menu-background">
              <div className="group-menu-border"></div>
              <ul className="group-menu">
                  <Link to={`/groups/${this.state.group.id}`}><li>Group</li></Link>
                <li onClick={this.changeLocation("createEvent")}>Create a New Event</li>
                {editEventLink}
            </ul>
            </div>
          </nav>
          {body}
        </div>
      </div>
    );

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
