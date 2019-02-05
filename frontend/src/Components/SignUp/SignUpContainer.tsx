import React from "react";
import SignUpPresenter from "./SignUpPresenter";

interface IState {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

class SignUpContainer extends React.Component<any, IState> {
  public state = {
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: ""
  };

  public render() {
    const { email, firstName, lastName, username, password } = this.state;
    return (
      <SignUpPresenter
        email={email}
        firstName={firstName}
        lastName={lastName}
        username={username}
        password={password}
        onChangeHandler={this.onChangeHandler}
        canSubmit={
          email !== "" &&
          firstName !== "" &&
          lastName !== "" &&
          username !== "" &&
          password !== ""
        }
      />
    );
  }

  public onChangeHandler: React.ChangeEventHandler<
    HTMLInputElement
  > = async event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
}

export default SignUpContainer;
