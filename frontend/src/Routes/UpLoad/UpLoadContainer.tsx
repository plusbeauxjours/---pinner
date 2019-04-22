import React from "react";
import UpLoadPresenter from "./UpLoadPresenter";
import { MutationFn } from "react-apollo";
import { RouteComponentProps } from "react-router";

interface IProps extends RouteComponentProps<any> {}

interface IState {
  caption: string;
  modalOpen: boolean;
}

class UpLoadContainer extends React.Component<IProps, IState> {
  public UploadFn: MutationFn;
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      caption: null,
      modalOpen: true
    };
  }
  public render() {
    const { caption, modalOpen } = this.state;
    return (
      <UpLoadPresenter
        back={this.back}
        uploadNewCard={this.uploadNewCard}
        caption={caption}
        onKeyUp={this.onKeyUp}
        modalOpen={modalOpen}
      />
    );
  }

  public back = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };
  public uploadNewCard = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event;
    this.setState({
      caption: value
    } as any);
  };
  public onKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { keyCode } = event;
    if (keyCode === 13) {
      this.setState({
        modalOpen: false
      });
      this.UploadFn({
        variables: {}
      });
    } else {
      return;
    }
  };
}

export default UpLoadContainer;
