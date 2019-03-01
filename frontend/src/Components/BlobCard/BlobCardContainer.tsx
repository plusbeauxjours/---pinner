import React from "react";
import BlobCardPresenter from "./BlobCardPresenter";

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

class BlobCardContainer extends React.Component<any, IState> {
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
    this.generatePercentage();
  }
  public render() {
    const borderRadius = `
    ${this.state.percentage1}% 
    ${this.state.percentage11}% 
    ${this.state.percentage21}% 
    ${this.state.percentage2}% / 
    ${this.state.percentage3}% 
    ${this.state.percentage4}% 
    ${this.state.percentage41}% 
    ${this.state.percentage31}%
    `;
    console.log(borderRadius);
    return <BlobCardPresenter borderRadius={borderRadius} />;
  }
  public generatePercentage = () => {
    const randomRadius = () => Math.floor(Math.random() * (75 - 25 + 1) + 25);
    const percentage1 = randomRadius();
    const percentage11 = 100 - percentage1;
    const percentage2 = randomRadius();
    const percentage21 = 100 - percentage2;
    const percentage3 = randomRadius();
    const percentage31 = 100 - percentage3;
    const percentage4 = randomRadius();
    const percentage41 = 100 - percentage4;
    this.setState({
      percentage1,
      percentage11,
      percentage2,
      percentage21,
      percentage3,
      percentage31,
      percentage4,
      percentage41
    });
  };
}

export default BlobCardContainer;
