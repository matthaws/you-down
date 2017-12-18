import { combineReducers } from "redux";
import session from "./session_reducer";
import users from "./users_reducer";
import groups from "./groups_reducer";
import events from "./event_reducer";

export default combineReducers({ session, users, groups, events });
