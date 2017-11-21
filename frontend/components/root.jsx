// import React from 'react';
// import { Provider } from 'react-redux';
// import { Router, Route, IndexRoute, hashHistory } from 'react-router';
// import App from './app';
// import Welcome from './welcome/welcome';
// import ProfileMain from './profile/profile-main';
// import ProfileEdit from './profile/profile-edit';
// import GroupShow from './groups/group_show';
// import NewGroupForm from './groups/new_group_form';
// import EventShow from './events/event_show';
// import SearchContainer from './search/search_container';
// import CategoryContainer from './search/category_container';
//
// const _redirectIfLoggedIn = (nextState, replace) => {
//   if (store.getState().session.currentUser) {
//     replace('/search');
//   }
// }
//
// const _redirectIfNotLoggedIn = (nextState, replace) => {
//   if (store.getState().session.currentUser && store.getState().session.currentUser.id) {
//
//   } else {
//     replace('/welcome')
//   }
// }
//
// const _redirectEntry = (nextState, replace) => {
//   if (store.getState().session.currentUser) {
//     replace('/search')
//   } else {
//     replace('/welcome')
//   };
// };
//
// const Root = ({ store }) => (
//   <Provider store={ store } >
//     <Router history={ hashHistory }>
//       <Route path='/' component={ App }>
//         <IndexRoute component={ Welcome } />
//         <Route path='welcome' component={ Welcome }  />
//         <Route path='users/:userId'  onEnter={ _redirectIfNotLoggedIn} component={ ProfileMain } />
//         <Route path='users/:userId/edit'  onEnter={ _redirectIfNotLoggedIn} component={ ProfileEdit } />
//         <Route path='groups/:groupId'  onEnter={ _redirectIfNotLoggedIn} component={ GroupShow } />
//         <Route path='events/:eventId'  onEnter={ _redirectIfNotLoggedIn} component={ EventShow } />
//         <Route path='newgroup' onEnter={ _redirectIfNotLoggedIn} component={ NewGroupForm } />
//         <Route path='search' component={ SearchContainer } />
//         <Route path='search/:category' component={ CategoryContainer} />
//       </Route>
//     </Router>
//   </Provider>
// )

import React from 'react';
import {Provider} from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './app';


const Root = ({store}) => {
  return (
    <Provider store={store} >
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  );
}

export default Root;
