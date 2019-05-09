import React from "react";
import FollowBtnPresenter from "./FollowBtnPresenter";
import { Mutation, MutationFn } from "react-apollo";
import { FollowUser, FollowUserVariables } from "../../types/api";
import { FOLLOW_USER } from "./FollowBtnQueries";
import { GET_FEED } from "../../Routes/Feed/FeedQueries";

class FollowMutation extends Mutation<FollowUser, FollowUserVariables> {}

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
        refetchQueries={[
          {
            query: GET_FEED,
            variables: {
              page: 0,
              cityName: localStorage.getItem("cityName")
            }
          }
        ]}
      >
        {followUserFn => {
          this.followUserFn = followUserFn;
          return (
            <FollowBtnPresenter
              isFollowing={isFollowing}
              toggleBtn={this.toggleBtn}
            />
          );
        }}
      </FollowMutation>
    );
  }
  public toggleBtn = () => {
    this.setState(state => {
      return {
        isFollowing: !state.isFollowing
      };
      this.followUserFn();
    });
  };
}

export default FollowBtnContainer;
