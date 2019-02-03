import React from "react";
import AuthPresenter from "./AuthPresenter";

class AuthContainer extends React.Component {
  public state = {
    logIn: true
  };
  public render() {
    const { logIn } = this.state;
    return <AuthPresenter logIn={logIn} changeMode={this.changeMode} />;
  }
  public changeMode = () => {
    this.setState(state => {
      return {
        logIn: !state.logIn
      };
    });
  };
}

export default AuthContainer;
