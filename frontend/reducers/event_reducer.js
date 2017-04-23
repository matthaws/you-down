import { RECEIVE_EVENT } from '../actions/event_actions';

const eventsReducer = (state = {}, action ) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_EVENT:
      return action.event;
    default:
      return state;
  }
};

export default eventsReducer;
