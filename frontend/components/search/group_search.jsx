import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fetchAllGroups, fetchGroupsByCategory } from '../../actions/group_actions';
import { Link } from 'react-router';

class GroupSearch extends React.Component {
  constructor(props) {
    super(props);
    let category = ""
    if (this.props.category) {
      category = this.props.category
    }
    this.state = {groups: [], category}
  }

  componentDidMount() {
    if (this.state.category !== "") {
      this.props.fetchGroupsByCategory(this.state.category)
    } else {
    this.props.fetchAllGroups()
    }
  }


  componentWillReceiveProps(nextProps) {
    this.setState({groups: nextProps.groups})
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
          <img src={group_pic} />
          <li><h1>{group.group_name}</h1></li>
          <li>We're {group.members.length} {group.member_moniker}</li>
        </ul>
      </Link>
      </li>
    )
  })
}
  return (<ul className="result-list">
    {groupList}
  </ul>);
  }
}

const mapStateToProps = (state) => {
  return {
    groups: state.groups
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllGroups: () => dispatch(fetchAllGroups()),
    fetchGroupsByCategory: (category) => dispatch(fetchGroupsByCategory(category))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupSearch);
