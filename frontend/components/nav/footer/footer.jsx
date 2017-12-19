import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => (
  <nav id="footer">
    <div>
      <ul>
        <Link to="/newgroup">
          <li>Start a Group</li>
        </Link>
        <Link to="/welcome">
          <li>Home</li>
        </Link>
      </ul>
      <ul>
        <li>Matthew Haws</li>
        <a href="https://github.com/matthaws/you-down">
          <li>Github</li>
        </a>
        <a href="https://www.linkedin.com/in/matt-haws/">
          <li>LinkedIn</li>
        </a>
        <li> </li>
      </ul>
    </div>
  </nav>
);

export default Footer;
