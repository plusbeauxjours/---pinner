import React from "react";
import HomePresenter from "./HomePresenter";
import { RouteComponentProps } from "react-router";

interface IProps extends RouteComponentProps<any> {}

interface IState {
  isLogIn: boolean;
  modalOpen: boolean;
  verificationModalOpen: boolean;
}

class HomeContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      isLogIn: true,
      modalOpen: false,
      verificationModalOpen: false
    };
  }
  public render() {
    const { isLogIn, modalOpen, verificationModalOpen } = this.state;
    return (
      <HomePresenter
        isLogIn={isLogIn}
        modalOpen={modalOpen}
        verificationModalOpen={verificationModalOpen}
        changeMode={this.changeMode}
        toggleModal={this.toggleModal}
        toggleVerificationModal={this.toggleVerificationModal}
      />
    );
  }

  public toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    });
  };
  public toggleVerificationModal = () => {
    const { verificationModalOpen } = this.state;
    this.setState({
      verificationModalOpen: !verificationModalOpen
    });
    console.log(this.state);
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
