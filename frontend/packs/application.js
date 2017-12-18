import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import configureStore from "../store/store";
import Root from "../components/root.jsx";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
  } else {
    store = configureStore();
  }
  window.store = store;
  Modal.setAppElement(document.body);
  ReactDOM.render(<Root store={store} />, root);
});
