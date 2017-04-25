import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fetchAllGroups } from '../../actions/group_actions';
import { Link } from 'react-router';

class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {groups: [], events: []}
  }


  componentDidMount() {
    this.props.fetchAllGroups();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({groups: nextProps.groups, events: nextProps.events})
  }


  render() {
    let groupList = [];
    if (this.props.groups[0]) {
    this.state.groups.forEach( group => {
      let group_pic = window.images.default_group
      if (group.group_pic !== "/DEFAULT") {
        group_pic = group.group_pic
      }
      groupList.push(
        <li key={group.id}>
          <Link to={`/groups/${group.id}`} >
          <ul className="result-entry">
            <li><img src={group_pic} /></li>
            <li><h1>{group.group_name}</h1><br />{group.location_name}</li>
            <li>{group.members.length} {group.member_moniker}</li>
          </ul>
        </Link>
        </li>
      )
    })
  }
    return (
      <div className="search-main">
        <div className="search-header">
          <h1>Find the perfect group</h1>
        </div>
          <ul className="result-list">
            {groupList}
          </ul>
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
    fetchAllGroups: () => dispatch(fetchAllGroups())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
