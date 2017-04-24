import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class GroupEvents extends React.Component {
  render () {
    let eventList = [];
    if (this.props.events) {
      this.props.events.forEach( (event) => {
          let date = new Date(event.date).toLocaleDateString();
          let time = new Date(event.date).toLocaleTimeString();
              eventList.push(<ul key={event.id} ><li className="event-list-item"><ul>
          <li><h2>{event.event_name}</h2></li>
          <li><img src={window.images.location} /><h3><a href={`http://maps.google.com/?q=${event.location_address}`}>{event.location_name}<br />
            {event.location_address}</a></h3></li>
          </ul>
          <ul>
            <li>x attending</li>
            <li>{date}, {time}</li>
          </ul>
          </li>
            <p className="event-description">{event.description}</p>
        </ul>)
      });
    };
    return (
      <div className="group-event-list">
        <ul className="mini-menu">
          <li>Upcoming Events</li>
          <li>Past Events</li>
        </ul>

        <ul>
          {eventList}
        </ul>
        <button className="form-button">Create a New Event</button>

      </div>
    )
  }

}

export default GroupEvents;
