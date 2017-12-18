import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllEvents } from '../../actions/event_actions';

class EventSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { events: this.props.events }
  }

  componentDidMount() {
    this.props.fetchAllEvents();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({events: nextProps.events})
  }

  render() {
    let eventList = [];
    let currentDate = Date.now();
    let newDate;
    if (this.state.events && this.state.events[0]) {
      this.state.events.forEach ( event => {
        let eventDate = new Date(event.date)
        if (currentDate !== eventDate.toDateString()){
          currentDate = eventDate.toDateString();
          newDate = (<h1 key={event.id} className="event-date">{eventDate.toDateString()}</h1>);
        } else {
          newDate = (<div />)
        }
        let time = eventDate.getHours() > 12 ? "PM" : "AM";
        let minutes = eventDate.getMinutes();
        if (minutes === 0) {
          minutes = "00";
        }
        eventList.push(
          <li key={event.id} >
          {newDate}
          <Link to={`/events/${event.id}`}>
          <ul className="event-search-entry">
            <li>{eventDate.getHours() % 12}:{minutes} {time}</li>
            <li>
              <ul className="event-details-entry">
                <li className="group-name">{event.group.group_name}</li>
                <li className="event-name">{event.event_name}</li>
                <li className="attendee-num">{event.attendees.length} going</li>
              </ul>
            </li>
          </ul>
        </Link>
      </li>)
      })
    }

    let classname = "";
    if (this.props.hidden === "true") {
      classname = "hidden-list"
    };

    return (
      <div className={classname}>
        <ul className="event-result-list">
          {eventList}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllEvents: () => dispatch(fetchAllEvents())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventSearch);
