import React from "react";
import LogInPresenter from "./LogInPresenter";
import { Mutation, MutationFn } from "react-apollo";
import { logIn, logInVariables } from "../../types/api";
import { LOGIN_MUTATION } from "./LogInQueries";

interface IState {
  username: string;
  password: string;
}

class LogInMutation extends Mutation<logIn, logInVariables> {}

class LogInContainer extends React.Component<any, IState> {
  public LogInMutation: MutationFn;
  public state = {
    username: "",
    password: ""
  };
  public render() {
    const { username, password } = this.state;
    return (
      <LogInMutation
        mutation={LOGIN_MUTATION}
        variables={{ username, password }}
      >
        {(logInFn, { loading }) => (
          <LogInPresenter
            logInFn={logInFn}
            username={username}
            password={password}
            onChangeHandler={this.onChangeHandler}
            loading={loading}
          />
        )}
      </LogInMutation>
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

export default LogInContainer;
