import React from "react";
import PropTypes from "prop-types";
import EventEntry from "../../events/event_entry/event_entry.jsx";
import "./group_events.css";

class GroupEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = { location: "upcoming" };
    this.upcoming = this.upcoming.bind(this);
    this.past = this.past.bind(this);
  }

  upcoming() {
    this.setState({ location: "upcoming" });
  }

  past() {
    this.setState({ location: "past" });
  }

  render() {
    const upcomingEventList = [];
    const pastEventList = [];
    const now = Date.now();
    if (this.props.events) {
      this.props.events.forEach(event => {
        const eventDate = new Date(event.date);
        const date = eventDate.toLocaleDateString();
        const time = eventDate.toLocaleTimeString();

        const eventEntry = <EventEntry event={event} date={date} time={time} />;

        if (eventDate.valueOf() < now) {
          pastEventList.push(eventEntry);
        } else {
          upcomingEventList.push(eventEntry);
        }
      });
    }
    let eventList = [];
    if (this.state.location === "past") {
      eventList = pastEventList;
    } else {
      eventList = upcomingEventList;
    }

    return (
      <div className="group-event-list">
        <ul className="mini-menu">
          <li onClick={this.upcoming}>Upcoming Events</li>
          <li onClick={this.past}>Past Events</li>
        </ul>

        <ul>{eventList}</ul>
        <button
          onClick={this.props.changeLocation("createEvent")}
          className="form-button"
        >
          Create a New Event
        </button>
      </div>
    );
  }
}

GroupEvents.propTypes = {
  events: PropTypes.array.isRequired
};

export default GroupEvents;
