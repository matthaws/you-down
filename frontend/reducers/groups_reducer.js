import { RECEIVE_GROUP, RECEIVE_ALL_GROUPS } from '../actions/group_actions';

const groupsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_GROUP:
      return action.group;
    case RECEIVE_ALL_GROUPS:
      return action.groups;
    default:
      return state;
  }
};

export default groupsReducer;
