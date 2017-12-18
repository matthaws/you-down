import {
  login,
  logout,
  signup,
  receiveCurrentUser,
  receiveErrors
} from "../actions/session_actions";
import {
  RECEIVE_CURRENT_USER,
  RECEIVE_ERRORS
} from "../actions/session_actions";
import { RECEIVE_GROUP, RECEIVE_JOINED_GROUP } from "../actions/group_actions";
import { RECEIVE_USER } from "../actions/user_actions";

const initialState = { currentUser: null, errors: {} };

const sessionReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { currentUser: action.currentUser });
    case RECEIVE_ERRORS:
      return Object.assign({}, state, { errors: action.errors });
    case RECEIVE_GROUP:
      if (action.user) {
        return Object.assign({}, state, { currentUser: action.user });
      } else {
        return state;
      }
    case RECEIVE_JOINED_GROUP:
      return Object.assign({}, state, { currentUser: action.user });
    case RECEIVE_USER:
      if (action.user.id === state.currentUser.id) {
        return Object.assign({}, state, { currentUser: action.user });
      } else;
      return state;
    default:
      return state;
  }
};

export default sessionReducer;
