import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import App from "./app.jsx";

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
