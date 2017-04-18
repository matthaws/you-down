import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import Welcome from './welcome/welcome';

const _redirectIfLoggedIn = (nextState, replace) => {
  if (store.getState().session.currentUser) {
    replace('/');
  }
}

const Root = ({ store }) => (
  <Provider store={ store } >
    <Router history={ hashHistory }>
      <Route path='/' component={ App }>
        <Route path='welcome' component={ Welcome } />
      </Route>
    </Router>
  </Provider>
)


export default Root;
