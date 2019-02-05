import React from "react";
import styled from "../../Styles/typed-components";
import Input from "../Input";
import Button from "../Button";
import Helmet from "react-helmet";

const Container = styled.div``;

const SInput = styled(Input)`
  margin-bottom: 10px;
  &:nth-child(2) {
    margin-bottom: 15px;
  }
`;

interface IProps {
  username: string;
  password: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LogInPresenter: React.SFC<IProps> = ({
  username,
  password,
  onChangeHandler
}) => (
  <Container>
    <Helmet>
      <title> Log In . Pinner</title>
    </Helmet>
    <form>
      <SInput
        placeholder="Username"
        value={username}
        name="username"
        onChange={onChangeHandler}
      />
      <SInput
        placeholder="Password"
        value={password}
        name="password"
        type="password"
        onChange={onChangeHandler}
      />
      <Button text={"Log in"} onClick={null} />
    </form>
  </Container>
);

export default LogInPresenter;
