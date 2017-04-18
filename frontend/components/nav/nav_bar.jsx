import React from 'react';
import ReactDOM from 'react-dom';

class NavBar extends React.Component {




  render() {
    return (
      <nav className="top-nav">
        <ul>
          <li>Create a Group</li>
          <li id="logo">YouDown?</li>
          <li>
            <ul className="topright">
              <li>Log in</li>
              <li className="signup-button">Sign up</li>
            </ul>
          </li>
        </ul>
      </nav>
    )
  }
}

export default NavBar;
