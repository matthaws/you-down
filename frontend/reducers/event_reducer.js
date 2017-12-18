import { RECEIVE_EVENT, RECEIVE_ALL_EVENTS } from '../actions/event_actions';

const eventsReducer = (state = {}, action ) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_EVENT:
      return action.event;
    case RECEIVE_ALL_EVENTS:
      return action.events;
    default:
      return state;
  }
};

export default eventsReducer;
