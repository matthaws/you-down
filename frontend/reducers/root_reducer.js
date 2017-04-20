import { combineReducers } from 'redux';
import  session  from './session_reducer';
import users from './users_reducer';

export default combineReducers({session, users});
