import * as UserApiUtil from "../util/user_api_util";
import { receiveErrors } from "./session_actions";

export const RECEIVE_USER = "RECEIVE_USER";

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

export const editUser = user => {
  return dispatch => {
    return UserApiUtil.editUser(user).then(
      user => dispatch(receiveUser(user)),
      err => dispatch(receiveErrors(err))
    );
  };
};

export const fetchUser = userId => {
  return dispatch => {
    return UserApiUtil.fetchUser(userId).then(
      user => dispatch(receiveUser(user)),
      err => dispatch(receiveErrors(err))
    );
  };
};
