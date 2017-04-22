import * as GroupApiUtil from '../util/group_api_util';
import { receiveErrors } from './session_actions';
import { hashHistory } from 'react-router';

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

export const createGroup = (group) => {
  return (dispatch) => {
    return GroupApiUtil.createGroup(group)
      .then( group => dispatch(receiveGroup(group)).then( hashHistory.push(`/groups/${group.id}`)),
              err => dispatch(receiveErrors(err)))
  };
};

export const updateGroup = (group) => {
  return (dispatch) => {
    return GroupApiUtil.updateGroup(group)
      .then( group => dispatch(receiveGroup(group)),
              err => dispatch(receiveErrors(err)))
  };
};

export const deleteGroup = (groupId) => {
  return (dispatch) => {
    return GroupApiUtil.deleteGroup(groupId)
      .then( group => dispatch(receiveGroup({})),
              err => dispatch(receiveErrors(err)))
  };
};

export const joinGroup = (groupId, userId) => {
  return (dispatch) => {
    return GroupApiUtil.joinGroup(groupId, userId)
      .then( hashHistory.push(`/groups/${groupId}`))
  };
};
