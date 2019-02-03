import React from "react";
import styled from "../../Styles/typed-components";
import Input from "../Input";
import Button from "../Button";

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
      <Button
        text={"Log in"}
        active={username !== "" && password !== ""}
        onClick={any}
      />
    </form>
  </Container>
);

export default LogInPresenter;
