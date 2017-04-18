import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import Modal from 'react-modal';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const store = configureStore();
  window.store = store;
  Modal.setAppElement(document.body);
  ReactDOM.render(<Root store={store} />, root);
})
