import React from "react";
import styled from "../../typed-components";
import { RouteComponentProps } from "react-router";

const Container = styled.div`
  height: 100vh;
`;

interface IProps extends RouteComponentProps<any> {}

const LoginPresenter: React.SFC<IProps> = () => <Container />;

export default LoginPresenter;
