import React from "react";
import { Link } from "react-router-dom";
import LocationPic from "../../../packs/images/location.png";
import "./event_entry.css";

const EventEntry = ({ event, date, time }) => (
  <ul key={event.id}>
    <li className="event-list-item">
      <ul>
        <Link to={`/events/${event.id}`}>
          <li>
            <h2>{event.event_name}</h2>
          </li>
        </Link>
        <li>
          <img src={LocationPic} />
          <h3>
            <a href={`http://maps.google.com/?q=${event.location_address}`}>
              {event.location_name}
              <br />
              {event.location_address}
            </a>
          </h3>
        </li>
      </ul>
      <ul>
        <li>{event.attendeeNum} attending</li>
        <li>
          {date}, {time}
        </li>
      </ul>
    </li>
    <p className="event-description">{event.description}</p>
  </ul>
);

export default EventEntry;
