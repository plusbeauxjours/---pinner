import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import styled from "styled-components";
import Home from "../Routes/Home";
import Feed from "../Routes/Feed";
import EditProfile from "../Routes/EditProfile";
import Profile from "../Routes/Profile";
import CardDetail from "../Routes/CardDetail";
import Search from "../Routes/Search";
import VerifyPhone from "../Routes/VerifyPhone";
import Explore from "../Routes/Explore";
import Header from "./Header";
import Location from "./Location";

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
      <Route path="/verify-phone" component={VerifyPhone} />
      <Route path="/explore" component={Explore} />
      <Route path="/location" component={Location} />
      <Route path="/:username" component={Profile} />
      <Redirect from="*" to="/" />
    </Switch>
  </Wrapper>
);

const LoggedOutPages = () => (
  <Switch>
    <Route path="/" exact={true} component={Home} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) => (
  <Router>{isLoggedIn ? <LoggedInPages /> : <LoggedOutPages />}</Router>
);

export default AppRouter;
