import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class Footer extends React.Component {

  render() {
    return (
      <nav id="footer">
        <div>
        <ul>
          <Link to="/newgroup"><li>Start a Group</li></Link>
          <Link to="/welcome"><li>Home</li></Link>
        </ul>
        <ul>
          <li>Matthew Haws</li>
          <a href="https://github.com/matthaws/you-down"><li>Github</li></a>
          <a href="https://www.linkedin.com/in/matt-haws/"><li>LinkedIn</li></a>
          <li>   </li>
        </ul>
      </div>
      </nav>
    )
  }
}

export default Footer;
