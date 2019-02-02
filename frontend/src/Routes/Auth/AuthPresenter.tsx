import React from "react";
import Wrapper from "../../Components/Wrapper/Wrapper";

interface IProps {
  logIn: boolean;
}

const AuthPresenter: React.SFC<IProps> = () => <Wrapper>Auth</Wrapper>;

export default AuthPresenter;
