import React from 'react';
import { Route, Redirect, Switch, Link, withRouter } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import NavBar from './nav/nav_bar';
import Welcome from './welcome/welcome';
import ProfileMain from './profile/profile-main';
import ProfileEdit from './profile/profile-edit';
import GroupShow from './groups/group_show';
import NewGroupForm from './groups/new_group_form';
import EventShow from './events/event_show';
import SearchContainer from './search/search_container';
import CategoryContainer from './search/category_container';

const App = () => (
  <div className="master">
    <header>
      <NavBar />
    </header>

    <main>
      <Switch>
        <Route path="/welcome" component={ Welcome } />
        <ProtectedRoute path="/" component={ Welcome } />
        <ProtectedRoute path='users/:userId' component={ ProfileMain } />
        <ProtectedRoute path='users/:userId/edit' component={ ProfileEdit } />
        <ProtectedRoute path='groups/:groupId' component={ GroupShow } />
        <ProtectedRoute path='events/:eventId' component={ EventShow } />
        <ProtectedRoute path='newgroup' component={ NewGroupForm } />
        <Route path='search' component={ SearchContainer } />
        <Route path='search/:category' component={ CategoryContainer} />
      </Switch>
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
);

export default App;

// const Root = ({ store }) => (
//   <Provider store={ store } >
//     <Router history={ hashHistory }>
//       <Route path='/' component={ App }>
//         <IndexRoute component={ Welcome } />
//         <Route path='welcome' component={ Welcome }  />
//
//       </Route>
//     </Router>
//   </Provider>
// )
