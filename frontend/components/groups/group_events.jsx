import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class GroupEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {location: "upcoming"}
    this.upcoming = this.upcoming.bind(this)
    this.past = this.past.bind(this);

  }

  upcoming() {
    this.setState({location: "upcoming"});
  }

  past() {
    this.setState({location: "past"});
  }

  render () {
    let upcomingEventList = [];
    let pastEventList = [];
    let now = Date.now();
    if (this.props.events) {
      this.props.events.forEach( (event) => {
          let eventDate = new Date(event.date);
          let date = eventDate.toLocaleDateString();
          let time = eventDate.toLocaleTimeString();
          let eventEntry = (<ul key={event.id} ><li className="event-list-item"><ul>
          <Link to={`/events/${event.id}`}><li><h2>{event.event_name}</h2></li></Link>
          <li><img src={window.images.location} /><h3><a href={`http://maps.google.com/?q=${event.location_address}`}>{event.location_name}<br />
            {event.location_address}</a></h3></li>
          </ul>
          <ul>
            <li>{this.props.memberNum} attending</li>
            <li>{date}, {time}</li>
          </ul>
          </li>
            <p className="event-description">{event.description}</p>
        </ul>);

        if (eventDate.valueOf() < now) {
          pastEventList.push(eventEntry);
        } else {
          upcomingEventList.push(eventEntry);
        }
      });
    };
    let eventList = [];
    if (this.state.location === 'past' ) {
      eventList = pastEventList
    } else {
      eventList = upcomingEventList
    }

    return (
      <div className="group-event-list">
        <ul className="mini-menu">
          <li onClick={this.upcoming}>Upcoming Events</li>
          <li onClick={this.past}>Past Events</li>
        </ul>

        <ul>
          {eventList}
        </ul>
        <button onClick={this.props.changeLocation("createEvent")} className="form-button">Create a New Event</button>

      </div>
    )
  }

}

export default GroupEvents;
