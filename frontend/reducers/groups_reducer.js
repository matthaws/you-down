import { RECEIVE_GROUP } from '../actions/group_actions';

const groupsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_GROUP:
      return action.group
    default:
      return state;
  }
};

export default groupsReducer;
