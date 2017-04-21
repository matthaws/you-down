import * as GroupApiUtil from '../util/group_api_util';
import { receiveErrors } from './session_actions';

export const RECEIVE_GROUP = "RECEIVE_GROUP";

export const receiveGroup = (group) => ({
  type: RECEIVE_GROUP,
  group
});

export const fetchGroup = (groupId) => {
  return (dispatch) => {
    return GroupApiUtil.fetchGroup(groupId)
      .then( group => dispatch(receiveGroup(group)),
              err => dispatch(receiveErrors(err)))
  };
};
