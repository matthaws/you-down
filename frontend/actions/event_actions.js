import * as EventApiUtil from '../util/event_api_util';
import { receiveErrors } from './session_actions';
import hashHistory from '../util/history.js';

export const RECEIVE_EVENT = "RECEIVE_EVENT";
export const RECEIVE_ALL_EVENTS = "RECEIVE_ALL_EVENTS";

export const receiveEvent = (event) => ({
  type: RECEIVE_EVENT,
  event
});

export const receiveAllEvents = (events) => ({
  type: RECEIVE_ALL_EVENTS,
  events
  });

export const fetchEvent = (eventId) => {
  return (dispatch) => {
    return EventApiUtil.fetchEvent(eventId)
      .then( event => dispatch(receiveEvent(event)),
              err => dispatch(receiveErrors(err)))
  };
};

export const fetchAllEvents = () => {
  return (dispatch) => {
    return EventApiUtil.fetchAllEvents()
      .then( events => dispatch(receiveAllEvents(events)))
  };
};

export const createEvent = (event) => {
  return (dispatch) => {
    return EventApiUtil.createEvent(event)
      .then( (event) => {
        hashHistory.push(`/events/${event.id}`);
        return dispatch(receiveEvent(event));
      })
  };
};

export const updateEvent = (event, eventId) => {
  return (dispatch) => {
    return EventApiUtil.updateEvent(event, eventId)
      .then( event => dispatch(receiveEvent(event)),
              err => dispatch(receiveErrors(err)))
  };
};

export const deleteEvent = (eventId) => {
  return (dispatch) => {
    return EventApiUtil.deleteEvent(eventId)
      .then( event => dispatch(receiveEvent({})),
              err => dispatch(receiveErrors(err)))
  };
};

export const joinEvent = (eventId, userId) => {
  return (dispatch) => {
    return EventApiUtil.joinEvent(eventId, userId)
      .then( event => dispatch(receiveEvent(event)),
              err => dispatch(receiveErrors(err)))
  };
};

export const leaveEvent = (eventId) => {
  return (dispatch) => {
    return EventApiUtil.leaveEvent(eventId)
      .then( event => dispatch(receiveEvent(event)))
  };
};

export const searchEvents = (search) => {
  return (dispatch) => {
    return EventApiUtil.searchEvents(search)
      .then( events => dispatch(receiveAllEvents(events)))
  };
};
