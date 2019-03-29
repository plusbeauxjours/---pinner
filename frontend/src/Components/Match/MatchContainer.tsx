import React from "react";
import MatchPresenter from "./MatchPresenter";

class MatchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  public render = () => {
    return <MatchPresenter />;
  };
}

export default MatchContainer;
