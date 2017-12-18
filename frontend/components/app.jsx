import React from "react";
import { Route, Redirect, Switch, Link, withRouter } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import NavBar from "./nav/nav_bar.jsx";
import Welcome from "./welcome/welcome.jsx";
import ProfileMain from "./profile/profile-main.jsx";
import ProfileEdit from "./profile/profile-edit.jsx";
import GroupShow from "./groups/group_show.jsx";
import NewGroupForm from "./groups/new_group_form.jsx";
import EventShow from "./events/event_show.jsx";
import SearchContainer from "./search/search_container.jsx";
import CategoryContainer from "./search/category_container.jsx";
import Footer from "./nav/footer.jsx";

const App = () => (
  <div className="master">
    <header>
      <NavBar />
    </header>

    <main>
      <Switch>
        <Route exact path="/welcome" component={Welcome} />
        <Route exact path="/search" component={SearchContainer} />
        <Route exact path="/search/:category" component={CategoryContainer} />
        <ProtectedRoute exact path="/" component={Welcome} />
        <ProtectedRoute exact path="/users/:userId" component={ProfileMain} />
        <ProtectedRoute exact path="/users/:userId/edit" component={ProfileEdit} />
        <ProtectedRoute exact path="/groups/:groupId" component={GroupShow} />
        <ProtectedRoute exact path="/events/:eventId" component={EventShow} />
        <ProtectedRoute exact path="/newgroup" component={NewGroupForm} />
      </Switch>
      <Footer />
    </main>
  </div>
);

export default App;
