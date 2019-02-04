import React from "react";
import styled from "styled-components";
import Input from "../Input/Input";
import Button from "../Button/Button";

const Container = styled.div``;

const SInput = styled(Input)`
  margin-bottom: 10px;
  &:nth-child(5) {
    margin-bottom: 15px;
  }
`;

interface IProps {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignUpPresenter: React.SFC<IProps> = ({
  email,
  firstName,
  lastName,
  username,
  password,
  onChangeHandler
}) => (
  <Container>
    <form>
      <SInput
        placeholder="Email"
        value={email}
        name="email"
        type={"email"}
        onChange={onChangeHandler}
      />
      <SInput
        placeholder="First Name"
        value={firstName}
        name="firstName"
        onChange={onChangeHandler}
      />
      <SInput
        placeholder="Last Name"
        value={lastName}
        name="lastName"
        onChange={onChangeHandler}
      />
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
        text={"Sign up"}
        active={
          username !== "" &&
          password !== "" &&
          email !== "" &&
          firstName !== "" &&
          lastName !== ""
        }
      />
    </form>
  </Container>
);

export default SignUpPresenter;
