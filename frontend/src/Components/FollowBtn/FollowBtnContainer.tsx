import React from "react";
import FollowBtnPresenter from "./FollowBtnPresenter";

interface IState {
  isFollowing: boolean;
}

class FollowBtnContainer extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      isFollowing: props.isFollowing
    };
  }
  public render() {
    const { isFollowing } = this.state;
    return (
      <FollowBtnPresenter
        isFollowing={isFollowing}
        toggleBtn={this.toggleBtn}
      />
    );
  }
  public toggleBtn = () => {
    this.setState(state => {
      return {
        isFollowing: !state.isFollowing
      };
    });
  };
}

export default FollowBtnContainer;
