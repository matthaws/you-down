import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Category = props => (
  <Link to={props.path}>
    <li>
      <ul>
        <li>
          <img src={props.image} />
        </li>
        <li>{props.title}</li>
      </ul>
    </li>
  </Link>
);

Category.propTypes = {
  path: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string
};

export default Category;
