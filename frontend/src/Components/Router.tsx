import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import styled from "styled-components";

import Feed from "../Routes/Feed/Feed";
import CardDetail from "../Routes/Detail/CardDetail";
import UpLoad from "../Routes/UpLoad";
import Notification from "../Routes/Notification";
import CityProfile from "../Routes/City/CityProfile";
import CountryProfile from "../Routes/Country/CountryProfile";
import ContinentProfile from "../Routes/Continent/ContinentProfile";
import TripProfile from "../Routes/TripProfile";
import CoffeeDetail from "../Routes/Detail/CoffeeDetail";
import Match from "../Routes/Match";

import UserProfile from "../Routes/User/UserProfile";
import Followers from "../Routes/User/Followers";
import Followings from "../Routes/User/Followings";
import Coffees from "../Routes/User/Coffees";
import Cities from "../Routes/User/Cities";
import Countries from "../Routes/User/Countries";
import PeoplePage from "../Routes/Feed/PeoplePage";
import CoffeesPage from "../Routes/Feed/CoffeesPage";

import CityUsersNow from "../Routes/City/CityUsersNow";
import CityUsersBefore from "../Routes/City/CityUsersBefore";

import ContinentUsersNow from "../Routes/Continent/ContinentUsersNow";
import ContinentUsersBefore from "../Routes/Continent/ContinentUsersBefore";

import CountryUsersNow from "../Routes/Country/CountryUsersNow";
import CountryUsersBefore from "../Routes/Country/CountryUsersBefore";

import Home from "../Routes/Login/Home";
import VerifyPhone from "../Routes/Login/VerifyPhone";
import PhoneLogin from "../Routes/Login/PhoneLogin";

import Header from "./Header";

const Wrapper = styled.div`
  padding-top: 45px;
  min-height: 80vh;
  min-height: 50vh;
`;

const LoggedInPages = () => (
  <Wrapper>
    <Header />
    <Switch>
      <Route path="/" exact={true} component={Feed} />
      <Route path="/people" exact={true} component={PeoplePage} />
      <Route path="/coffees" exact={true} component={CoffeesPage} />
      <Route path="/p/:id" component={CardDetail} />
      <Route path="/match" exact={true} component={Match} />
      <Route path="/notification" component={Notification} />

      <Route
        path="/continent/:continentName/usersNow"
        component={ContinentUsersNow}
      />
      <Route
        path="/continent/:continentName/usersBefore"
        component={ContinentUsersBefore}
      />
      <Route path="/continent/:continentName" component={ContinentProfile} />

      <Route
        path="/country/:countryName/usersNow"
        component={CountryUsersNow}
      />
      <Route
        path="/country/:countryName/usersBefore"
        component={CountryUsersBefore}
      />
      <Route path="/country/:countryName" component={CountryProfile} />

      <Route path="/city/:cityName/usersNow" component={CityUsersNow} />
      <Route path="/city/:cityName/usersBefore" component={CityUsersBefore} />
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
