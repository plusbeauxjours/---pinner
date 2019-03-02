import React from "react";
import UpLoadPresenter from "./UpLoadPresenter";
import { blobRadiusBorderGenerator } from "../../blobGenerator";

interface IState {
  percentage1: number;
  percentage11: number;
  percentage2: number;
  percentage21: number;
  percentage3: number;
  percentage31: number;
  percentage4: number;
  percentage41: number;
}

class UpLoadContainer extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      percentage1: 0,
      percentage11: 0,
      percentage2: 0,
      percentage21: 0,
      percentage3: 0,
      percentage31: 0,
      percentage4: 0,
      percentage41: 0
    };
  }
  public componentDidMount() {
    blobRadiusBorderGenerator();
  }
  public render() {
    return <UpLoadPresenter back={this.back} />;
  }
  public back = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };
}

export default UpLoadContainer;
