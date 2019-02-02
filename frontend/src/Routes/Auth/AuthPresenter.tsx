import React from "react";
import styled from "../../Styles/typed-components";

interface IProps {
  logIn: boolean;
}

const Container = styled.div``;

const AuthPresenter: React.SFC<IProps> = () => <Container>Auth</Container>;

export default AuthPresenter;
