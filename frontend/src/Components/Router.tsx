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
import NotFound from "./NotFound";

import LoggedInPages from "./LoggedInPages";

interface IProps {
  isLoggedIn: boolean;
  history: any;
  onUpdate: () => void;
}

const LoggedOutPages = () => (
  <Switch>
    <Route path="/" exact={true} component={Home} />
    <Route path="/verify-phone" component={VerifyPhone} />
    <Route path="/phone-login" component={PhoneLogin} />
    <Route path="/404" exact={true} component={NotFound} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter: React.FunctionComponent<IProps> = ({
  isLoggedIn,
  history,
  onUpdate
}) => {
  return <Router>{isLoggedIn ? <LoggedInPages /> : <LoggedOutPages />}</Router>;
};

export default AppRouter;
