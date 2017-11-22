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
import Footer from './nav/footer';

const App = () => (
  <div className="master">
    <header>
      <NavBar />
    </header>

    <main>
      <Switch>
        <Route exact path="/welcome" component={ Welcome } />
        <Route exact path='search' component={ SearchContainer } />
        <Route exact path='search/:category' component={ CategoryContainer} />
        <ProtectedRoute exact path="/" component={ Welcome } />
        <ProtectedRoute exact path='users/:userId' component={ ProfileMain } />
        <ProtectedRoute exact path='users/:userId/edit' component={ ProfileEdit } />
        <ProtectedRoute exact path='groups/:groupId' component={ GroupShow } />
        <ProtectedRoute exact path='events/:eventId' component={ EventShow } />
        <ProtectedRoute exact path='newgroup' component={ NewGroupForm } />
      </Switch>
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
);

export default App;
