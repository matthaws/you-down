import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class GroupMembers extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
    <li>
      <div className="show-main">
        <h1> Members: </h1>
      </div>
    </li>
    )
  }
}

export default GroupMembers
