import React from "react";
import MatchPresenter from "./MatchPresenter";

interface IState {
  data: any;
}

class MatchContainer extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      data: [0, 1, 2, 3, 4]
    };
  }
  public render() {
    const { data } = this.state;
    const box = data.map((item, i) => {
      return <MatchPresenter key={i} no={i} />;
    });
    return <div className="app">{box}</div>;
  }
}

export default MatchContainer;
