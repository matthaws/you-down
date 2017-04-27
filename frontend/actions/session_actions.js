import * as SessionApiUtil from '../util/session_api_util';
import { hashHistory } from 'react-router';


export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

export const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser
  };
};

export const receiveErrors = (errors) => {
  return {
    type: RECEIVE_ERRORS,
    errors
  };
};

export const login = (user) => {
  return (dispatch) => {
    return SessionApiUtil.login(user)
      .then( user => dispatch(receiveCurrentUser(user)),
        err => dispatch(receiveErrors(err))).then( () => hashHistory.push('/search'))
  };
};

export const logout = () => {
  return (dispatch) => {
    return SessionApiUtil.logout()
      .then( user => dispatch(receiveCurrentUser(user)),
        err => dispatch(receiveErrors(err)))
  };
};

export const signup = (user) => {
  return (dispatch) => {
    return SessionApiUtil.signup(user)
      .then( user => dispatch(receiveCurrentUser(user)),
        err => dispatch(receiveErrors(err)))
  };
};
