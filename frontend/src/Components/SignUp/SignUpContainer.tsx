import React from "react";
import SignUpPresenter from "./SignUpPresenter";
import { Mutation, MutationFn } from "react-apollo";
import { localSignUp, localSignUpVariables } from "../../types/api";
import { SIGNUP_MUTATION } from "./SignUpQueries";
import { LOG_USER_IN } from "../../sharedQueries.local";

interface IState {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

class LogUserInMutation extends Mutation {}
class SignUpMutation extends Mutation<localSignUp, localSignUpVariables> {}

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
      <LogUserInMutation mutation={LOG_USER_IN}>
        {logUserIn => (
          <SignUpMutation
            mutation={SIGNUP_MUTATION}
            variables={{ email, firstName, password, username, lastName }}
            onCompleted={({ createAccount: { token } }) =>
              logUserIn({ variables: { token } })
            }
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
        )}
      </LogUserInMutation>
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
