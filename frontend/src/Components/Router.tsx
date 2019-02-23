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
import Profile from "../Routes/Profile";
import CardDetail from "../Routes/CardDetail";
import Search from "../Routes/Search";
import Location from "../Routes/Location";
import Notification from "../Routes/Notification";

import VerifyPhone from "../Routes/VerifyPhone";
import PhoneLogin from "../Routes/PhoneLogin";
import FeedByLocation from "../Routes/FeedByLocation";

import Explore from "../Routes/Explore";
import Header from "./Header";

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
      <Route path="/search" component={Search} />

      <Route path="/explore" component={Explore} />
      <Route path="/location" exact={true} component={Location} />
      <Route path="/notification" component={Notification} />
      <Route path="/location/:cityname" component={FeedByLocation} />
      <Route path="/:username" component={Profile} />
      <Redirect from="*" to="/" />
    </Switch>
  </Wrapper>
);

const LoggedOutPages = () => (
  <Switch>
    <Route path="/" exact={true} component={Home} />
    <Route path="/verify-phone" component={VerifyPhone} />
    <Route path="/phone-login" component={PhoneLogin} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) => (
  <Router>{isLoggedIn ? <LoggedInPages /> : <LoggedOutPages />}</Router>
);

export default AppRouter;
