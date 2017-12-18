import React from 'react';

const GroupWelcome = (props) => {
  return (
    <li>
      <div className="show-main group-welcome">
        <h1>Welcome, {props.user.full_name}!</h1>
        <p>You're now officially one of the {props.group.member_moniker} of our group.</p>
        <p>We hope to see you at one of our upcoming events.</p>
      </div>
    </li>
  );
};

export default GroupWelcome;
