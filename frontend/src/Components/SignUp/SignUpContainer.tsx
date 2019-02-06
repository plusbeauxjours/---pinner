import React from "react";
import SignUpPresenter from "./SignUpPresenter";
import { Mutation, MutationFn } from "react-apollo";
import { signUp, signUpVariables } from "../../types/api";
import { SIGNUP_MUTATION } from "./SignUpQueries";

interface IState {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

class SignUpMutation extends Mutation<signUp, signUpVariables> {}

class SignUpContainer extends React.Component<any, IState> {
  public signUpFn: MutationFn;
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
      <SignUpMutation
        mutation={SIGNUP_MUTATION}
        variables={{ email, firstName, password, username, lastName }}
      >
        {(signUpFn, { loading }) => (
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
            signUpFn={signUpFn}
            loading={loading}
          />
        )}
      </SignUpMutation>
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
