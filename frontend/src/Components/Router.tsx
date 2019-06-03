import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Home from "../Routes/Login/Home";
import VerifyPhone from "../Routes/Login/VerifyPhone";
import PhoneLogin from "../Routes/Login/PhoneLogin";

import LoggedInPages from "./LoggedInPages";

const LoggedOutPages = () => (
  <Switch>
    <Route path="/" exact={true} component={Home} />
    <Route path="/verify-phone" component={VerifyPhone} />
    <Route path="/phone-login" component={PhoneLogin} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) => {
  return <Router>{isLoggedIn ? <LoggedInPages /> : <LoggedOutPages />}</Router>;
};

export default AppRouter;
