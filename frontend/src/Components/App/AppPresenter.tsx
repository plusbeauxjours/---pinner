import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// import Login from "../../Routes/Login";
import Auth from "../../Routes/Auth";
import CardDetail from "../../Routes/CardDetail";
import EditProfile from "../../Routes/EditProfile";
import Explore from "../../Routes/Explore";
import Feed from "../../Routes/Feed";
// import Home from "../../Routes/Home";
import Profile from "../../Routes/Profile";
import Search from "../../Routes/Search";
import PhoneLogin from "../../Routes/PhoneLogin";
import SocialLogin from "../../Routes/SocialLogin";
import VerifyPhone from "../../Routes/VerifyPhone";

interface IProps {
  isLoggedIn: boolean;
}

const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) => (
  <BrowserRouter>
    {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
  </BrowserRouter>
);

const LoggedOutRoutes: React.SFC = () => (
  <Switch>
    <Route path={"/"} exact={true} component={Auth} />
    <Route path={"/phone-login"} component={PhoneLogin} />
    <Route path={"/verify-phone"} component={VerifyPhone} />
    <Route path={"/social-login"} component={SocialLogin} />
    <Redirect from={"*"} to={"/"} />
  </Switch>
);

const LoggedInRoutes: React.SFC = () => (
  <Switch>
    <Route path={"/"} exact={true} component={Feed} />
    <Route path={"/p/:id"} component={CardDetail} />
    <Route path="/edit-profile" component={EditProfile} />
    <Route path="/search" component={Search} />
    <Route path="/explore" component={Explore} />
    <Route path="/:username" component={Profile} />
    <Redirect from={"*"} to={"/"} />
  </Switch>
);

export default AppPresenter;
