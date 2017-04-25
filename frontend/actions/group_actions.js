import * as GroupApiUtil from '../util/group_api_util';
import { receiveErrors } from './session_actions';
import { hashHistory } from 'react-router';

export const RECEIVE_GROUP = "RECEIVE_GROUP";
export const RECEIVE_ALL_GROUPS = "RECEIVE_ALL_GROUPS";

export const receiveGroup = (group, user) => ({
  type: RECEIVE_GROUP,
  group,
  user
});

export const receiveAllGroups = (groups) => ({
  type: RECEIVE_ALL_GROUPS,
  groups
})

export const fetchGroup = (groupId) => {
  return (dispatch) => {
    return GroupApiUtil.fetchGroup(groupId)
      .then( group => dispatch(receiveGroup(group)),
              err => dispatch(receiveErrors(err)))
  };
};

export const fetchAllGroups = () => {
  return (dispatch) => {
    return GroupApiUtil.fetchAllGroups()
      .then( groups => dispatch(receiveAllGroups(groups)))
  };
};

export const createGroup = (group) => {
  return (dispatch) => {
    return GroupApiUtil.createGroup(group)
      .then( group, user => dispatch(receiveGroup(group, user)),
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
      .then( user => dispatch(receiveGroup({}, user)),
              err => dispatch(receiveErrors(err)))
  };
};

export const joinGroup = (groupId, userId) => {
  return (dispatch) => {
    return GroupApiUtil.joinGroup(groupId, userId)
      .then( hashHistory.push(`/groups/${groupId}`))
  };
};

export const leaveGroup = (groupId) => {
  return (dispatch) => {
    return GroupApiUtil.leaveGroup(groupId)
  };
};
