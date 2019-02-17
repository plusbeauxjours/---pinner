import React from "react";
import HomePresenter from "./HomePresenter";
import { RouteComponentProps } from "react-router";

interface IState {
  logIn: boolean;
  modalOpen: boolean;
}

interface IProps extends RouteComponentProps<any> {}

class HomeContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      logIn: true,
      modalOpen: false
    };
  }
  public render() {
    const { logIn, modalOpen } = this.state;
    return (
      <HomePresenter
        logIn={logIn}
        modalOpen={modalOpen}
        changeMode={this.changeMode}
        toggleModal={this.toggleModal}
      />
    );
  }

  public toggleModal = () => {
    this.setState(state => {
      return {
        modalOpen: !state.modalOpen
      };
    });
  };
  public changeMode = () => {
    this.setState(state => {
      return {
        logIn: !state.logIn
      };
    });
  };
}

export default HomeContainer;
