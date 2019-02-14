import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import styled from "styled-components";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import EditProfile from "../Routes/EditProfile";
import Profile from "../Routes/Profile";
import CardDetail from "../Routes/CardDetail";
import Search from "../Routes/Search";
import Explore from "../Routes/Explore";
import Header from "./Header";
import index from "./Location";

const Wrapper = styled.div`
  padding-top: 135px;
  min-height: 80vh;
  min-height: 50vh;
`;

const LoggedInPages = () => (
  <Wrapper>
    <Header />
    <Switch>
      <Route path="/" exact={true} component={Feed} />
      <Route path="/p/:id" component={CardDetail} />
      <Route path="/edit-profile" component={EditProfile} />
      <Route path="/search" component={Search} />
      <Route path="/explore" component={Explore} />
      <Route path="/:username" component={Profile} />
      <Route path="/location" component={index} />
      <Redirect from="*" to="/" />
    </Switch>
  </Wrapper>
);

const LoggedOutPages = () => (
  <Switch>
    <Route path="/" exact={true} component={Auth} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) => (
  <Router>{isLoggedIn ? <LoggedInPages /> : <LoggedOutPages />}</Router>
);

export default AppRouter;
