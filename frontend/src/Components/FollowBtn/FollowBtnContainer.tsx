import React from "react";
import FollowBtnPresenter from "./FollowBtnPresenter";
import { Mutation, MutationFn } from "react-apollo";
import { FollowUser, FollowUserVariables } from "../../types/api";
import { FOLLOW_USER } from "./FollowBtnQueries";
import { GET_FEED } from "../../Routes/Feed/FeedQueries";
import Me from "src/Components/Me";
import { GET_NOTIFICATION } from "../../Routes/Notification/NotificationQueries";

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
      <Me>
        {user => (
          <FollowMutation
            mutation={FOLLOW_USER}
            variables={{ userId: parseInt(userId, 10) }}
            onCompleted={this.toggleBtn}
            refetchQueries={[
              { query: GET_NOTIFICATION, variables: { page: 0 } },
              {
                query: GET_FEED,
                variables: {
                  page: 0,
                  cityName: user.profile.currentCity.cityName
                }
              }
            ]}
          >
            {followUserFn => (
              <FollowBtnPresenter
                isFollowing={isFollowing}
                toggleBtn={followUserFn}
              />
            )}
          </FollowMutation>
        )}
      </Me>
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
