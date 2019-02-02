import React from "react";
import AuthPresenter from "./AuthPresenter";

interface IState {
  logIn: boolean;
}

export default class extends React.Component<any, IState> {
  public state = {
    logIn: false
  };
  public render() {
    const { logIn } = this.state;
    return <AuthPresenter logIn={logIn} />;
  }
}
