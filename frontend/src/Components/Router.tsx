import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Auth from "../Routes/Auth";
import CardDetail from "../Routes/CardDetail";
import EditProfile from "../Routes/EditProfile";
import Explore from "../Routes/Explore";
import Feed from "../Routes/Feed";
// import Home from "../../Routes/Home";
import Profile from "../Routes/Profile";
import Search from "../Routes/Search";
import PhoneLogin from "../Routes/PhoneLogin";
import SocialLogin from "../Routes/SocialLogin";
import VerifyPhone from "../Routes/VerifyPhone";
import Header from "./Header";
import styled from "src/Styles/typed-components";

const Wrapper = styled.div`
  padding-top: 135px;
`;

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
  <Wrapper>
    <Header>
      <Switch>
        <Route path={"/"} exact={true} component={Feed} />
        <Route path={"/p/:id"} exact={true} component={CardDetail} />
        <Route path="/edit-profile" exact={true} component={EditProfile} />
        <Route path="/search" exact={true} component={Search} />
        <Route path="/explore" exact={true} component={Explore} />
        <Route path="/profile/:username" exact={true} component={Profile} />
        <Redirect from={"*"} to={"/"} />
      </Switch>
    </Header>
  </Wrapper>
);

export default AppPresenter;
