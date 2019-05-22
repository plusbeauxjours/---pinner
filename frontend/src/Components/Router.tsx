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
import UpLoad from "../Routes/UpLoad";
import UserList from "../Routes/UserList";
import Notification from "../Routes/Notification";
import CityProfile from "../Routes/CityProfile";
import CountryProfile from "../Routes/CountryProfile";
import ContinentProfile from "../Routes/ContinentProfile";
import TripProfile from "../Routes/TripProfile";
import CoffeeDetail from "../Routes/CoffeeDetail";
import Match from "../Routes/Match";

import UserProfile from "../Routes/UserProfile";
import Followers from "../Routes/Followers";
import Followings from "../Routes/Followings";
import Coffees from "../Routes/Coffees";
import Cities from "../Routes/Cities";
import Countries from "../Routes/Countries";
import People from "../Routes/People";

import Home from "../Routes/Home";
import VerifyPhone from "../Routes/VerifyPhone";
import PhoneLogin from "../Routes/PhoneLogin";

import Header from "./Header";

const Wrapper = styled.div`
  padding-top: 55px;
  min-height: 80vh;
  min-height: 50vh;
`;

const LoggedInPages = () => (
  <Wrapper>
    <Header />
    <Switch>
      <Route path="/" exact={true} component={Feed} />
      <Route path="/people" exact={true} component={People} />
      <Route path="/coffees" exact={true} component={People} />
      <Route path="/p/:id" component={CardDetail} />
      <Route path="/match" exact={true} component={Match} />
      <Route path="/explore/userlist" component={UserList} />
      <Route path="/notification" component={Notification} />
      <Route path="/continent/:continentName" component={ContinentProfile} />
      <Route path="/country/:countryName" component={CountryProfile} />
      <Route path="/city/:cityName/:duration" component={TripProfile} />
      <Route path="/city/:cityName" component={CityProfile} />
      <Route path="/c/:id" component={CoffeeDetail} />
      <Route path="/:username/upload" component={UpLoad} />
      <Route path="/:username/countries" component={Countries} />
      <Route path="/:username/cities" component={Cities} />
      <Route path="/:username/coffees" component={Coffees} />
      <Route path="/:username/followings" component={Followings} />
      <Route path="/:username/followers" component={Followers} />
      <Route path="/:username" component={UserProfile} />
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
