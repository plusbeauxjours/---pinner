import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import styled from "styled-components";

import Feed from "../Routes/Feed";
import CardDetail from "../Routes/CardDetail";
import Search from "../Routes/Search";
import UpLoad from "../Routes/UpLoad";
import Explore from "../Routes/Explore";
import UserList from "../Routes/UserList";
import Location from "../Routes/Location";
import Notification from "../Routes/Notification";
import FeedByCity from "../Routes/FeedByCity";
import Footprint from "../Routes/Footprint";
import Profile from "../Routes/Profile";

import Home from "../Routes/Home";
import VerifyPhone from "../Routes/VerifyPhone";
import PhoneLogin from "../Routes/PhoneLogin";

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
      <Route path="/upload" component={UpLoad} />
      <Route path="/explore" exact={true} component={Explore} />
      <Route path="/explore/userlist" component={UserList} />
      <Route path="/location" exact={true} component={Location} />
      <Route path="/notification" component={Notification} />
      <Route path="/city/:cityname" component={FeedByCity} />
      {/* <Route path="/country/:country" component={FeedByCity} /> */}
      <Route path="/:username/footprint" exact={true} component={Footprint} />
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
