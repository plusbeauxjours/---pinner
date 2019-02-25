import React from "react";
import HomePresenter from "./HomePresenter";
import { RouteComponentProps } from "react-router";

interface IProps extends RouteComponentProps<any> {}

interface IState {
  isLogIn: boolean;
  modalOpen: boolean;
}

class HomeContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      isLogIn: true,
      modalOpen: false
    };
  }
  public render() {
    const { isLogIn, modalOpen } = this.state;
    return (
      <HomePresenter
        isLogIn={isLogIn}
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
        isLogIn: !state.isLogIn
      };
    });
  };
}

export default HomeContainer;
