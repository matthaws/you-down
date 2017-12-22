import React from "react";
import { Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "../util/route_util";
import NavBar from "./nav/nav_bar/nav_bar.jsx";
import Welcome from "./welcome/welcome.jsx";
import ProfileMain from "./profile/profile_main/profile_main.jsx";
import ProfileEdit from "./profile/profile_edit/profile_edit.jsx";
import GroupShow from "./groups/group_show/group_show.jsx";
import NewGroupForm from "./groups/new_group_form.jsx";
import EventShow from "./events/event_show.jsx";
import SearchContainer from "./search/search_container.jsx";
import CategoryContainer from "./search/category_container.jsx";
import Footer from "./nav/footer/footer.jsx";

const App = () => (
  <div className="master">
    <header>
      <NavBar />
    </header>

    <main>
      <Switch>
        <Route path="/welcome" component={Welcome} />
        <Route path="/search" component={SearchContainer} />
        <Route path="/search/:category" component={CategoryContainer} />
        <ProtectedRoute path="/users/:userId/edit" component={ProfileEdit} />
        <ProtectedRoute path="/users/:userId" component={ProfileMain} />
        <ProtectedRoute path="/groups/:groupId" component={GroupShow} />
        <ProtectedRoute path="/events/:eventId" component={EventShow} />
        <ProtectedRoute path="/newgroup" component={NewGroupForm} />
        <ProtectedRoute path="/" component={Welcome} />
      </Switch>
      <Footer />
    </main>
  </div>
);

export default App;
