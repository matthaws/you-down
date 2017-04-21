import React from 'react';

const GroupDetails = (props) => (
  <li><div className="show-main">
    <h1>About Us:</h1>
    {props.group.description}

    <div className="roll-call">
      <h1>We are a group of {props.group.member_moniker}</h1>
    </div>
  </div></li>
)

export default GroupDetails;
