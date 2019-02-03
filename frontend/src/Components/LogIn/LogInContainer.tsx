import React from "react";
import LogInPresenter from "./LogInPresenter";

interface IState {
  username: string;
  password: string;
}

class LogInContainer extends React.Component<any, IState> {
  public state = {
    username: "",
    password: ""
  };
  public render() {
    const { username, password } = this.state;
    return (
      <LogInPresenter
        username={username}
        password={password}
        onChangeHandler={this.onChangeHandler}
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

export default LogInContainer;
