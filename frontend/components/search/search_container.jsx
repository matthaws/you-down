import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fetchAllGroups, searchGroups } from '../../actions/group_actions';
import { Link } from 'react-router';
import GroupSearch from './group_search';

class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {location: "groups", search: ""}
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeLocation(location) {
    return () => {
      this.setState({ location })
    }
  }

  handleSubmit() {
    if (this.state.search === "") {
      this.props.fetchAllGroups();
    } else {
    this.props.searchGroups(this.state.search)
      }
  }

  handleSearchChange(e) {
    this.setState({search: e.target.value})
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmit()
    }
  }

  render() {
    let grouphidden;
    let eventhidden;
    switch (this.state.location) {
      case "groups":
        grouphidden = "false";
        eventhidden = "true";
        break;
      case "events":
        grouphidden = "true";
        eventhidden = "false";
    }

    let group = <GroupSearch hidden={grouphidden} />


    let groupClass = this.state.location === "groups" ? "selected-button" : "search-button";
    let eventClass = this.state.location === "events" ? "selected-button" : "search-button";

    return (
      <div className="search-main">
        <div className="search-header">
          <h1>Find the perfect group</h1>
          <div className="search-bar">
            <input type="text" onChange={this.handleSearchChange} onKeyPress={this.handleKeyPress} /> <p>Search</p>
            <ul>
              <li><button onClick={this.changeLocation("groups")} className={groupClass}>Groups</button></li>
              <li><button onClick={this.changeLocation("events")} className={eventClass}>Events</button></li>
            </ul>
            <ul></ul>
          </div>
        </div>
        {group}
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    groups: state.groups,
    events: state.events
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllGroups: () => dispatch(fetchAllGroups()),
    searchGroups: (search) => dispatch(searchGroups(search))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
