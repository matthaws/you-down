import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fetchAllGroups } from '../../actions/group_actions';
import { Link } from 'react-router';
import GroupSearch from './group_search';

class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {location: "groups"}
  }

  changeLocation(location) {
    return () => {
      this.setState({ location })
    }
  }

  render() {
    let body;
    switch (this.state.location) {
      case "groups":
        body = <GroupSearch />
        break;
      case "events":
        body = <div />
    }
    let groupClass = this.state.location === "groups" ? "selected-button" : "search-button";
    let eventClass = this.state.location === "events" ? "selected-button" : "search-button";

    return (
      <div className="search-main">
        <div className="search-header">
          <h1>Find the perfect group</h1>
          <div className="search-bar">
            <input type="text" onChange={this.handleSearchChange} onKeyPress={this.handleKeyPress} />
            <ul>
              <li><button onClick={this.changeLocation("groups")} className={groupClass}>Groups</button></li>
              <li><button onClick={this.changeLocation("events")} className={eventClass}>Events</button></li>
            </ul>
          </div>
        </div>
        {body}
      </div>

    )
  }
}


export default SearchContainer;
