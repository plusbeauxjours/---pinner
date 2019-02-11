import React from "react";
import FollowBtnPresenter from "./FollowBtnPresenter";
import { Mutation, MutationFn } from "react-apollo";
import { followUser, followUserVariables } from "../../types/api";
import { FOLLOW_USER } from "./FollowBtnQueries";

class FollowMutation extends Mutation<followUser, followUserVariables> {}

interface IState {
  isFollowing: boolean;
}

class FollowBtnContainer extends React.Component<any, IState> {
  public followUserFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      isFollowing: props.isFollowing
    };
  }
  public render() {
    const { isFollowing } = this.state;
    const { userId } = this.props;
    return (
      <FollowMutation
        mutation={FOLLOW_USER}
        variables={{ userId: parseInt(userId, 10) }}
        onCompleted={this.toggleBtn}
      >
        {followUserFn => (
          <FollowBtnPresenter
            isFollowing={isFollowing}
            toggleBtn={followUserFn}
          />
        )}
      </FollowMutation>
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
