import React from "react";
import UpLoadPresenter from "./UpLoadPresenter";

class UpLoadContainer extends React.Component<any> {
  public render() {
    return <UpLoadPresenter back={this.back} />;
  }
  public back = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };
}

export default UpLoadContainer;
