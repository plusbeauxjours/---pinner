import React from "react";
import LogInPresenter from "./LogInPresenter";
import { Mutation, MutationFn } from "react-apollo";
import { logIn, logInVariables } from "../../types/api";
import { LOGIN_MUTATION } from "./LogInQueries";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../sharedQueries.local";

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
      <Mutation mutation={LOG_USER_IN}>
        {logUserIn => (
          <LogInMutation
            mutation={LOGIN_MUTATION}
            variables={{ username, password }}
            onError={() => toast.error("Wrong Username or Password")}
            onCompleted={({ logIn: { token } }) =>
              logUserIn({ variables: { token } })
            }
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
        )}
      </Mutation>
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
